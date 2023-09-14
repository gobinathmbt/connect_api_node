import React from 'react';
import { Typography } from '@mui/material';

const DisplayCard = ({ logo, heading, content }) => {
    return (


        <>
            <div className="row">
                <div className="col-sm-2 display-cards-image">
                    <img className="img-fluid" src={logo} alt="Logo" />
                </div>
                <div className="col-sm-10 display-cards-heading">
                    {heading}
                </div>
            </div>
            <div>
                <Typography variant="body1" className="display-cards-content">
                    {content}
                </Typography>
            </div>


        </>
    );
};

export default DisplayCard;
