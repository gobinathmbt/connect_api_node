import React from 'react'
import "../css/OurApproach.css"
import EnquiryForm from '../Reusablecomponents/EnquiryForm'
import Banner from '../Reusablecomponents/Banner'

const Ourapproachsection1 = () => {
    return (
        <>



            <section class="approach-page1" id="approach-page1">

              <Banner title=" Our Approach"/>

                <div class="container-fluid main">
                    <div class="container-fluid">
                        <div>
                            <h3>OUR PROCESS</h3>
                        </div>
                        <div>
                            <h5>
                                At this stage, we will assist you to choose the right technology by explaining the pro's & con's of each
                                technology </h5>
                        </div>
                        <div className='btn2'>
                            <EnquiryForm btnname="more details" btnvar="contained" btncolor="secondary" />
                        </div>
                    </div>

                    <div class="container-fluid middle" >
                        <div class="row">


                            <div class="col-sm-3 subdiv">
                                <div class="maindiv">
                                    <div class="parentdiv">
                                        <span class="a">1</span>
                                    </div>
                                    <div>
                                        <div class="childdiv">
                                            <div class="childhead"><h4>Identify Your Primary <br /> Goal</h4></div>
                                            <div class="childcontent">Our team will sit with you to understand your primary goal & will help you to
                                                figure out the possibilities to achieve it.
                                                Lorem ipsum dolor sit amet. </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="col-sm-3 subdiv">
                                <div class="maindiv">
                                    <div class="parentdiv">
                                        <span class="a">2</span>
                                    </div>
                                    <div class="childdiv">
                                        <div class="childhead"><h4>Assisting To Choose Right Technologies</h4></div>
                                        <div class="childcontent">At this stage, we will assist you to choose the right technology by explaining the pro's & con's of each technology.
                                            Lorem ipsum dolor sit amet.</div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-sm-3 subdiv">
                                <div class="maindiv">
                                    <div class="parentdiv">
                                        <span class="a">3</span>
                                    </div>
                                    <div class="childdiv">
                                        <div class="childhead"><h4>Developing Strong Skill Sets & Profile</h4></div>
                                        <div class="childcontent">With Smartcliff, you will not only develop you skills but your desired profile as an emerging icon! We help you to build such strong profile.</div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-sm-3 subdiv">
                                <div class="maindiv">
                                    <div class="parentdiv">
                                        <span class="a">4</span>
                                    </div>

                                    <div class="childdiv">
                                        <div class="childhead"><h4>Transform into Desired  <br /> Candidate</h4></div>
                                        <div class="childcontent">From assisting you for interviews to preparing you for business challenges, we help you to become the most aspired candidate.</div>
                                    </div>


                                </div>
                            </div>


                        </div>
                    </div>






                </div>
            </section>


        </>
    )
}

export default Ourapproachsection1