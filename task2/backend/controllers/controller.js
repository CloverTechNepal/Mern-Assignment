import User from '../modules/user.modules.js';
import bcrypt from 'bcryptjs';

export const register = async(req, res) => {
    const { email, password } = req.body;

    try {
        const existUser = await User.findOne({email});
        if(existUser) return res.status(400).json({ message: "Email is already used"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({ message: "user created successfully"});
    } catch (error) {
        res.status(500).json({message: "unable to register the user" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};