// import React, { useState } from "react";
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import { IconButton } from '@mui/material';
// import { Link } from "react-router-dom";

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';



// import {
//   AppBar,
//   Tab,
//   Tabs,
//   Toolbar,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
// import DrawerComp from "./Drawer";


// const Header = () => {



//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   const [open, setOpen] = React.useState(false);
//   const handleOpen1 = () => setOpen(true);
//   const handleOpen2 = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const [value, setValue] = useState();
//   const theme = useTheme();
//   console.log(theme);
//   const isMatch = useMediaQuery(theme.breakpoints.down("md"));
//   console.log(isMatch);

//   return (
//     <React.Fragment>
//       <AppBar position="static" color="transparent">
//         <Toolbar>
//           {/* <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} /> */}
//           <Typography variant="body1" component="div" >
//             <a href="mailto:info@example.com" style={{ color: 'inherit', textDecoration: 'none' }}>
//               info@example.com
//             </a>{' '}
//             |{' '}
//             <a href="tel:123-456-789" style={{ color: 'inherit', textDecoration: 'none' }}>
//               123-456-789
//             </a>
//           </Typography>
//           {isMatch ? (
//             <>
//               <DrawerComp />
//             </>
//           ) : (
//             <>
//               <Tabs
//                 sx={{ marginLeft: "150px" }}
//                 indicatorColor="secondary"
//                 textColor="inherit"

//                 onChange={(e, value) => setValue(value)}
//               >

//                 <Tab label="Admission Process"                sx={{ marginLeft: "80px" }} />
//                 <Tab label="Apply Now" onClick={handleOpen1}  sx={{ marginLeft: "80px" }} />
//                 <Tab label="Enquiry"  onClick={handleOpen2}   sx={{ marginLeft: "80px" }}/>

//               </Tabs>

//               <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//               >
//                 <Box sx={style}>
//                   <Typography id="modal-modal-title" variant="h6" component="h2">
//                     Text in a modal
//                   </Typography>
//                   <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                     Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                   </Typography>
//                 </Box>
//               </Modal>
//               {/* <Button variant="contained">
//                <FacebookIcon />
//               </Button>
//               <Button sx={{ marginLeft: "10px" }} variant="contained">
//                 SignUp
//               </Button> */}
//               <IconButton sx={{ marginLeft: "auto", marginRight: "20px" }} color="inherit" href="https://facebook.com" target="_blank">
//                 <FacebookIcon />
//               </IconButton>
//               <IconButton sx={{ marginRight: "20px" }} color="inherit" href="https://twitter.com" target="_blank">
//                 <TwitterIcon />
//               </IconButton>
//               <IconButton sx={{ marginRight: "20px" }} color="inherit" href="https://instagram.com" target="_blank">
//                 <InstagramIcon />
//               </IconButton>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//     </React.Fragment>
//   );
// };

// export default Header;









