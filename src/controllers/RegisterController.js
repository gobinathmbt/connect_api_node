const User = require('../models/userModel');
const randomstring = require('randomstring');

// Validate full name
const validateFullName = (name) => {
  if (!name) {
    return "Full Name is required";
  }
  // Additional validation rules if needed
  return null;
};

// Validate mobile_number number
const validateMobile = (mobile_number) => {
  if (!mobile_number) {
    return "Mobile Number is required";
  }
  if (!/^[6-9]\d{9}$/.test(mobile_number)) {
    return "Mobile number must start with a digit from 6 to 9 and have a length of 10 digits.";
  }
  // Additional validation rules if needed
  return null;
};

// Validate OTP
const validateOTP = (otp) => {
  if (!otp) {
    return "OTP is required";
  }
  if (otp.length !== 4) {
    return "OTP must be 4 digits";
  }
  return null;
};

// Validate password
const validatePassword = (newPassword, required = false) => {
  console.log('Received password:', newPassword);
  if (required && (!newPassword || newPassword.trim() === '')) {
    console.log('Password is required');
    return "Password is required";
  }

  if (newPassword && !/[A-Z]/.test(newPassword)) {
    return "Password must contain at least one uppercase letter";
  }
  if (newPassword && !/[a-z]/.test(newPassword)) {
    return "Password must contain at least one lowercase letter";
  }
  if (newPassword && !/[0-9]/.test(newPassword)) {
    return "Password must contain at least one digit";
  }
  if (newPassword && !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-="']/.test(newPassword)) {
    return "Password must contain at least one special character";
  }
  if (newPassword && (newPassword.length < 8 || newPassword.length > 12)) {
    return "Password must be between 8 and 12 characters";
  }
  return null;
};

exports.registerUser = async (req, res) => {
  try {
    const { fullName, mobile_number } = req.body;

    // Validate input fields
    const fullNameError = validateFullName(fullName);
    const mobileError = validateMobile(mobile_number);
    console.log(fullNameError);
    console.log(mobileError);

    if (fullNameError || mobileError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: {
          fullName: fullNameError,
          mobile_number: mobileError,
        },
      });
    }

    // Check if a user with the same mobile_number number already exists
    const existingUser = await User.findOne({ mobile_number });

    if (existingUser) {
      console.error('Mobile number already exists:', mobile_number);
      return res.status(400).json({ message: 'Mobile number already exists' });
    }

    // Generate a random OTP
    const otp = randomstring.generate({
      length: 4,
      charset: 'numeric',
    });

    // Create a new user with the OTP
    const newUser = new User({
      fullName,
      mobile_number,
      otp: otp.toString(), // Convert OTP to string before storing
    });

    await newUser.save();

    // You can add code here to send the OTP through another method (e.g., email)

    console.log('OTP generated:', otp);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.savePassword = async (req, res) => {
  try {
    const { mobile_number, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ mobile_number });

    if (!user) {
      console.error('User not found for Mobile:', mobile_number);
      return res.status(404).json({ message: 'User not found' });
    }

       // Add password validation if needed
       const passwordError = validatePassword(newPassword, true);
       console.log(passwordError)

       if (passwordError) {
         return res.status(400).json({
           message: 'Validation failed',
           errors: {
             newPassword: passwordError,
           },
         });
       }

       
    // Update the user's password with the plaintext password (not recommended)
    user.password = newPassword;

    // Save the user document with the new password
    await user.save();

    console.log('Password saved successfully for Mobile:', mobile_number);

    res.status(200).json({ message: 'Password saved successfully' });
  } catch (error) {
    console.error('Error saving password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};






exports.verifyOtp = async (req, res) => {
  try {
    const { mobile_number, otp } = req.body;

    // Find the user by email and check if the OTP matches
    const user = await User.findOne({ mobile_number });

    if (!user) {
      console.error('User not found for Mobile:', mobile_number);
      return res.status(404).json({ message: 'User not found' });
    }

    const otpError = validateOTP(otp);
    console.log(otpError)

    if (otpError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: {
          otp: otpError,
        },
      });
    }

    console.log('User OTP:', user.otp);

    if (user.otp !== otp.toString()) { // Convert the incoming OTP to a string
      console.error('OTP verification failed for Mobile:', mobile_number);
      return res.status(400).json({ message: 'Incorrect OTP' });
    }

    // Update the user to mark OTP as verified (you can add more checks and validations here)
    await user.save();

    console.log('OTP verified successfully for Mobile:', mobile_number);

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { mobile_number } = req.body;

    // Find the user by mobile_number number
    const user = await User.findOne({ mobile_number });

    if (!user) {
      console.error('User not found for Mobile:', mobile_number);
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new OTP
    const otp = randomstring.generate({
      length: 4,
      charset: 'numeric',
    });

    // Update the user's OTP
    user.otp = otp.toString(); // Convert OTP to string before storing
    await user.save();

    // You can add code here to send the new OTP through another method (e.g., email)

    console.log('New OTP generated:', otp);

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Error resending OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.checkMobile = async (req, res) => {
  try {
    const { mobile_number } = req.query;

    // Check if a user with the given mobile_number number already exists
    const existingUser = await User.findOne({ mobile_number });

    if (existingUser) {
      console.error('Mobile number already exists:', mobile_number);
      return res.status(200).json({ exists: true }); // Return exists as true if mobile_number number exists
    }

    // If no user found, return exists as false
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error('Error checking mobile_number number:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// const transporter = nodemailer.createTransport({
//   service: 'gmail', // e.g., 'Gmail'
//   auth: {
//     user: 'kavinkumar7834@gmail.com',
//     pass: 'fvbmnimjhaxygvyy',
//   },
// });

// exports.registerUser = async (req, res) => {
//   try {
//     const { fullName, email, mobile_number } = req.body;

//     // Check if a user with the same mobile_number number already exists
//     const existingUser = await User.findOne({ mobile_number });

//     if (existingUser) {
//       console.error('Mobile number already exists:', mobile_number);
//       return res.status(400).json({ message: 'Mobile number already exists' });
//     }

//     // Generate a random OTP
//     const otp = randomstring.generate({
//       length: 4,
//       charset: 'numeric',
//     });

//     // Create a new user
//     const newUser = new User({
//       fullName,
//       email,
//       mobile_number,
//       otp: otp.toString(), // Convert OTP to string before storing
//     });

//     await newUser.save();

//     // Send the OTP to the user's email
//     const mailOptions = {
//       from: 'kavinkumar7834@gmail.com',
//       to: email,
//       subject: 'Verification OTP',
//       text: `Your OTP for registration is: ${otp}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending OTP email:', error);
//         res.status(500).json({ message: 'Error sending OTP email' });
//       } else {
//         console.log('OTP email sent to:', email);
//         res.status(201).json({ message: 'User registered successfully' });
//       }
//     });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };