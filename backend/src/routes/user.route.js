const express = require('express');
const { registerUser, deleteUser, loginUser } = require('../controllers/user.controller');

const router = express.Router();

router.post('/register/user', registerUser);
router.delete('/delete/user/:id', deleteUser);
router.post('/login/user', loginUser);

// router.get('/test', (req, res) => {
//     res.status(200).json({ message : 'user routes are working' });
//     console.log('Cookies : ', req.cookies);

// }); For testing purpose

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://myproductionsite.com',
//   'https://myproductionsite.com'
// ];

// app.use(cors({
//   origin: allowedOrigins
// }));

module.exports = router; 