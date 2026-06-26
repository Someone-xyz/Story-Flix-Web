const videoModel = require("../Models/video.model");
const cloudinary = require('../services/clodinary.config.js');

const uploadVideo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Please provide title and description" });
        }
        // console.log('1');
        console.log(req.file);//testing
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload a video" });
        }
        // console.log('2');testing debugging
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "video",
            folder: "videos",
            use_filename: true,
            unique_filename: false,
        });
        // console.log('3');
        // console.log('result : ', result);
        // console.log('result secure url : ', result.secure_url);
        // console.log('result : ', result.url);for debugging testing

        // res.status(200).json({
        //     success: true,
        //     result
        // })for testing debugging

        const video = await videoModel.create({
            title: title,
            description: description,
            videoUrl: result.url
        });
        console.log('4')
        return res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            video: video
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

const getVideos = async (req, res) => {
    try {
        const videos = await videoModel.find();
        return res.status(200).json({
            success: true,
            videos: videos
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

const getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await videoModel.findById(id);
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }
        return res.status(200).json({
            success: true,
            video: video
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

module.exports = {
    uploadVideo,
    getVideos,
    getVideoById
}