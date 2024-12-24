const youtubedl = require("youtube-dl-exec");
const scrapYouTube = async (req, res, next) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res
                .status(400)
                .json({ success: false, message: "YouTube URL is required" });
        }

        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            cookies: "CLDbygEIk9vMAQ==",
            addHeader: ["referer:youtube.com", "user-agent:googlebot"]
        });

        return res.status(200).json({
            success: true,
            data: output
        });
    } catch (error) {
        console.error("Error scraping YouTube:", error);
        return next(error);
    }
};

module.exports = {
    scrapYouTube
};
