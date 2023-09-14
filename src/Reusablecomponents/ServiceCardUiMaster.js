import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { Textcard5, Textcard6 } from "../Reusablecomponents/DisplayComponent";
import "./CourseSectionUI.Css"


const ServiceCardUiMaster = ({ cardData }) => {
    const conRefs = useRef([]);

    const handleScroll = (role, index) => {
        let roleData;
        if (role === 'company') {
            roleData = cardData.filter(data => data.title === 'company');
        } else if (role === 'smartcliff') {
            roleData = cardData.filter(data => data.title === 'smartcliff');
        }

        if (roleData) {
            const scrollPosition = conRefs.current[roleData[index].id].offsetTop - 130;
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        }
    };

    const companyRoleData = cardData.filter(data => data.title === 'company');
    const smartcliffRoleData = cardData.filter(data => data.title === 'smartcliff');

    return (
        <>

            <div>
                {companyRoleData.length > 0 && (
                    <>
                        <h1 style={{ textAlign: "center", textTransform: "capitalize" }}>{companyRoleData[0].mainhead} </h1>
                        <div className="container-fluid tabs" style={{ marginTop: "40px" }}>
                            <div className="rows" style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                {companyRoleData.map((data, index) => (
                                    <div className="tabbtn" key={index} >
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color='secondary'
                                            onClick={() => handleScroll('company', index)}
                                        >
                                            {data.buttonText}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {companyRoleData.map((data, index) => (
                            <div
                                className="container con"
                                key={index}
                                ref={(ref) => (conRefs.current[data.id] = ref)}
                                style={{ marginTop: "40px" }}
                            >
                                {index % 2 === 0 ? (
                                    <Textcard5
                                        imageSrc={data.imageSrc}
                                        heading={data.heading}
                                        content={data.content}
                                        formType={data.form} 
                                    />
                                  
                                ) : (
                                    <Textcard6
                                        imageSrc={data.imageSrc}
                                        heading={data.heading}
                                        content={data.content}
                                        formType={data.form} 
                                    />
                                )}
                            </div>
                            
                        ))}
                    </>
                )}

            </div>


            <div>
                {smartcliffRoleData.length > 0 && (
                    <>
                        <h1 style={{ textAlign: "center", marginTop: "40px", textTransform: "capitalize" }}>{smartcliffRoleData[0].title} Role</h1>
                        <div className="container-fluid tabs" style={{ marginTop: "40px" }}>
                            <div className="rows" style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                {smartcliffRoleData.map((data, index) => (
                                    <div className="tabbtn" key={index} >
                                        <Button                                         
                                            size="small"
                                            variant="outlined"
                                            color='secondary'
                                            onClick={() => handleScroll('smartcliff', index)}
                                        >
                                            {data.buttonText}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {smartcliffRoleData.map((data, index) => (
                            <div
                                className="container con"
                                key={index}
                                ref={(ref) => (conRefs.current[data.id] = ref)}
                                style={{ marginTop: "40px" }}
                            >
                                {index % 2 === 0 ? (
                                    <>
                                        <Textcard5
                                            imageSrc={data.imageSrc}
                                            heading={data.heading}
                                            content={data.content}
                                            formType={data.form} 
                                        />

                                    </>
                                ) : (
                                    <>
                                        <Textcard6
                                            imageSrc={data.imageSrc}
                                            heading={data.heading}
                                            content={data.content}
                                            formType={data.form} 
                                        />
                                        
                                    </>
                                )}
                                <>
                                
                                </>
                            </div>
                        ))}
                    </>
                )}
            </div>


        </>
    );
};

export default ServiceCardUiMaster;
