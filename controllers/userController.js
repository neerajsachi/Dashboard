const User = require('../models/userModel');


exports.register = async (req, res) => {
  try {
    const { name, address, gender, profession, maritalStatus, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, address, gender, profession, maritalStatus, email, password });
    await user.save();


    res.status(201).json({user: { name: user.name, email: user.email, address: user.address, gender: user.gender, profession: user.profession, maritalStatus: user.maritalStatus } });
    
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter all the required fields" });
    }
    try {
      const user = await User.findOne({ email, password });
      if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      return res.json({ message: "Authentication successful", user});
  } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { email, password } = req.body; 
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    const user = await User.findOne({ email, password }).select('-password'); 

    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    res.status(200).json(user); 
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
