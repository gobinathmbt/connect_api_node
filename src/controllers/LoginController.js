// Import required modules
const User = require('../models/userModel');

// Other code...

exports.loginUser = async (req, res) => {
  try {
    const { mobile_number, password } = req.body;
        

    // Find the user by mobile_number number
    const user = await User.findOne({ mobile_number });

    if (!user) {
      console.error('User not found for Mobile:', mobile_number);
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      console.error('Invalid password for Mobile:', mobile_number);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User logged in successfully for Mobile:', mobile_number);

    // Return a success message or user data as needed
    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
