const youtubedl = require("youtube-dl-exec");
const path = require("path");

const scrapYouTube = async (req, res, next) => {
    try {
        const { youtubeId } = req.query;

        if (!youtubeId) {
            return res.status(404).json("No valid YouTube ID found");
        }

        const url = `https://www.youtube.com/watch?v=${youtubeId}`;
        const output = await youtubedl(url, {
            getUrl: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
            cookies: path.resolve(__dirname, "../../cookie.txt"),
           // timeout: 10000 // Set a timeout in milliseconds (10 seconds)
        });

        return res.status(200).json(output);
    } catch (error) {
        console.error("Error inserting YouTube links:", error);

        // If the error is related to memory or resource limits
        if (error.code === "ERR_CHILD_PROCESS") {
            console.error("Child process error:", error);
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    scrapYouTube
};