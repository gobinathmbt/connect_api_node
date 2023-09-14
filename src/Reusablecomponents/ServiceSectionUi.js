import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import VerticalServiceUi from './ServiceSectionVertcalUi';
import htd from "../Pics/htd1.png";
import hfm from "../Pics/business-concept-business-woman-businessman-holding-hire-us-banner-vector-illustration-74364724.webp";
import training from "../Pics/training.png";
import ServiceCardUiMaster from './ServiceCardUiMaster';
import Data from "../components/DataMaster.json"

const tabStyle = {
    display: 'flex',
    justifyContent: 'center',
};

const ServiceUi = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleTabChange = (_, newValue) => {
        setCurrentTab(newValue);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


const ServiceData1 = Data.ServiceData1
const ServiceData2 = Data.ServiceData2
const ServiceData3 = Data.ServiceData3
const ServiceData4 = Data.ServiceData4
const ServiceData5 = Data.ServiceData5
const ServiceData6 = Data.ServiceData6
const ServiceData7 = Data.ServiceData7
const ServiceData8 = Data.ServiceData8
const ServiceData9 = Data.ServiceData9
const ServiceData10 = Data.ServiceData10



    return (
        <div >
            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="fullWidth"
                style={tabStyle}
            >
                <Tab label="Corporates" onClick={handleMenuOpen} style={{fontSize:"30px",textTransform:"capitalize", color: '#9c27b0'}} />
                <Tab label="Institution" onClick={handleMenuOpen} style={{fontSize:"30px",textTransform:"capitalize", color: '#9c27b0'}}/>
                <Tab label="Students" onClick={handleMenuOpen}style={{fontSize:"30px",textTransform:"capitalize", color: '#9c27b0'}}/>
                <Tab label="Employees" onClick={handleMenuOpen} style={{fontSize:"30px",textTransform:"capitalize", color: '#9c27b0'}}/>
            </Tabs>

            {currentTab === 0 && (
                <div>
                    <VerticalServiceUi
                        head1="HTD"
                        img1={htd}
                        head2="HIRE FROM US"
                        img2={hfm}
                        head3="LATERAL TRAINING"
                        img3={training}
                        c1={<ServiceCardUiMaster cardData={ServiceData1} />}
                        c2={<ServiceCardUiMaster cardData={ServiceData2} />}
                        c3={<ServiceCardUiMaster cardData={ServiceData3} />}
                    />
                </div>
            )}

            {currentTab === 1 && (
                <div>
                    <VerticalServiceUi
                        head1="TRAIN AND PLACE"
                        head2="HIRE TRAIN DEPLOY"
                        head3="COE"
                        c1={<ServiceCardUiMaster cardData={ServiceData4} />}
                        c2={<ServiceCardUiMaster cardData={ServiceData5} />}
                        c3={<ServiceCardUiMaster cardData={ServiceData6} />}
                    />
                </div>
            )}

            {currentTab === 2 && (
                <div>
                    <VerticalServiceUi
                        head1="UPSKILLING"
                        head2="HIGHER EDUCATION"
                        c1={<ServiceCardUiMaster cardData={ServiceData7} />}
                        c2={<ServiceCardUiMaster cardData={ServiceData8} />}
                    />
                </div>
            )}

            {currentTab === 3 && (
                <div>
                    <VerticalServiceUi
                        head1="INVIDUALS"
                        head2="LATERAL TRAINING"
                        c1={<ServiceCardUiMaster cardData={ServiceData9} />}
                        c2={<ServiceCardUiMaster cardData={ServiceData10} />}
                    />
                </div>
            )}
        </div>
    );
};

export default ServiceUi;
