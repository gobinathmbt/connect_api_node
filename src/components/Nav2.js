// import React, { useState } from "react";
// import { Link } from "react-router-dom";


// import {
//   AppBar,
//   Tab,
//   Tabs,
//   Toolbar,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";

// import DrawerComp from "./Drawer";


// const Header2 = () => {
//   const [value, setValue] = useState();
//   const theme = useTheme();
//   console.log(theme);
//   const isMatch = useMediaQuery(theme.breakpoints.down("md"));
//   console.log(isMatch);

//   return (
//     <React.Fragment>
//       <AppBar position="sticky" sx={{ backgroundColor: "orange"}}>
//         <Toolbar>
//           {isMatch ? (
//             <>
//               <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
//              SMART CLIFF
//               </Typography>
           
              
//               <DrawerComp />
//             </>
//           ) : (
//             <>
//               <Tabs
//               sx={{ marginLeft: "70px"}}
//                 indicatorColor="secondary"
//                 textColor="inherit"
//                 value={value}
//                 onChange={(e, value) => setValue(value)}
                
//               >
//                 <Tab label="HOME"  to='/' component={Link} sx={{ marginLeft: "70px",fontSize:"15px",fontWeight:"700",color:"black"}}  />
//                 <Tab label="ABOUT-US"  to='/about-us' component={Link} sx={{ marginLeft: "70px",fontSize:"15px",fontWeight:"700",color:"black"}} />
//                 <Tab label="COURSES"  sx={{ marginLeft: "70px",fontSize:"15px",fontWeight:"700",color:"black"}}/>
//                 <Tab label="SERVICES" sx={{ marginLeft: "70px",fontSize:"15px",fontWeight:"700",color:"black"}} />
//                 <Tab label="HIRE_FROM_US" sx={{ marginLeft: "70px",fontSize:"15px",fontWeight:"700",color:"black"}} />
//                 <Tab label="JOIN_US"  sx={{ marginLeft: "70px",fontSize:"15px",fontWeight:"700",color:"black"}}/>
//                 <Tab label="PLACEMENT" sx={{ marginLeft: "70px",fontSize:"15px",fontWeight:"700",color:"black"}} />
//                 <Tab label="GALLERY" sx={{ marginLeft: "70px",fontSize:"15px",fontWeight:"700",color:"black"}} />
              
//               </Tabs>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//     </React.Fragment>
//   );
// };

// export default Header2;
