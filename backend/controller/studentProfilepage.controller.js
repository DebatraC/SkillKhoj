import User from '../models/user.model.js';

export const studentProfilePage = async (req, res) => {
    try{
        const requiredUser = await User.findById(req.params.id)
        res.status(200).json({
            name: requiredUser.name,
            email: requiredUser.email,
        })
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}