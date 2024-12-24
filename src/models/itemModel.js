const { Schema, model, models } = require("mongoose")

const LiveSchema = new Schema(
    {
        url: {
            type: String,
            required: true
        },
        view: {
            type: String,
            required: true
        },
        length: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        sub_category: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const live = model("Live", LiveSchema);

module.exports = live;
