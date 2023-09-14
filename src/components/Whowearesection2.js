import React, { useRef } from 'react';
import logo1 from "../Pics/12.jpg"
import logo2 from "../Pics/13.jpg"
import logo3 from "../Pics/14.jpg"
import logo4 from "../Pics/15.jpg"
import { Textcard3, Textcard4 } from "../Reusablecomponents/DisplayComponent"
import Form from '../Reusablecomponents/FormComponent'
import Cardcomponent1 from '../Reusablecomponents/Cardcomponent1';
import EnquiryForm from '../Reusablecomponents/EnquiryForm'
import { Button } from '@mui/material'
import "../css/Whoweare.css"
const Whowearesection2 = () => {

    const con1Ref = useRef(null);
    const con2Ref = useRef(null);
    const con3Ref = useRef(null);
    const con4Ref = useRef(null);


    const handleScroll = (ref) => {
        const scrollPosition = ref.current.offsetTop - 130;
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    };

    const box1 = {
        heading: 'Idea of Platform for No Career Idea',
        content: ' some info to be displayed about founder......',
    };

    const box2 = {
        heading: ' Let’s Create Opportunities for Individuals ',
        content: 'Right then, he decided to invest his time in business where he can help the people while pursuing his entrepreneurial dream! Thats where his drive began! He constantly experimented, identified emerging technologies and analysed the challenges in teaching them then went a long way to understand each and every module about these technologies and then he finally found a pattern to teach them in a right way! Despite his research on Technologies.',
    };
    const box3 = {
        heading: ' From Scratch to Skilled! ',
        content:
            'From there, Idea discussed - Plans were figured out - Business model implemented! Finally, we are as a team committed to delivering promising training to anyone who entrusts Smartcliff! When a student gets into Smartcliff, we begin from the scratch, like identifying the core skill set, understanding their potential, creating job opportunities for individuals, suggesting them the right technology on the top lane, and helping them to create a sustainable career that lasts ever! Just like that, we promised to act as a guiding force on every phase of their training with us!',
    };
    const box4 = {
        heading: ' Guidance for Job Placements',
        content:
            'Giving a broad and in-depth analysis about the technologies they choose to study with Smartcliff.Educating them about the key-value and importance of that technology on the international market. Giving 100% support and our presence to our students throughout their training and even after it.Ensuring that all candidates remain capable of handling individual projects and businesses on the chosen technology.',
    };


    return (
        <>



            <section class="whowe-page2" id="whowe-page2">
                <div class="container-fluid main">


                    <div class="container-fluid tabs">
                        <div class="rows">
                            <div class="tabbtn"> <Button variant="outlined"
                                color='secondary' onClick={() => handleScroll(con1Ref)} >idea of platform     </Button></div>

                            <div class="tabbtn"> <Button variant="outlined"
                                color='secondary' onClick={() => handleScroll(con2Ref)} >Opportunities for Individuals</Button></div>

                            <div class="tabbtn"> <Button variant="outlined"
                                color='secondary' onClick={() => handleScroll(con3Ref)} >Scratch to Skilled        </Button></div>

                            <div class="tabbtn"> <Button variant="outlined"
                                color='secondary' onClick={() => handleScroll(con4Ref)} >Job Placement           </Button></div>
                                

                        </div>
                    </div>




                    <div className='container' ref={con1Ref} style={{ marginTop: "40px" }}>
                        <Textcard3 imageSrc={logo1}
                            heading={box1.heading}
                            content={box1.content} />
                    </div>
                    <div className='container' ref={con2Ref} style={{ marginTop: "40px" }}>
                        <Textcard4 imageSrc={logo2}
                            heading={box2.heading}
                            content={box2.content} />
                    </div>


                    <div className='container' ref={con3Ref} style={{ marginTop: "40px" }}>
                        <Textcard3 imageSrc={logo3}
                            heading={box3.heading}
                            content={box3.content} />
                    </div>
                    <div className='container' ref={con4Ref} style={{ marginTop: "40px" }}>
                        <Textcard4 imageSrc={logo4}
                            heading={box4.heading}
                            content={box4.content} />
                    </div>







                    <div class="container" style={{ marginTop: "40px" }}>
                        <div class="row">
                            <div class="col-sm-7"><Cardcomponent1 /></div>
                            <div class="col-sm-5"><Form /></div>
                        </div>
                    </div>



                    <div class="container-fluid text">

                        <div class="row">
                            <div class="col-sm-12 ">
                                <div className='row heading1'>
                                    <div className='col-sm-10'>
                                        <h2 className='maintext'> Still, have questions? Talk with our experts to explore more about the possibilities to improve your career!</h2>
                                    </div>
                                    <div className='col-sm-2'>   <EnquiryForm btnname="talk to experts" btnvar="contained" btncolor="secondary" /></div>
                                </div>
                            </div>
                        </div>

                    </div>










                </div>
            </section>


        </>
    )
}

export default Whowearesection2