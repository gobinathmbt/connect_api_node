

import React from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material';


// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';


// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

// function TabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`vertical-tabpanel-${index}`}
//             aria-labelledby={`vertical-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// function a11yProps(index: number) {
//     return {
//         id: `vertical-tab-${index}`,
//         'aria-controls': `vertical-tabpanel-${index}`,
//     };
// }

// export default function VerticalTabs({ head1, head2, head3, img1, img2, img3, c1, c2, c3 }) {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//         setValue(newValue);
//     };

//     return (
//         <div className="container-fluid" style={{ display: 'flex' }}>
//             <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 <Tabs
//                     orientation="vertical"
//                     variant="scrollable"
//                     value={value}
//                     onChange={handleChange}
//                     aria-label="Vertical tabs example"
//                     sx={{ borderRight: 1, borderColor: 'divider' }}
//                 >


{/* <Tab
    label={
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
            <img src={img1} style={{ height: '40px', marginRight: '10px' }} />
            <Typography variant="body1" style={{ fontSize: "20px" }}>{head1}</Typography>
        </div>
    }
    {...a11yProps(0)}
    style={{ marginTop: '50px', color: '#9c27b0' }}
/> */}


//                     <Tab label={
//                         <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
//                             <img src={img2} style={{ height: '40px', width: "40px", marginRight: '10px', borderRadius: '50%' }} />
//                             <Typography variant="body1" style={{ fontSize: "20px" }}>{head2}</Typography>
//                         </div>
//                     } {...a11yProps(1)} style={{ marginTop: "40px", color: '#9c27b0' }} />




//                     <Tab label={
//                         <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
//                             <img src={img3} style={{ height: '40px', marginRight: '10px' }} />
//                             <Typography variant="body1" style={{ fontSize: "20px" }}>{head3}</Typography>
//                         </div>
//                     } {...a11yProps(2)} style={{ marginTop: "40px", marginBottom: "140%", color: '#9c27b0' }} />
//                 </Tabs>


//             </div>

//             <div style={{ flex: 1 }}>
//                 <TabPanel value={value} index={0}>
//                     <div className='container'>
//                         <h1>{c1}</h1>
//                     </div>
//                 </TabPanel>

//                 <TabPanel value={value} index={1}>
//                     <h1>{c2}</h1>
//                 </TabPanel>

//                 <TabPanel value={value} index={2}>
//                     <h1>{c3}</h1>
//                 </TabPanel>
//             </div>
//         </div>
//     );
// }

















export default function VerticalServiceUi({ head1, head2, head3, img1, img2, img3, c1, c2, c3 }) {


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>




            <Box sx={{ display: 'flex' }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Side tabs"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                    style={{width:"240px"}}
                >
                    <Tab
                        label={
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                                {/* <img src={img1} style={{ height: '40px', marginRight: '10px' }} /> */}
                                <Typography variant="body1">{head1}</Typography>
                            </div>
                        }
                      
                        style={{ marginTop: '50px', color: '#9c27b0' }}
                    />


                    <Tab label={
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                            {/* <img src={img2} style={{ height: '40px', width: "40px", marginRight: '10px', borderRadius: '50%' }} /> */}
                            <Typography variant="body1">{head2}</Typography>
                        </div>
                    } style={{ marginTop: "40px", color: '#9c27b0' }} />




                    <Tab label={
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                            {/* <img src={img3} style={{ height: '40px', marginRight: '10px' }} /> */}
                            <Typography variant="body1">{head3}</Typography>
                        </div>
                    }style={{ marginTop: "40px", marginBottom: "140%", color: '#9c27b0' }} />


                </Tabs>

                <Box sx={{ flexGrow: 1, p: 2 }}>
                    {value === 0 && (
                        <div className='container'>
                            <h1>{c1}</h1>
                        </div>
                    )}
                    {value === 1 && (
                        <div className='container'>
                            <h1>{c2}</h1>
                        </div>
                    )}
                    {value === 2 && (
                        <div className='container'>
                            <h1>{c3}</h1>
                        </div>
                    )}

                </Box>
                
            </Box>



        </>
    )
}


