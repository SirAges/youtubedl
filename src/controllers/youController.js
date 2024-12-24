const youtubedl = require("youtube-dl-exec");
const { youtube_links } = require("../lib/data");
const scrapYouTube = async (req, res, next) => {
    try {
        const { url } = req.body;

        for (let i = 0; i < youtube_links.length; i++) {
            let item = youtube_links[i];
            const url = item.url;
            const output = await youtubedl(url, {
                dumpSingleJson: true,
                noCheckCertificates: true,
                noWarnings: true,
                preferFreeFormats: true,
                cookies: "../cookie.txt",
                cookiesFromBrowser: "chrome",
                addHeader: ["referer:youtube.com", "user-agent:googlebot"]
            });
            item.url = output.url;

            console.log("youtube_links", item);
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
