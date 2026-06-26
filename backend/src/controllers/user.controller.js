const userModel = require('../Models/userModel.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {

        const { firstName, lastname, email } = req.body;

        // 1. FIRST check user
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashPassword = async (password) => {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        };

        const hashedPassword = await hashPassword(req.body.password);

        // 2. THEN create user
        const newUser = await userModel.create({
            firstName,
            lastname,
            email,
            password: hashedPassword
        });

        // 3. token generate
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET
        );

        res.cookie('token', token);

        res.status(201).json({
            message: 'user created successfully',
            userData: newUser
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'invalid password' });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );
        res.cookie('token', token);
        res.status(200).json({
            success: true,
            message: "login successful",
            userId: user._id,
            userData: user
        });
    } catch (err) {
        res.status(400).json({ success: false, message: 'login failed', userData: null });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        await userModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'user deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { registerUser, deleteUser, loginUser };