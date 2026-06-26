const express = require('express');
const { uploadVideo, getVideos, getVideoById } = require('../controllers/video.controller.js');
const multer = require('multer');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('video'), uploadVideo);
router.get('/get/vid', getVideos);
router.get('/get/vid/:id', getVideoById);

module.exports = router;