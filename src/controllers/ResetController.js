const User = require("../models/userModel");
const randomstring = require("randomstring");

let temporaryOtpStorage = {}; // Use an object to store OTPs temporarily

// Validate mobile number
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
  console.log("Received password:", newPassword);
  if (required && (!newPassword || newPassword.trim() === "")) {
    console.log("Password is required");
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
  if (
    newPassword &&
    !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-="']/.test(newPassword)
  ) {
    return "Password must contain at least one special character";
  }
  if (newPassword && (newPassword.length < 8 || newPassword.length > 12)) {
    return "Password must be between 8 and 12 characters";
  }
  return null;
};

exports.loginUser = async (req, res) => {
  try {
    const { mobile_number } = req.body;

    const mobileError = validateMobile(mobile_number);
    console.log(mobileError);

    if (mobileError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: {
          mobile_number: mobileError,
        },
      });
    }

    // Find the user by mobile number
    const user = await User.findOne({ mobile_number });

    if (!user) {
      console.error("User not found for Mobile:", mobile_number);
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a random OTP during login
    const loginOtp = randomstring.generate({
      length: 4,
      charset: "numeric",
    });

    // Store the OTP in temporary storage
    temporaryOtpStorage[mobile_number] = loginOtp;

    user.otp = loginOtp;
    await user.save();

    console.log("OTP generated:", loginOtp);

    console.log("User logged in successfully for Mobile:", mobile_number);

    // Return a success message or user data as needed
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { mobile_number, otp } = req.body;

    // Retrieve the stored OTP from temporary storage
    const storedOtp = temporaryOtpStorage[mobile_number];

    if (!storedOtp || otp !== storedOtp) {
      console.error("OTP verification failed for Mobile:", mobile_number);
      return res.status(400).json({ message: "OTP verification failed" });
    }

    // Clear the OTP from temporary storage after successful verification
    delete temporaryOtpStorage[mobile_number];
    const otpError = validateOTP(otp);
    console.log(otpError);

    if (otpError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: {
          otp: otpError,
        },
      });
    }

    console.log("OTP verified successfully for Mobile:", mobile_number);

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { mobile_number, newPassword } = req.body;

    // Find the user by mobile number
    const user = await User.findOne({ mobile_number });

    if (!user) {
      console.error("User not found for Mobile:", mobile_number);
      return res.status(404).json({ message: "User not found" });
    }

    // Add password validation if needed
    const passwordError = validatePassword(newPassword, true);
    console.log(passwordError);

    if (passwordError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: {
          password: passwordError,
        },
      });
    }

    // Update the user's password
    user.password = newPassword;

    // Save the user document with the new password
    await user.save();

    console.log("Password reset successfully for Mobile:", mobile_number);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
