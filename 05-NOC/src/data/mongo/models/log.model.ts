import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    level: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date(),
    }
})

export const LogModel = mongoose.model("Log", logSchema);