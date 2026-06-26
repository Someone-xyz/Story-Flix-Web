const multer = require('multer');
const express = require('express');
const { getAllStories, addStory, deleteStory, updateStory, getStoryById } = require('../controllers/story.controllers.js');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/get/story', getAllStories);
router.post('/upload/story', upload.single('storyCover'), addStory);
router.delete('/delete/story/:id', deleteStory);
router.put( '/update/story/:id', upload.single('storyCover'), updateStory );
router.get('/get/story/:id', getStoryById);

// router.get('/test', (req, res) => {
//     res.status(200).json({ message : 'story routes are working' });
//     console.log('Cookies : ', req.cookies);
// }); For testing purpose

module.exports = router; 