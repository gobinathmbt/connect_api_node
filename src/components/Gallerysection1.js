import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Banner from '../Reusablecomponents/Banner'
import "../css/Gallery.css"
import logo from "../Pics/21.jpg"
import logo1 from "../Pics/19.JPG"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';
import SwiperCore from 'swiper';
SwiperCore.use([Autoplay]);


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Gallerysection1() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Banner title="Gallery" />
      <div className='container-fluid' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '80%', marginTop: '60px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '40px' }}>
            <Button
              variant={value === 0 ? 'contained' : 'outlined'}
              onClick={(event) => handleChange(event, 0)}
              style={{ marginRight: '10px' }}
              color='secondary'

            >
              Image Gallery
            </Button>
            <Button
              variant={value === 1 ? 'contained' : 'outlined'}
              onClick={(event) => handleChange(event, 1)}
              color='secondary'
            >
              Video Gallery
            </Button>
          </Box>
          <TabPanel value={value} index={0}>
            <>
              <h1 style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}> Our Infrastructre</h1>
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                autoplay={{ delay: 3000 }}

              >


                <SwiperSlide>
                  <div>
                    <div className="container-fluid" >
                      <img src={logo} style={{ height: "500px", width: "100%" }} />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="container-fluid">
                      <img src={logo1} style={{ height: "500px", width: "100%" }} />
                    </div>
                  </div>
                </SwiperSlide>
         

              </Swiper>


            </>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <h1> Viedo Gallery</h1>
          </TabPanel>
        </Box>
      </div>
    </>
  );
}
