const Tiktok = require("@tobyg74/tiktok-api-dl");
const scrapTikTok = async (req, res, next) => {
    try {
        const { url, username } = req.body;

        let result;
        if (url) {
            // Scrape TikTok video data
            result = await Tiktok.Downloader(url, {
                version: "v3",
                proxy: "Http",
                showOriginalResponse: true
            });
        } else if (username) {
            // Scrape TikTok user profile data
            result = await Tiktok.StalkUser(username, {
                cookie: process.env.COOKIE || "jotter",
                postLimit: 10,
                proxy: "Http"
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "URL or username is required"
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
        
    } catch (error) {
        console.error("Error scraping TikTok:", error);
        return next(error);
    }
};

module.exports = {
    scrapTikTok
};
