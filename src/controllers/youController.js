const youtubedl = require("youtube-dl-exec");
const { youtube_links } = require("../lib/data");
const path = require("path");

const scrapYouTube = async (req, res, next) => {
    try {
        const { url } = req.body;

        for (let i = 0; i < youtube_links.length; i++) {
            let item = youtube_links[i];
            const url = item.url;
            console.log("url", url);
            if (url) {
                const output = await youtubedl(url, {
                    dumpSingleJson: true,
                    noCheckCertificates: true,
                    noWarnings: true,
                    preferFreeFormats: true,
                    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
                    cookies: `${path.resolve(__dirname, "../../cookie.txt")}`
                });

                item.url = output.url;

                console.log("youtube_links", item);
            }
        }

        return res.status(200).json({
            success: true,
            data: "output"
        });
    } catch (error) {
        console.error("Error scraping YouTube:", error);
        return next(error);
    }
};

module.exports = {
    scrapYouTube
};
