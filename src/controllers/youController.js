const youtubedl = require("youtube-dl-exec");
const { youtube_links } = require("../lib/data");
const path = require("path");
const Live = require("../models/itemModel");

const scrapYouTube = async (req, res, next) => {
    try {
        const { youtubeId } = req.query;
       const url=`https://www.youtube.com/watch?v=${youtubeId}`
        if (!url) {
            return res.status(404).json("no valid url found");
        }

        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
            cookies: `${path.resolve(__dirname, "../../cookie.txt")}`
        });

        if (output?.url) {
      
            return res.status(200).json(output.url);
        }

        // Insert all YouTube links at once

        return res
            .status(200)
            .json({ message: "YouTube links inserted successfully!" });
    } catch (error) {
        console.error("Error inserting YouTube links:", error);
    }
};
const addMany = async (req, res, next) => {
    try {
        await Live.insertMany(youtube_links, { ordered: false });

        return res
            .status(200)
            .json({ message: "YouTube links inserted successfully!" });
    } catch (error) {
        console.error("Error inserting YouTube links:", error);
    }
};

module.exports = {
    scrapYouTube,
    addMany
};
