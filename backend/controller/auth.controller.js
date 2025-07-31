import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const userResgistration = async (req, res) => {
    try{
       const {name, email, password, role} = req.body; // Assuming you send user data in the request body
         // Check if user already exists
         const existingUser = await User.findOne({ email });
       if (existingUser) {
              return res.status(400).json({message: 'User already exists'});
         }
       const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

       const newUser = new User({
           name,
           email,
           password: hashedPassword,
           role
       });
       await newUser.save(); // Save the user to the database
       res.status(201).json({message: 'User registered successfully'});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
    
}

export const userLogin = async (req, res) => {
    try {
        const {email, password} = req.body; // Assuming you send login data in the request body
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: 'Email Does Not Exist'});
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Invalid Password'});
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3h' });
        res.status(200).json({message: 'Login Successful', token});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }

}