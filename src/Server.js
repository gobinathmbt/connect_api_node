const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const path = require("path");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const fs = require("fs/promises");
const { number } = require("yup");

// mongodb+srv://leoyt:gobinath%403@smartcliff.laqvrgr.mongodb.net/
// mongodb://localhost:27017/smartcliff_gobi
mongoose.connect("mongodb://localhost:27017/smartcliff_gobi");
app.use(cors()); //middle ware
app.use(express.json());

// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'mysql123',
//   database: 'smartcliff_gobi',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//   } else {
//     console.log('Connected to MySQL database');
//   }
// });

const CourseSchema = mongoose.Schema({
  _id: Number,
  title: String,
  category: String,
  rating: Number,
  level: String,
  shortDesc: String,
  longDesc: String,
  duration: String,
  iconLibrary: String,
  iconName: String,
  imagePath: String,
  syllabusPath: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EnquirySchema = mongoose.Schema({
  email: String,
  mobileNumber: Number,
  course: String,
  enquiry: String,
  fullName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ApplyNowSchema = mongoose.Schema({
  fullName: String,
  email: String,
  mobileNumber: String,
  degree: String,
  specialization: String,
  yearOfPassing: Number,
  percentageOfMarks: Number,
  address: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CorporateFormSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  contactPersonName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  serviceOfInterest: [
    {
      type: String,
      required: true,
    },
  ],
  additionalComments: {
    type: String,
  },
  subscribeToNewsletter: {
    type: Boolean,
    default: false,
  },
  agreeToTerms: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InstituteFormSchema = mongoose.Schema({
  institutionName: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  institutionAddress: {
    type: String,
    required: true,
  },
  services: [
    {
      type: String,
      required: true,
    },
  ],
  additionalComments: {
    type: String,
  },
  subscribeToNewsletter: {
    type: Boolean,
    default: false,
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StudentFormSchema = mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  currentEducationLevel: { type: String, required: true },
  areaOfInterest: { type: String, required: true },
  workExperience: { type: String, required: true },
  additionalInformation: { type: String },
  subscribeToNewsletter: { type: Boolean, default: false },
  agreeToTerms: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EmployeeFormSchema = mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  employeeEmail: { type: String, required: true },
  companyName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  enquiryDetails: { type: String, required: true },
  subscribeToNewsletter: { type: Boolean, default: false },
  agreeToTerms: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const joinUsDataSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  salaryRequirement: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  relocate: {
    type: Boolean,
    required: true,
  },
  lastCompany: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  additionalInformation: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  resumePath: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SiteManagementSchema = new mongoose.Schema({
  ImagePaths: [
    {
      type: String,
      required: true,
    },
  ],
  Homecontent: [
    {
      text: {
        type: String,
        required: true,
      },
      fontsize: {
        type: Number,
        required: true,
      },
      fontcolour: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdminLoginSchema = mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
  sessionTimeout: Number, // Add this field to store session timeout
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategoryManagementSchema = mongoose.Schema({
  _id: Number,
  categoryName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Courses = mongoose.model("Courses", CourseSchema);
const Enquiries = mongoose.model("Enquiries", EnquirySchema);
const ApplyNowForm = mongoose.model("ApplyNowFormDatas", ApplyNowSchema);
const ServiceCorporateForm = mongoose.model(
  "ServiceCorporateDatas",
  CorporateFormSchema
);
const ServiceInstituteForm = mongoose.model(
  "ServiceInstituteDatas",
  InstituteFormSchema
);
const ServiceStudentForm = mongoose.model(
  "ServiceStudentDatas",
  StudentFormSchema
);
const ServiceEmployeeForm = mongoose.model(
  "ServiceEmployeeDatas",
  EmployeeFormSchema
);
const JoinUsData = mongoose.model("JoinUsDatas", joinUsDataSchema);
const SiteManagement = mongoose.model(
  "SiteManagementDatas",
  SiteManagementSchema
);
const CategoryManagement = mongoose.model(
  "CategoryManagementDatas",
  CategoryManagementSchema
);
const Adminlogin = mongoose.model("AdminLogin", AdminLoginSchema);

//-------------------------------------------------------------session management------------------------------------------------------------

//------------------------------------------------------------------------adminsession--------------------------------------------------------

app.get("/login", async (req, res) => {
  try {
    const loginData = await Adminlogin.find({});
    res.json(loginData);
  } catch (error) {
    console.error("Error fetching login data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Adminlogin.findOne({ username, password });

    if (user) {
      const secretKey = crypto.randomBytes(32).toString("hex");
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: user.sessionTimeout,
      });
      console.log(token);
      res.json({ token, sessionTimeout: user.sessionTimeout });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//-------------------------------------------------postman testing--------------------------------------------------------------------------------------------

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.post("/validate", async (req, res) => {
  const { userName, password, email } = req.body;

  // Validate username and password criteria
  const usernameRegex = /^[a-zA-Z]+\.?[a-zA-Z]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.#])[A-Za-z\d@$.#]{8,}$/;
  // |mil|biz|info|name|museum|coop|aero
  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[A-Za-z]{3,}\.(co|com|in|com\.in|co\.in|org|net|edu|gov|[A-Za-z]{2,4})$/;

  if (!userName) {
    return res.status(400).json({ error: "Username is required." });
  }

  if (!userName.match(usernameRegex)) {
    return res
      .status(400)
      .json({
        error: "Username must contain only letters and an optional single dot.",
      });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }

  if (!password.match(passwordRegex)) {
    return res
      .status(400)
      .json({
        error:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, one of the special characters (@, $, ., or #), and be at least 8 characters long.",
      });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  if (!email.match(emailRegex)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  //400 Bad Request The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).
  //412 Precondition Failed  The server does not meet one of the preconditions that the requester put on the request header fields.

  try {
    // Check if the username already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(412).json({ error: "email already exists." });
    }

    // Validation passed, save the user data to the database
    const user = new User({ userName, password, email });
    await user.save();
    res
      .status(200)
      .json({ message: "Validation successful. User data saved." });
  } catch (error) {
    res.status(500).json({ error: "Error saving user data to the database." });
  }
});

//---------------------------------------------------------------File Handling----------------------------------------------------------------------------

app.use(
  "/public/Images",
  express.static(path.join(__dirname, "../public/Images"))
);

app.get("/public/Images/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../public/Images", filename);
  console.log("Serving resume file:", filePath);
  res.sendFile(filePath);
});

const ImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Images"); // Store images in the 'public/images' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname); // Generate unique filename with original extension
  },
});

const Image = multer({ storage: ImageStorage });

//-------------------------------------------------------------------------------------------------------------------------------------------

app.use(
  "/public/Resumes",
  express.static(path.join(__dirname, "../public/Resumes"))
);

app.get("/public/Resumes/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../public/Resumes", filename);
  console.log("Serving resume file:", filePath);
  res.sendFile(filePath);
});

const storage = multer.diskStorage({
  destination: "./public/Resumes",

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname); // Generate unique filename with original extension
  },
});

const Resume = multer({ storage });

//---------------------------------------------------------------------------------------------------------------------------------------------

app.use(
  "/public/Courses",
  express.static(path.join(__dirname, "../public/Courses"))
);

app.get("/public/Courses/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../public/Courses", filename);
  console.log("Serving resume file:", filePath);
  res.sendFile(filePath);
});

const CourseDataStorage = multer.diskStorage({
  destination: "./public/Courses",

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname); // Generate unique filename with original extension
  },
});

const CourseDatas = multer({ storage: CourseDataStorage });

//-------------------------------------------------------------MONGO DB-------------------------------------------------------------------------------------

//-------------------------------------------------------------courses-------------------------------------------------------------------------------------

// Get all data
app.get("/Courses", async (req, res) => {
  try {
    const CoursesData = await Courses.find({});
    res.json(CoursesData);
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post(
  "/Courses",
  CourseDatas.fields([{ name: "courseImage" }, { name: "syllabus" }]),
  async (req, res) => {
    try {
      const newCourse = req.body;
      const file1Path = req.files["courseImage"][0].path;
      const file2Path = req.files["syllabus"][0].path;

      newCourse.imagePath = file1Path ? file1Path : null; // Save the image path if available
      newCourse.syllabusPath = file2Path ? file2Path : null;

      const createdCourse = await Courses.create(newCourse);
      res.status(201).json(createdCourse);
    } catch (error) {
      console.error("Error adding course:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.put(
  "/Courses/:id",
  CourseDatas.fields([{ name: "courseImage" }, { name: "syllabus" }]),
  async (req, res) => {
    try {
      const courseId = req.params.id;
      const updatedCourse = { ...req.body }; // Create a new object to avoid modifying the original req.body
      const file1Path = req.files["courseImage"][0].path;
      const file2Path = req.files["syllabus"][0].path;

      if (file1Path) {
        updatedCourse.imagePath = file1Path; // Update imagePath if a new image is uploaded
      }

      if (file2Path) {
        updatedCourse.syllabusPath = file2Path; // Update syllabusPath if a new syllabus is uploaded
      }

      const oldCourse = await Courses.findById(courseId); // Retrieve the old course data

      if (
        oldCourse.imagePath &&
        updatedCourse.imagePath !== oldCourse.imagePath
      ) {
        // Delete the old image file if the paths are different
        await fs.unlink(oldCourse.imagePath);
      }

      if (
        oldCourse.syllabusPath &&
        updatedCourse.syllabusPath !== oldCourse.syllabusPath
      ) {
        // Delete the old syllabus file if the paths are different
        await fs.unlink(oldCourse.syllabusPath);
      }

      const course = await Courses.findByIdAndUpdate(courseId, updatedCourse, {
        new: true,
      });
      res.json(course);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Delete a course
app.delete("/Courses/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    await Courses.findByIdAndRemove(courseId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//-----------------------------------------------------------Enquiry---------------------------------------------------------------------------------------

// Get all data
app.get("/Enquiry", async (req, res) => {
  try {
    const EnquiryData = await Enquiries.find({});
    res.json(EnquiryData);
  } catch (error) {
    console.error("Error fetching Enquiry data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Enquiry
app.delete("/Enquiry/:id", async (req, res) => {
  try {
    const EnquiryId = req.params.id;
    await Enquiries.findByIdAndRemove(EnquiryId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting Enquiry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new Enquiry
app.post("/Enquiry", async (req, res) => {
  try {
    const newEnquiry = req.body; // The new course data will be sent in the request body
    const createdEnquiry = await Enquiries.create(newEnquiry);
    res.status(201).json(createdEnquiry);
  } catch (error) {
    console.error("Error adding Enquiry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all data
app.get("/EnquiryAll", async (req, res) => {
  try {
    const EnquiryData = await Enquiries.find({});
    res.json(EnquiryData);
  } catch (error) {
    console.error("Error fetching Enquiry data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete all Apply now data
app.delete("/EnquiryAll", async (req, res) => {
  try {
    await Enquiries.deleteMany({});
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting Enquiry data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -----------------------------------------------------------Apply Now Form------------------------------------------------------------------------------------

// Get all data
app.get("/ApplyNow", async (req, res) => {
  try {
    const ApplyData = await ApplyNowForm.find({});
    res.json(ApplyData);
  } catch (error) {
    console.error("Error fetching Enquiry data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new apply data
app.post("/ApplyNow", async (req, res) => {
  try {
    const ApplyData = req.body;
    console.log(ApplyData); // The new course data will be sent in the request body
    const createdApplyData = await ApplyNowForm.create(ApplyData);
    res.status(201).json(createdApplyData);
  } catch (error) {
    console.error("Error adding ApplyNow:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Apply now
app.delete("/ApplyNow/:id", async (req, res) => {
  try {
    const ApplyId = req.params.id;
    await ApplyNowForm.findByIdAndRemove(ApplyId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting ApplyNow:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all data
app.get("/ApplyNowAll", async (req, res) => {
  try {
    const ApplyData = await ApplyNowForm.find({});
    res.json(ApplyData);
  } catch (error) {
    console.error("Error fetching Enquiry data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete all Apply now data
app.delete("/ApplyNowAll", async (req, res) => {
  try {
    await ApplyNowForm.deleteMany({});
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting ApplyNow data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//--------------------------------------------------------------ServiceCorporateForm-----------------------------------------------------------------------------------

// Get all data
app.get("/ServiceCorporateData", async (req, res) => {
  try {
    const CorporateData = await ServiceCorporateForm.find({});
    res.json(CorporateData);
  } catch (error) {
    console.error("Error fetching service data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new service data
app.post("/ServiceCorporateData", async (req, res) => {
  try {
    const CorporateData = req.body;
    console.log(CorporateData);
    const createdCorporateData = await ServiceCorporateForm.create(
      CorporateData
    );
    res.status(201).json(createdCorporateData);
  } catch (error) {
    console.error("Error adding CorporateData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a service data
app.delete("/ServiceCorporateData/:id", async (req, res) => {
  try {
    const CorporateId = req.params.id;
    await ServiceCorporateForm.findByIdAndRemove(CorporateId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting ApplyNow:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all data
app.get("/ServiceCorporateDataAll", async (req, res) => {
  try {
    const CorporateData = await ServiceCorporateForm.find({});
    res.json(CorporateData);
  } catch (error) {
    console.error("Error fetching Corporate data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete all Apply now data
app.delete("/ServiceCorporateDataAll", async (req, res) => {
  try {
    await ServiceCorporateForm.deleteMany({});
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting CorporateData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//--------------------------------------------------------------ServiceInstituteForm-----------------------------------------------------------------------------------

// Get all data
app.get("/ServiceInstituteData", async (req, res) => {
  try {
    const InstituteData = await ServiceInstituteForm.find({});
    res.json(InstituteData);
  } catch (error) {
    console.error("Error fetching service data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new service data
app.post("/ServiceInstituteData", async (req, res) => {
  try {
    const InstituteData = req.body;
    console.log(InstituteData);
    const createdInstituteData = await ServiceInstituteForm.create(
      InstituteData
    );
    res.status(201).json(createdInstituteData);
  } catch (error) {
    console.error("Error adding InstituteData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a service data
app.delete("/ServiceInstituteData/:id", async (req, res) => {
  try {
    const InstituteId = req.params.id;
    await ServiceInstituteForm.findByIdAndRemove(InstituteId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting ApplyNow:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all data
app.get("/ServiceInstituteDataAll", async (req, res) => {
  try {
    const InstituteData = await ServiceInstituteForm.find({});
    res.json(InstituteData);
  } catch (error) {
    console.error("Error fetching Institute data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete all Apply now data
app.delete("/ServiceInstituteDataAll", async (req, res) => {
  try {
    await ServiceInstituteForm.deleteMany({});
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting CorporateData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//--------------------------------------------------------------ServiceStudentForm-----------------------------------------------------------------------------------

// Get all data
app.get("/ServiceStudentData", async (req, res) => {
  try {
    const StudentData = await ServiceStudentForm.find({});
    res.json(StudentData);
  } catch (error) {
    console.error("Error fetching service data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new service data
app.post("/ServiceStudentData", async (req, res) => {
  try {
    const StudentData = req.body;
    console.log(StudentData);
    const createdStudentData = await ServiceStudentForm.create(StudentData);
    res.status(201).json(createdStudentData);
  } catch (error) {
    console.error("Error adding StudentData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a service data
app.delete("/ServiceStudentData/:id", async (req, res) => {
  try {
    const StudentId = req.params.id;
    await ServiceStudentForm.findByIdAndRemove(StudentId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting ApplyNow:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all data
app.get("/ServiceStudentDataAll", async (req, res) => {
  try {
    const StudentData = await ServiceStudentForm.find({});
    res.json(StudentData);
  } catch (error) {
    console.error("Error fetching Student data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete all Apply now data
app.delete("/ServiceStudentDataAll", async (req, res) => {
  try {
    await ServiceStudentForm.deleteMany({});
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting CorporateData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//--------------------------------------------------------------ServiceEmployeeForm-----------------------------------------------------------------------------------

// Get all data
app.get("/ServiceEmployeeData", async (req, res) => {
  try {
    const EmployeeData = await ServiceEmployeeForm.find({});
    res.json(EmployeeData);
  } catch (error) {
    console.error("Error fetching service data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new service data
app.post("/ServiceEmployeeData", async (req, res) => {
  try {
    const EmployeeData = req.body;
    console.log(EmployeeData);
    const createdEmployeeData = await ServiceEmployeeForm.create(EmployeeData);
    res.status(201).json(createdEmployeeData);
  } catch (error) {
    console.error("Error adding EmployeeData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a service data
app.delete("/ServiceEmployeeData/:id", async (req, res) => {
  try {
    const EmployeeId = req.params.id;
    await ServiceEmployeeForm.findByIdAndRemove(EmployeeId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting ApplyNow:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all data
app.get("/ServiceEmployeeDataAll", async (req, res) => {
  try {
    const EmployeeData = await ServiceEmployeeForm.find({});
    res.json(EmployeeData);
  } catch (error) {
    console.error("Error fetching Employee data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete all Apply now data
app.delete("/ServiceEmployeeDataAll", async (req, res) => {
  try {
    await ServiceEmployeeForm.deleteMany({});
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting CorporateData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//---------------------------------------------------------------joinusdata----------------------------------------------------------------------

// Fetch all data
app.get("/JoinUsData", async (req, res) => {
  try {
    const joinUsData = await JoinUsData.find();
    res.json(joinUsData);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint for form submission
app.post("/JoinUsData", Resume.single("resume"), async (req, res) => {
  try {
    const newCourse = req.body;
    newCourse.resumePath = req.file ? req.file.path : null;
    const createdJoinUsData = await JoinUsData.create(newCourse);
    res.status(200).json(createdJoinUsData);
  } catch (err) {
    console.error("Error inserting data into the database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete an entry
app.delete("/JoinUsData/:id", async (req, res) => {
  try {
    const deletedEntry = await JoinUsData.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      res.status(404).json({ error: "Data not found" });
    } else {
      res.json({ message: "Data deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all data
app.get("/JoinUsAll", async (req, res) => {
  try {
    const joinUsData = await JoinUsData.find();
    res.json(joinUsData);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete all data
app.delete("/JoinUsAll", async (req, res) => {
  try {
    await JoinUsData.deleteMany({});
    res.json({ message: "All data has been deleted successfully" });
  } catch (err) {
    console.error("Error deleting all data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting all data." });
  }
});

//--------------------------------------------------------------category management ----------------------------------------------------------------------

// Get all data
app.get("/Category", async (req, res) => {
  try {
    const CategoryData = await CategoryManagement.find({});
    res.json(CategoryData);
  } catch (error) {
    console.error("Error fetching Category data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Category
app.delete("/Category/:id", async (req, res) => {
  try {
    const CategoryId = req.params.id;
    await CategoryManagement.findByIdAndRemove(CategoryId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new Category
app.post("/Category", async (req, res) => {
  try {
    const newCategory = req.body; // The new course data will be sent in the request body
    console.log(newCategory);
    const createdCategory = await CategoryManagement.create(newCategory);
    res.status(201).json(createdCategory);
  } catch (error) {
    console.error("Error adding Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/Category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = req.body;
    const category = await CategoryManagement.findByIdAndUpdate(
      categoryId,
      updatedCategory,
      { new: true }
    );
    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//--------------------------------------------------------------site management ----------------------------------------------------------------------

//--------------------------------------------------------------site management banner ----------------------------------------------------------------------

// Create a new URL with an image
app.post("/SiteManagement", Image.single("Image"), async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;

    const document = await SiteManagement.findOne();
    if (!document) {
      const createdBannerData = await SiteManagement.create({
        ImagePaths: [imagePath],
      });
      return res.status(201).json(createdBannerData);
    }

    document.ImagePaths.push(imagePath);
    const updatedBannerData = await document.save();
    res.status(200).json(updatedBannerData);
  } catch (error) {
    console.error("Error adding Banner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read all URLs with images
app.get("/SiteManagement", async (req, res) => {
  try {
    const document = await SiteManagement.findOne();
    if (!document) {
      return res.status(404).json({ error: "No URLs found" });
    }
    res.status(200).json(document.ImagePaths);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a URL by index with an image
app.put("/SiteManagement/:index", Image.single("Image"), async (req, res) => {
  try {
    const { index } = req.params;
    const imagePath = req.file ? req.file.path : null;

    const document = await SiteManagement.findOne();
    if (!document) {
      return res.status(404).json({ error: "No URLs found" });
    }

    if (index < 0 || index >= document.ImagePaths.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    if (imagePath) {
      document.ImagePaths[index] = imagePath;
    }

    const updatedBannerData = await document.save();
    res.status(200).json(updatedBannerData);
  } catch (error) {
    console.error("Error updating Banner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a URL by index
app.delete("/SiteManagement/:index", async (req, res) => {
  try {
    const { index } = req.params;

    const document = await SiteManagement.findOne();
    if (!document) {
      return res.status(404).json({ error: "No URLs found" });
    }

    if (index < 0 || index >= document.ImagePaths.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    const imagePathToDelete = document.ImagePaths[index];
    document.ImagePaths.splice(index, 1);
    await document.save();

    // Delete the associated image file
    if (imagePathToDelete) {
      const fs = require("fs");
      fs.unlinkSync(imagePathToDelete);
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting Banner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//--------------------------------------------------------------site management homecontent ----------------------------------------------------------------------

app.post("/SiteManagement/Homecontent", async (req, res) => {
  try {
    const { text, fontsize, fontcolour } = req.body;

    const document = await SiteManagement.findOne();
    if (!document) {
      const createdData = await SiteManagement.create({
        Homecontent: [{ text, fontsize, fontcolour }],
      });
      return res.status(201).json(createdData);
    }

    document.Homecontent.push({ text, fontsize, fontcolour });
    const updatedData = await document.save();
    res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error adding Homecontent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all Homecontent items
app.get("/SiteManagement/Homecontent", async (req, res) => {
  try {
    const document = await SiteManagement.findOne();
    if (!document) {
      return res.status(404).json({ error: "No Homecontent found" });
    }
    res.status(200).json(document.Homecontent);
  } catch (error) {
    console.error("Error fetching Homecontent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Homecontent item by index
app.put("/SiteManagement/Homecontent/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const { text, fontsize, fontcolour } = req.body;

    const document = await SiteManagement.findOne();
    if (!document) {
      return res.status(404).json({ error: "No Homecontent found" });
    }

    if (index < 0 || index >= document.Homecontent.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    document.Homecontent[index].text = text;
    document.Homecontent[index].fontsize = fontsize;
    document.Homecontent[index].fontcolour = fontcolour;

    await document.save();
    res.status(200).json(document.Homecontent[index]);
  } catch (error) {
    console.error("Error updating Homecontent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Homecontent item by index
app.delete("/SiteManagement/Homecontent/:index", async (req, res) => {
  try {
    const { index } = req.params;

    const document = await SiteManagement.findOne();
    if (!document) {
      return res.status(404).json({ error: "No Homecontent found" });
    }

    if (index < 0 || index >= document.Homecontent.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    document.Homecontent.splice(index, 1);
    await document.save();

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting Homecontent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------------------------------------MY SQL --------------------------------------------------------------------------------

//------------------------------------------------------------courses --------------------------------------------------------------------------------

// fetch all data
app.get("/MysqlCourses", (req, res) => {
  const sql = "SELECT * FROM courses";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching courses:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.post(
  "/MysqlCourses",
  CourseDatas.fields([{ name: "courseImage" }, { name: "syllabus" }]),
  (req, res) => {
    const {
      _id,
      title,
      shortDesc,
      rating,
      longDesc,
      level,
      duration,
      category,
      iconLibrary,
      iconName,
    } = req.body;

    const imagePath = req.files["courseImage"]
      ? req.files["courseImage"][0].path
      : null;
    const syllabusPath = req.files["syllabus"]
      ? req.files["syllabus"][0].path
      : null;

    const sql = `INSERT INTO courses (_id, title, shortDesc, rating, longDesc, level, duration, category, iconLibrary, iconName, imagePath, syllabusPath) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const newCourse = [
      _id,
      title,
      shortDesc,
      rating,
      longDesc,
      level,
      duration,
      category,
      iconLibrary,
      iconName,
      imagePath,
      syllabusPath,
    ];

    db.query(sql, newCourse, (err, result) => {
      if (err) {
        console.error("Error adding course to MySQL:", err);
        // If there's an error, you might want to delete the uploaded files if they exist
        if (imagePath) {
          fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting uploaded image file:", unlinkErr);
            }
          });
        }
        if (syllabusPath) {
          fs.unlink(syllabusPath, (unlinkErr) => {
            if (unlinkErr) {
              console.error(
                "Error deleting uploaded syllabus file:",
                unlinkErr
              );
            }
          });
        }
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        newCourse.id = result.insertId;
        res.status(201).json(newCourse);
      }
    });
  }
);
app.put(
  "/MysqlCourses/:id",
  CourseDatas.fields([{ name: "courseImage" }, { name: "syllabus" }]),
  (req, res) => {
    const { title, shortDesc, rating, longDesc, level, duration, category } =
      req.body;

    const imagePath = req.files["courseImage"]
      ? req.files["courseImage"][0].path
      : null;
    const syllabusPath = req.files["syllabus"]
      ? req.files["syllabus"][0].path
      : null;

    const courseId = req.params.id;

    const updateFields = {
      title,
      shortDesc,
      rating,
      longDesc,
      level,
      duration,
      category,
      imagePath: imagePath || null, // Ensure imagePath is either the new path or null
      syllabusPath: syllabusPath || null, // Ensure syllabusPath is either the new path or null
    };

    const getOldPathsQuery =
      "SELECT imagePath, syllabusPath FROM courses WHERE _id = ?";
    db.query(getOldPathsQuery, [courseId], async (err, oldPathsResult) => {
      if (err) {
        console.error("Error fetching old paths from MySQL:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const oldImage = oldPathsResult[0].imagePath;
        const oldSyllabus = oldPathsResult[0].syllabusPath;

        const updateQuery = "UPDATE courses SET ? WHERE _id = ?";
        db.query(
          updateQuery,
          [updateFields, courseId],
          async (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error updating course in MySQL:", updateErr);
              // If there's an error, you might want to delete the uploaded files if they exist
              if (imagePath) {
                fs.unlink(imagePath, (unlinkErr) => {
                  if (unlinkErr) {
                    console.error(
                      "Error deleting uploaded image file:",
                      unlinkErr
                    );
                  }
                });
              }
              if (syllabusPath) {
                fs.unlink(syllabusPath, (unlinkErr) => {
                  if (unlinkErr) {
                    console.error(
                      "Error deleting uploaded syllabus file:",
                      unlinkErr
                    );
                  }
                });
              }
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              if (updateResult.affectedRows === 0) {
                // If the course doesn't exist, delete the uploaded files if they exist
                if (imagePath) {
                  fs.unlink(imagePath, (unlinkErr) => {
                    if (unlinkErr) {
                      console.error(
                        "Error deleting uploaded image file:",
                        unlinkErr
                      );
                    }
                  });
                }
                if (syllabusPath) {
                  fs.unlink(syllabusPath, (unlinkErr) => {
                    if (unlinkErr) {
                      console.error(
                        "Error deleting uploaded syllabus file:",
                        unlinkErr
                      );
                    }
                  });
                }
                res.status(404).json({ error: "Course not found" });
              } else {
                // Delete or replace old files if necessary
                if (
                  imagePath !== null &&
                  oldImage !== null &&
                  oldImage !== imagePath
                ) {
                  fs.unlink(oldImage, (unlinkErr) => {
                    if (unlinkErr) {
                      console.error(
                        "Error deleting or replacing old image file:",
                        unlinkErr
                      );
                    }
                  });
                }
                if (
                  syllabusPath !== null &&
                  oldSyllabus !== null &&
                  oldSyllabus !== syllabusPath
                ) {
                  fs.unlink(oldSyllabus, (unlinkErr) => {
                    if (unlinkErr) {
                      console.error(
                        "Error deleting or replacing old syllabus file:",
                        unlinkErr
                      );
                    }
                  });
                }
                res.json({ message: "Course updated successfully" });
              }
            }
          }
        );
      }
    });
  }
);

// Delete a course from MySQL
app.delete("/MysqlCourses/:id", (req, res) => {
  const courseId = req.params.id;
  const sql = "DELETE FROM courses WHERE _id = ?";
  db.query(sql, courseId, (err, result) => {
    if (err) {
      console.error("Error deleting course from MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Course not found" });
      } else {
        res.json({ message: "Course deleted successfully" });
      }
    }
  });
});

//------------------------------------------------------------enquiries --------------------------------------------------------------------------------

// fetch all data
app.get("/MysqlEnquiry", (req, res) => {
  const sql = "SELECT * FROM enquiries";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching courses:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

// Add a enquiry to MySQL
app.post("/MysqlEnquiry", (req, res) => {
  const newCourse = req.body;
  const sql = "INSERT INTO enquiries SET ?";
  db.query(sql, newCourse, (err, result) => {
    if (err) {
      console.error("Error adding course to MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      newCourse.id = result.insertId;
      res.status(201).json(newCourse);
    }
  });
});

// Delete a enquiry from MySQL
app.delete("/MysqlEnquiry/:id", (req, res) => {
  const courseId = req.params.id;
  const sql = "DELETE FROM enquiries WHERE _id = ?";
  db.query(sql, courseId, (err, result) => {
    if (err) {
      console.error("Error deleting course from MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Course not found" });
      } else {
        res.json({ message: "Course deleted successfully" });
      }
    }
  });
});

// fetch all data
app.get("/MysqlEnquiryAll", (req, res) => {
  const sql = "SELECT * FROM enquiries";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching courses:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.delete("/MysqlEnquiryAll", (req, res) => {
  // Assuming you have a table named "apply" in your MySQL database
  const deleteQuery = "DELETE FROM enquiries";

  // Execute the DELETE query
  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Error deleting all data:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting all data." });
    }
    res.json({ message: "All data has been deleted successfully." });
  });
});

// -----------------------------------------------------------Apply Now Form------------------------------------------------------------------------------------

// fetch all data
app.get("/MysqlApplyNow", (req, res) => {
  const sql = "SELECT * FROM applydatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching apply data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

// Add a Apply to MySQL
app.post("/MysqlApplyNow", (req, res) => {
  const newApplyData = req.body;
  const sql = "INSERT INTO applydatas SET ?";
  db.query(sql, newApplyData, (err, result) => {
    if (err) {
      console.error("Error adding applydatas to MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      newApplyData.id = result.insertId;
      res.status(201).json(newApplyData);
    }
  });
});

// Delete a Apply from MySQL
app.delete("/MysqlApplyNow/:id", (req, res) => {
  const applyId = req.params.id;
  const sql = "DELETE FROM applydatas WHERE _id = ?";
  db.query(sql, applyId, (err, result) => {
    if (err) {
      console.error("Error deleting applydatas from MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Course not found" });
      } else {
        res.json({ message: "Course deleted successfully" });
      }
    }
  });
});

// fetch all data to delete
app.get("/MysqlApplyNowAll", (req, res) => {
  const sql = "SELECT * FROM applydatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching apply data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.delete("/MysqlApplyNowAll", (req, res) => {
  // Assuming you have a table named "apply" in your MySQL database
  const deleteQuery = "DELETE FROM applydatas";

  // Execute the DELETE query
  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Error deleting all data:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting all data." });
    }
    res.json({ message: "All data has been deleted successfully." });
  });
});

//--------------------------------------------------service corporate form----------------------------------------------------------------------------------------

// fetch all data
app.get("/MysqlServiceCorporateData", (req, res) => {
  const sql = "SELECT * FROM servicecorporatedatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching corporate data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.post("/MysqlServiceCorporateData", (req, res) => {
  const {
    companyName,
    contactPersonName,
    role,
    email,
    phoneNumber,
    serviceOfInterest,
    additionalComments,
    subscribeToNewsletter,
    agreeToTerms,
  } = req.body;

  const newCorporateData = {
    companyName,
    contactPersonName,
    role,
    email,
    phoneNumber,
    serviceOfInterest: serviceOfInterest.join(", "),
    additionalComments,
    subscribeToNewsletter,
    agreeToTerms,
  };

  const sql = "INSERT INTO servicecorporatedatas SET ?";
  db.query(sql, newCorporateData, (err, result) => {
    if (err) {
      console.error("Error adding corporatedatas to MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      newCorporateData.id = result.insertId;
      res.status(201).json(newCorporateData);
    }
  });
});

// Delete a corporate from MySQL
app.delete("/MysqlServiceCorporateData/:id", (req, res) => {
  const corporateId = req.params.id;
  const sql = "DELETE FROM servicecorporatedatas WHERE _id = ?";
  db.query(sql, corporateId, (err, result) => {
    if (err) {
      console.error("Error deleting corporatedatas from MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Data not found" });
      } else {
        res.json({ message: "Data deleted successfully" });
      }
    }
  });
});

// fetch all data to delete
app.get("/MysqlServiceCorporateDataAll", (req, res) => {
  const sql = "SELECT * FROM servicecorporatedatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching corporate data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.delete("/MysqlServiceCorporateDataAll", (req, res) => {
  // Assuming you have a table named "apply" in your MySQL database
  const deleteQuery = "DELETE FROM servicecorporatedatas";

  // Execute the DELETE query
  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Error deleting all data:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting all data." });
    }
    res.json({ message: "All data has been deleted successfully." });
  });
});

//--------------------------------------------------service institute form----------------------------------------------------------------------------------------

// fetch all data
app.get("/MysqlServiceInstituteData", (req, res) => {
  const sql = "SELECT * FROM serviceinstitutedatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching institute data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.post("/MysqlServiceInstituteData", (req, res) => {
  const {
    institutionName,
    contactPerson,
    contactEmail,
    contactNumber,
    institutionAddress,
    services,
    additionalComments,
    subscribeToNewsletter,
    agreeToTerms,
  } = req.body;

  const newInstituteData = {
    institutionName,
    contactPerson,
    contactEmail,
    contactNumber,
    institutionAddress,
    services: services.join(", "),
    additionalComments,
    subscribeToNewsletter,
    agreeToTerms,
  };

  const sql = "INSERT INTO serviceinstitutedatas SET ?";
  db.query(sql, newInstituteData, (err, result) => {
    if (err) {
      console.error("Error adding institute to MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      newInstituteData.id = result.insertId;
      res.status(201).json(newInstituteData);
    }
  });
});

// Delete a institute from MySQL
app.delete("/MysqlServiceInstituteData/:id", (req, res) => {
  const instituteId = req.params.id;
  const sql = "DELETE FROM serviceinstitutedatas WHERE _id = ?";
  db.query(sql, instituteId, (err, result) => {
    if (err) {
      console.error("Error deleting institutedatas from MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Data not found" });
      } else {
        res.json({ message: "Data deleted successfully" });
      }
    }
  });
});

// fetch all data to delete
app.get("/MysqlServiceInstituteDataAll", (req, res) => {
  const sql = "SELECT * FROM serviceinstitutedatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching institute data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.delete("/MysqlServiceInstituteDataAll", (req, res) => {
  const deleteQuery = "DELETE FROM serviceinstitutedatas";

  // Execute the DELETE query
  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Error deleting all data:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting all data." });
    }
    res.json({ message: "All data has been deleted successfully." });
  });
});

//--------------------------------------------------service student form----------------------------------------------------------------------------------------

// fetch all data
app.get("/MysqlServiceStudentData", (req, res) => {
  const sql = "SELECT * FROM servicestudentdatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching student data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.post("/MysqlServiceStudentData", (req, res) => {
  const newStudentData = req.body;
  const sql = "INSERT INTO servicestudentdatas SET ?";
  db.query(sql, newStudentData, (err, result) => {
    if (err) {
      console.error("Error adding student to MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      newStudentData.id = result.insertId;
      res.status(201).json(newStudentData);
    }
  });
});

// Delete a student from MySQL
app.delete("/MysqlServiceStudentData/:id", (req, res) => {
  const studentId = req.params.id;
  const sql = "DELETE FROM servicestudentdatas WHERE _id = ?";
  db.query(sql, studentId, (err, result) => {
    if (err) {
      console.error("Error deleting studentdatas from MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Data not found" });
      } else {
        res.json({ message: "Data deleted successfully" });
      }
    }
  });
});

// fetch all data to delete
app.get("/MysqlServiceStudentDataAll", (req, res) => {
  const sql = "SELECT * FROM servicestudentdatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching student data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.delete("/MysqlServiceStudentDataAll", (req, res) => {
  const deleteQuery = "DELETE FROM servicestudentdatas";

  // Execute the DELETE query
  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Error deleting all data:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting all data." });
    }
    res.json({ message: "All data has been deleted successfully." });
  });
});

//--------------------------------------------------service employee form----------------------------------------------------------------------------------------

// fetch all data
app.get("/MysqlServiceEmployeeData", (req, res) => {
  const sql = "SELECT * FROM serviceemployeedatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.post("/MysqlServiceEmployeeData", (req, res) => {
  const newEmployeeData = req.body;
  const sql = "INSERT INTO serviceemployeedatas SET ?";
  db.query(sql, newEmployeeData, (err, result) => {
    if (err) {
      console.error("Error adding employee to MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      newEmployeeData.id = result.insertId;
      res.status(201).json(newEmployeeData);
    }
  });
});

// Delete a employee from MySQL
app.delete("/MysqlServiceEmployeeData/:id", (req, res) => {
  const employeeId = req.params.id;
  const sql = "DELETE FROM serviceemployeedatas WHERE _id = ?";
  db.query(sql, employeeId, (err, result) => {
    if (err) {
      console.error("Error deleting employeedatas from MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Data not found" });
      } else {
        res.json({ message: "Data deleted successfully" });
      }
    }
  });
});

// fetch all data to delete
app.get("/MysqlServiceEmployeeDataAll", (req, res) => {
  const sql = "SELECT * FROM serviceemployeedatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.delete("/MysqlServiceEmployeeDataAll", (req, res) => {
  const deleteQuery = "DELETE FROM serviceemployeedatas";

  // Execute the DELETE query
  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Error deleting all data:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting all data." });
    }
    res.json({ message: "All data has been deleted successfully." });
  });
});

//----------------------------------------join us-------------------------------------------------------------------------------------------------------

// fetch all data
app.get("/MysqlJoinUsData", (req, res) => {
  const sql = "SELECT * FROM joinusdatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

// API endpoint for form submission
app.post("/MysqlJoinUsData", Resume.single("resume"), (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    position,
    salaryRequirement,
    startDate,
    relocate,
    lastCompany,
    address,
    additionalInformation,
    website,
  } = req.body;

  const resumePath = req.file ? req.file.path : null;

  const sql = `INSERT INTO joinusdatas (fullname, email, phoneNumber, position, salaryRequirement, startDate, relocate, lastCompany, address, additionalInformation, website, resumePath) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    fullName,
    email,
    phoneNumber,
    position,
    salaryRequirement,
    startDate,
    relocate,
    lastCompany,
    address,
    additionalInformation,
    website,
    resumePath,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Form data submitted successfully" });
    }
  });
});

// Delete a employee from MySQL
app.delete("/MysqlJoinUsData/:id", (req, res) => {
  const employeeId = req.params.id;
  const sql = "DELETE FROM joinusdatas WHERE _id = ?";
  db.query(sql, employeeId, (err, result) => {
    if (err) {
      console.error("Error deleting employeedatas from MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Data not found" });
      } else {
        res.json({ message: "Data deleted successfully" });
      }
    }
  });
});

// fetch all data to delete
app.get("/MysqlJoinUsAll", (req, res) => {
  const sql = "SELECT * FROM joinusdatas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.delete("/MysqlJoinUsAll", (req, res) => {
  const deleteQuery = "DELETE FROM joinusdatas";

  // Execute the DELETE query
  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Error deleting all data:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting all data." });
    }
    res.json({ message: "All data has been deleted successfully." });
  });
});

//------------------------------------------------category management----------------------------------------------------------------------------------------

app.get("/MysqlCategory", (req, res) => {
  const query = "SELECT * FROM categorymanagement";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Category data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.delete("/MysqlCategory/:id", (req, res) => {
  const categoryId = req.params.id;
  const query = "DELETE FROM categorymanagement WHERE _id = ?";
  db.query(query, [categoryId], (err) => {
    if (err) {
      console.error("Error deleting Category:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(204).end();
    }
  });
});

app.post("/MysqlCategory", (req, res) => {
  const newCategory = req.body;
  const query = "INSERT INTO categorymanagement SET ?";
  db.query(query, newCategory, (err, result) => {
    if (err) {
      console.error("Error adding Category:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      newCategory._id = result.insertId;
      res.status(201).json(newCategory);
    }
  });
});

app.put("/MysqlCategory/:id", (req, res) => {
  const categoryId = req.params.id;
  const updatedCategory = req.body;
  const query = "UPDATE categorymanagement SET ? WHERE _id = ?";
  db.query(query, [updatedCategory, categoryId], (err, result) => {
    if (err) {
      console.error("Error updating category:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(updatedCategory);
    }
  });
});

app.listen(3002, () => {
  console.log("Server is connected successfully");
});
