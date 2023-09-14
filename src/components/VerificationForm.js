// import React, { useState, useEffect } from 'react';
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Link } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// const YourComponent = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const isUserLoggedIn = localStorage.getItem('isLoggedIn');
//         if (isUserLoggedIn) {
//             setIsLoggedIn(true);
//         } else {
//             setIsOpen(true);
//         }
//     }, []);

//     const handleButtonClick = () => {
//         if (!isLoggedIn) {
//             setIsOpen(true);
//         } else {
//             // Redirect to the particular page
//             navigate('/target-page');
//         }
//     };

//     const handleClose = () => {
//         setIsOpen(false);
//     };

//     const handleSignIn = () => {
//         // Perform sign in logic
//         // Set isLoggedIn state to true upon successful sign in
//         setIsLoggedIn(true);
//         localStorage.setItem('isLoggedIn', true);
//         setIsOpen(false);
//         // Redirect to the particular page
//         navigate('/target-page');
//     };

//     const handleSignUp = () => {
//         // Perform sign up logic
//         // Set isLoggedIn state to true upon successful sign up
//         setIsLoggedIn(true);
//         localStorage.setItem('isLoggedIn', true);
//         setIsOpen(false);
//         // Redirect to the particular page
//         navigate('/target-page');
//     };

//     const HomePage = ({ course, url }) => (
//         <div>
//             <h1>Welcome to the Home Page!</h1>
//             <Button
//                 key={course}
//                 variant="outlined"
//                 component={Link}
//                 to={url}
//                 color="secondary"
//                 onClick={handleButtonClick}
//             >
//                 readmore
//             </Button>
//         </div>
//     );

//     return (
//         <>
//             <Routes>
//                 <Route exact path="/" component={HomePage} />
//             </Routes>

//             <Dialog open={isOpen} onClose={handleClose}>
//                 <DialogTitle>Sign In or Sign Up</DialogTitle>
//                 <DialogContent>
//                     {/* Your sign in/sign up form goes here */}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleSignIn} color="primary">
//                         Sign In
//                     </Button>
//                     <Button onClick={handleSignUp} color="primary">
//                         Sign Up
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };

// export default YourComponent;







// import React, { useState, useContext } from 'react';
// import { Tab, Tabs } from '@mui/material';
// import Button from '@mui/material/Button';
// import Rating from '@mui/material/Rating';
// import { Link, Outlet } from 'react-router-dom';
// import ApplyNow from '../Reusablecomponents/ApplyForm';
// import { TbBrandJavascript } from 'react-icons/tb';
// import { TfiHtml5 } from 'react-icons/tfi';
// import { FaCss3Alt, FaReact, FaNodeJs, FaVuejs } from 'react-icons/fa';
// import { DiMongodb } from 'react-icons/di';
// import { TbBrandCSharp } from 'react-icons/tb';
// import { BsFiletypeSql } from 'react-icons/bs';
// import { SiAngular } from 'react-icons/si';

// // Create a new context for user authentication
// const UserContext = React.createContext();

// const CourseSectionUI = () => {
//   const [user, setUser] = useState(null);

//   const handleLogin = () => {
//     // Simulating a login process
//     const userData = { username: 'exampleUser', email: 'user@example.com' };
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   const cardStyle = {
//     width: '350px',
//     userSelect: 'none',
//     height: '226px',
//     border: '2px solid rgba(255, 255, 255, 0.2)',
//     backgroundColor: '#ffffff',
//     borderRadius: '5px',
//     zIndex: '1',
//     overflow: 'hidden',
//     marginTop: '30px',
//   };

//   const headerStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: '10px',
//   };

//   const h1Style = {
//     fontSize: '20px',
//     color: '#0a253f',
//   };

//   const pStyle = {
//     fontSize: '16px',
//     padding: '10px 20px 0 0',
//     color: '#4a4970',
//   };

//   const contentImageStyle = {
//     padding: '7px 10px',
//     fontSize: '40px',
//     borderRadius: '50px',
//     color: '#ffffff',
//     backgroundColor: 'black',
//   };

//   const footerStyle = {
//     padding: '10px 20px',
//     alignItems: 'center',
//     backgroundColor: '#F0F4F7',
//     display: 'flex',
//     justifyContent: 'space-between',
//     borderTop: '3px solid #025aa5',
//   };

//   const [filter, setFilter] = useState('all');

//   const courses = [
//     {
//       id: 1,
//       title: 'HTML',
//       category: 'Automotive-Embed-Track',
//       rating: 4,
//       iconname: 'html',
//       url: '/course-html',
//     },
//     {
//       id: 2,
//       title: 'CSS',
//       category: 'Software-Development-Track',
//       rating: 4,
//       iconname: 'css',
//       url: '/course-css',
//     },
//     {
//       id: 3,
//       title: 'JAVA',
//       category: 'Testing-Track',
//       rating: 3,
//       iconname: 'java',
//     },
//     {
//       id: 4,
//       title: 'REACT',
//       category: 'Mechanical-Design',
//       rating: 4.5,
//       iconname: 'react',
//     },
//     {
//       id: 5,
//       title: 'NODEJS',
//       category: 'Backend-Development',
//       rating: 4,
//       iconname: 'nodejs',
//     },
//     {
//       id: 6,
//       title: 'ANGULAR',
//       category: 'Frontend-Development',
//       rating: 4.5,
//       iconname: 'angular',
//     },
//     {
//       id: 7,
//       title: 'C#',
//       category: 'Automotive-Embed-Track',
//       rating: 4,
//       iconname: 'csharp',
//     },
//     {
//       id: 8,
//       title: 'SQL',
//       category: 'Software-Development-Track',
//       rating: 4,
//       iconname: 'sql',
//     },
//     {
//       id: 9,
//       title: 'MongoDB',
//       category: 'Testing-Track',
//       rating: 3,
//       iconname: 'mongodb',
//     },
//     {
//       id: 10,
//       title: 'Vue.js',
//       category: 'Mechanical-Design',
//       rating: 4.5,
//       iconname: 'vuejs',
//     },
//   ];

//   const filteredCourses = filter === 'all' ? courses : courses.filter((course) => course.category === filter);

//   return (
//     <UserContext.Provider value={user}>
//       <section className="course-section spad pb-0" style={{ marginTop: '38px' }}>
//         <div className="course-warp">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="section-title">
//                   <h2>Popular Courses</h2>
//                 </div>
//                 <Tabs value={filter} onChange={(e, newValue) => setFilter(newValue)}>
//                   <Tab label="All" value="all" />
//                   <Tab label="Automotive-Embed-Track" value="Automotive-Embed-Track" />
//                   <Tab label="Software-Development-Track" value="Software-Development-Track" />
//                   <Tab label="Testing-Track" value="Testing-Track" />
//                   <Tab label="Mechanical-Design" value="Mechanical-Design" />
//                   <Tab label="Backend-Development" value="Backend-Development" />
//                   <Tab label="Frontend-Development" value="Frontend-Development" />
//                 </Tabs>
//               </div>
//             </div>
//           </div>
//           <Outlet />
//           <div className="row " style={{ marginLeft: '40px', marginRight: '50px' }}>
//             {filteredCourses.map((course) => (
//               <div className={`mix col-lg-3 col-md-4 col-sm-6 `}>
//                 <div className="course__item" style={cardStyle}>
//                   <div className="course__item__pic">
//                     <img src={`./img/${course.iconname}.png`} alt={course.title} />
//                   </div>
//                   <div className="course__item__text">
//                     <span className="course__label">{course.category}</span>
//                     <h5>{course.title}</h5>
//                     <div className="course__rating">
//                       <Rating name="half-rating-read" defaultValue={course.rating} precision={0.5} readOnly />
//                     </div>
//                     <p style={pStyle}>
//                       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
//                       labore et dolore magna aliqua.
//                     </p>
//                     <div className="course__item__footer">
//                       <div className="course__item__details">
//                         <div style={contentImageStyle}>
//                           {course.iconname === 'html' && <TfiHtml5 />}
//                           {course.iconname === 'css' && <FaCss3Alt />}
//                           {course.iconname === 'java' && <FaVuejs />}
//                           {course.iconname === 'react' && <FaReact />}
//                           {course.iconname === 'nodejs' && <FaNodeJs />}
//                           {course.iconname === 'angular' && <SiAngular />}
//                           {course.iconname === 'csharp' && <TbBrandCSharp />}
//                           {course.iconname === 'sql' && <BsFiletypeSql />}
//                           {course.iconname === 'mongodb' && <DiMongodb />}
//                           {course.iconname === 'vuejs' && <FaVuejs />}
//                         </div>
//                         <h5 style={h1Style}>{course.title}</h5>
//                       </div>
//                       <div className="course__price">
//                         <Button
//                           component={Link}
//                           to={course.url}
//                           variant="contained"
//                           color="primary"
//                           onClick={handleLogin}
//                           style={{ backgroundColor: '#025aa5' }}
//                         >
//                           Apply Now
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <ApplyNow />
//     </UserContext.Provider>
//   );
// };

// export default CourseSectionUI;
