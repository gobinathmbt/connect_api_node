import React from 'react'
import logo2 from "../Pics/16.JPG"
import "../css/Joinus.css"
import ApplyCard from '../Reusablecomponents/ApplyCard'
import JoinUsForm from '../Reusablecomponents/JoinUsForm'
import EnquiryForm from '../Reusablecomponents/EnquiryForm'
import Banner from '../Reusablecomponents/Banner'

const Joinussection1 = () => {


    const box1 = {
        heading: 'Oracle DBA Trainer',
        content: ' 3+ years of experience in Oracle Database',
    };
    const box2 = {
        heading: 'Apache Spark Trainer',
        content: '3+ years of experience in Apache Spark',
    };
    const box3 = {
        heading: 'Java Trainer',
        content: ' 3+ years of experience in Java',
    };
    const box4 = {
        heading: 'Android Development Trainer',
        content: ' 3+ years of experience in Android Development',
    };
    const box5 = {
        heading: 'Python Trainer',
        content: '3+ years of experience in Python',
    };
    const box6 = {
        heading: 'Data Science Trainer',
        content: '3+ years of experience in Data Science',
    };
    const box7 = {
        heading: 'Digital Marketing Executive',
        content: ' 3+ years of experience in Oracle Database',
    };
    const box8 = {
        heading: 'Content Writer',
        content: ' 2+ years of experience in Content Writing',
    };
    const box9 = {
        heading: 'Web Designer',
        content: ' 2+ years of experience in Web Design',
    };

    return (
        <>

            <section class="joinus-page1" id="joinus-page1">

                <Banner title="Join Us" />

                <div class="container-fluid main">
                    <div class="container-fluid">
                        <div>
                            <h3>OUR PROCESS</h3>
                        </div>
                        <div>
                            <h6>
                                At this stage, we will assist you to choose the right technology by explaining the pro's & con's of each
                                technology </h6>
                        </div>
                        <div className='btn2'>
                            <EnquiryForm btnname="talk to experts" btnvar="contained" btncolor="secondary" />
                        </div>
                    </div>

                    <div className='container-fluid' style={{ marginTop: "60px" }}>

                        <div class="row">
                            <div class="col-sm-5"><img className='img-fluid'  src={logo2} style={{ height: "420px", width: "100%" }} /></div>
                            <div class="col-sm-7">
                                <div>
                                    <h2 style={{ textAlign: "center", color: 'orange', fontWeight: "700" }}>Smartcliff is hiring! Join our Workforce!</h2>
                                </div>
                                <div>
                                    <h6 style={{ textAlign: "left" }}>Are you an experienced IT professional and Passionate about teaching? Come, join with the team of experts
                                        and be one of the sculptor to shape someone's dream career at Infycle</h6>
                                </div>

                                <div class="container-fluid" style={{ marginTop: "40px" }}>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div>
                                                <p style={{ fontSize: "70px", color: "#15c1e4", fontWeight: "600" }}>50+</p>
                                            </div>
                                            <div>
                                                <h6 style={{ textAlign: "left" }}>
                                                    We deliver the knowledge of the most demanding courses with our experts and enhance their skills and
                                                    technical knowledge
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div>
                                                <p style={{ fontSize: "70px", color: "#15c1e4", fontWeight: "600" }}>90+</p>
                                            </div>
                                            <div>
                                                <h6 style={{ textAlign: "left" }}>
                                                    Smartcliff is united with the leading industrial experts to supply the best knowledge without any
                                                    quality compromise
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>



                    <div class="container">
                        <div class="container-fluid" style={{ marginTop: "60px" }}>


                            <div class="row applycards" >
                                <div class="col-sm-4">
                                    <ApplyCard heading={box1.heading} content={box1.content} />
                                </div>
                                <div class="col-sm-4">
                                    <ApplyCard heading={box2.heading} content={box2.content} />
                                </div>
                                <div class="col-sm-4">

                                    <ApplyCard heading={box3.heading} content={box3.content} />
                                </div>
                            </div>
                            <div class="row applycards" >
                                <div class="col-sm-4">
                                    <ApplyCard heading={box4.heading} content={box4.content} />
                                </div>
                                <div class="col-sm-4">
                                    <ApplyCard heading={box5.heading} content={box5.content} />
                                </div>
                                <div class="col-sm-4">

                                    <ApplyCard heading={box6.heading} content={box6.content} />
                                </div>
                            </div>
                            <div class="row applycards" >
                                <div class="col-sm-4">
                                    <ApplyCard heading={box7.heading} content={box7.content} />
                                </div>
                                <div class="col-sm-4">
                                    <ApplyCard heading={box8.heading} content={box8.content} />
                                </div>
                                <div class="col-sm-4">

                                    <ApplyCard heading={box9.heading} content={box9.content} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="container-fluid text" id="whowe-page2" style={{ marginTop: "40px", textAlign: "center" }}>

                        <div class="row">
                            <div class="col-sm-12 ">
                                <div className='row heading1'>
                                    <div className='col-sm-6'>
                                        <h2 className='maintext'> Interested? Let's get in touch! Drop in your resume</h2>
                                    </div>
                                    <div className='col-sm-2'> <JoinUsForm btnname="ApplyNow" class="btn3" btnvar="contained" btncolor="secondary" /></div>

                                </div>
                            </div>
                        </div>

                    </div>







                </div>
            </section>

        </>
    )
}

export default Joinussection1