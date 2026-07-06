const storyModel = require('../Models/storyModel.model.js');
const { uploadFile } = require('../services/storage.services.js');
const jwt = require('jsonwebtoken');

const getAllStories = async (req, res) => {
    try {
        const stories = await storyModel.find();
        res.status(200).json({ message: 'all stories fetched successfully', stories });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getStoryById = async (req, res) => {
    try {
        const story = await storyModel.findById(req.params.id);

        if (!story) {
            return res.status(404).json({
                message: "story not found"
            })
        }

        res.status(200).json({
            message: "story fetched successfully",
            story
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

const addStory = async (req, res) => {
    try {
        const result = await uploadFile(req.file.buffer, req.file.originalname);
        // console.log(result);
        // console.log(req.body);
        // console.log(req.file);
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload book cover"
            })
        }
        // console.log(req.body);
        // console.log(req.file);
        // console.log(result); testing

        const newStory = await storyModel.create({
            bookCover: result.url,
            author: req.body.author,
            title: req.body.title,
            storyDescription: req.body.storyDescription,
            storyContent: req.body.storyContent
        });
        res.status(201).json({ message: 'story created successfully', storyData: newStory, bookCover: result.url });
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log(err)
    }
}

const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await storyModel.findById(id);
        if (!story) {
            return res.status(404).json({ message: 'story not found' });
        }

        const token = req.cookies.token;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);
        }catch (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        await storyModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'story deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateStory = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await storyModel.findById(id);
        if (!story) {
            return res.status(404).json({ message: 'story not found' });
        }
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload book cover"
            })
        }

        const token = req.cookies.token;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);
        }catch (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const result1 = await uploadFile(req.file.buffer);
        story.bookCover = result1.url;
        const { author, title, storyDescription, storyContent } = req.body;
        story.author = author;
        story.title = title;
        story.storyDescription = storyDescription;
        story.storyContent = storyContent;
        await story.save();
        res.status(200).json({ message: 'story updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { getAllStories, addStory, deleteStory, updateStory, getStoryById };