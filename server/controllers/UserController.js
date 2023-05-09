const Users = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Get all Users
const getAllusers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users)
    } catch {
        res.status(500).json({message: error.message})
    }
}


// Register New User
const registerUser = async (req, res) => {
    const {userName, email, password} = req.body

    if(!userName || !email || !password) {
        res.status(400).json({
            message: 'Please fill up the form'
        })
        return
    }
    
    // If User is already exist 
    const userExist = await Users.findOne({userName})
    if(userExist){
        res.status(400).json({
            message: 'User already exist'
        })
        return
    } 

    // Hash Password
    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password, salt)
    
    // Create User

    const user = await Users.create({
        userName,
        email,
        password: hashPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id),
            message: 'User Successfully Registered'
        })
    } else {
        res.status(400).json({
            message: 'User Registration Failed'
        })
    }
}

// Login User
const loginUser = async(req, res) => {
    const {email, password} = req.body

    // Check User
    const user = await Users.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        userName: user.userName,
        email: user.email,
        profile: user.profile,
        token: generateToken(user._id),
        message: "User Successfully Login",
      });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
}

// Generate JWT 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
}


// Get User
const getUser = async(req, res) => {
    const user = await Users.findById(req.params.id);

    if(user){
        res.json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
            profile: user.profile
        })
    }   else {
        res.status(404).json({
            message: 'User not Found'
        })
    }
}

const updateProfile = async (req, res) => {
  const { firstName, lastName, profileImg, birthday } = req.body;
  const userId = req.params.id; 

  try {
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profile.firstName = firstName || user.profile.firstName;
    user.profile.lastName = lastName || user.profile.lastName;
    user.profile.profileImg = profileImg || user.profile.profileImg;
    user.profile.birthday = birthday || user.profile.birthday;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      userName: updatedUser.userName,
      email: updatedUser.email,
      profile: updatedUser.profile,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async(req, res) => {
    const userId = await Users.findByIdAndDelete(req.params.id)

    if(!userId){
        res.status(400).json({
            message: "User not found"
        })
    }

    await userId.remove()
    res.status(200).json({
        message: `User ${req.params.id} successfully deleted`
    })
} 




module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateProfile,
    getAllusers,
    deleteUser
}
