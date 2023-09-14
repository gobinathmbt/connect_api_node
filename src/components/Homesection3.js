import React from 'react'
import { Textcard1, Textcard2 } from "../Reusablecomponents/DisplayComponent"
import logo1 from "../Pics/4-1.jpg"
import logo2 from "../Pics/3.jpg"
import logo3 from "../Pics/4.webp"
import Cardcomponent1 from '../Reusablecomponents/Cardcomponent1';
import CountSection from '../Reusablecomponents/VisitedSectionCount'
import data from "./DataMaster.json"

const Homesection3 = () => {

    const { box1, box2, box3 } = data.HomeSection3;

    return (
        <>
            <section class="home-page3" id="home-page3">
                <div class="container-fluid">



                    <div class="container" style={{ marginTop: "40px" }}>

                        <div class="row">
                            <div class="col-sm-12 heading">
                                <h1 className='maintext'>Endless Benefits From The Best Software Training Institute In Coimbatore</h1>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <h6 className='subtext'>smartcliff provides various benefits to make sure our students stands out from the
                                    competition</h6>
                            </div>
                        </div>
                    </div>


                    <div className='container' style={{ marginTop: "40px" }}>
                        <Textcard1 imageSrc={logo1}
                            heading={box1.heading}
                            content={box1.content} />
                    </div>
                    <div className='container' style={{ marginTop: "40px" }}>
                        <Textcard2 imageSrc={logo2}
                            heading={box2.heading}
                            content={box2.content} />
                    </div>

                </div>
            </section>




            <section class="home-page4" id="home-page4">
                <div class="container-fluid">

                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-5 sub1">
                                <Cardcomponent1 />
                            </div>





                            <div class="col-sm-7">


                                <div class="container sub2">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="container box1">
                                                <CountSection
                                                    countHeading="150"
                                                    subheading="Custom Courses"
                                                    content="Smartcliff is the only Software Training Institute in Coimbatore with 150+ Customized Courses to serve the needs of the learner's job profile requirements. Learn specific modules to sharpen your skills to excel in a particular technology!"
                                                />
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div class="container box1">
                                                <CountSection
                                                    countHeading="80"
                                                    subheading="Expertise Tutors"
                                                    content="Smartcliff owes its success majorly to its team of faculty. Smartcliff is the best Software Training Institute in Coimbatore with a team of 80+ tutors from various technology backgrounds with a career spanning of 15+ years in the IT industry."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="container box1">
                                                <CountSection
                                                    countHeading="5000"
                                                    subheading="Placements and still growing"
                                                    content="We have built a community of 5000+ successful candidates placed in excellent jobs across various streams at reputed IT Industry Majors worldwide. The Smartcliff family of technology experts is growing every day!"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="container box1">
                                                <CountSection
                                                    countHeading="100"
                                                    subheading="Practical Sessions"
                                                    content="Learning theories alone will not help. So Smartcliff is the only Software Training Institute in Coimbatore with 100+ practical and exclusive real-time scenarios to test your skills and make you learn the problem-solving techniques to arrive efficiently at a solution."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>


                    <div className='container' style={{ marginTop: "40px" }}>
                        <Textcard1 imageSrc={logo3}
                            heading={box3.heading}
                            content={box3.content} />
                    </div>

                </div>
            </section>




        </>
    )
}

export default Homesection3