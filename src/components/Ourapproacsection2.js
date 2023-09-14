import React, { useRef } from 'react';
import { Button } from '@mui/material'
import logo5 from "../Pics/5.jpg"
import logo6 from "../Pics/6.jpg"
import logo7 from "../Pics/7.jpg"
import logo8 from "../Pics/8.jpg"
import logo9 from "../Pics/9.jpg"
import logo10 from "../Pics/10.jpg"
import logo11 from "../Pics/11.jpg"
import { Textcard3, Textcard4 } from "../Reusablecomponents/DisplayComponent"
import EnquiryForm from '../Reusablecomponents/EnquiryForm'




const Ourapproacsection2 = () => {

    const con1Ref = useRef(null);
    const con2Ref = useRef(null);
    const con3Ref = useRef(null);
    const con4Ref = useRef(null);
    const con5Ref = useRef(null);
    const con6Ref = useRef(null);
    const con7Ref = useRef(null);

    const handleScroll = (ref) => {
        const scrollPosition = ref.current.offsetTop - 140 ;
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    };

    const box1 = {
        heading: 'Understanding Candidate Need',
        content: 'Begins with proper analysis and understandings about our candidates requirements, their importance of upskilling their career, and all other aspects.Requirement gathering      Examining career Goals    Predefining the training model',
    };

    const box2 = {
        heading: '  Technology Consulting & Preaching',
        content:
            'Based on your interest, knowledge and current trend, we explain to you about the top technologies that stands on the frontline along with its key features. This includes explaining the impact of learning specific technology and answering all their what, why and how they can perceive a strong career in particular Technology.Expounding the trends & the future scope of the chosen technology. Listing down the possibilities of job role & job opportunities. Customizing the course based on the individual requirement..',
    };
    const box3 = {
        heading: ' Course Synopsis & Assigning Trainers ',
        content:
            'At this stage, course metrics will be explained, basic materials will be given and trainers will be allotted to take the proper demo session to clear up all your basic doubts regarding classes and training. Arranging an exclusive demo session with trainer Explaining course metrics & syllabus Providing beginner kit',
    };
    const box4 = {
        heading: ' Topic Wise Assessments & Experiments',
        content:
            'Your training starts here! Trainers will be allocated to initiate the classes. This goes from the basic to the core concepts with practical classes, every single time after the training, you will be given real-time tasks to work out and experiment. At the end of each training session, our trainers will be around you to educate you about the tasks and future project models. This will be continued until you learn the last topic of that particular Technology. And, sometimes it continues till you master that Technology. Topic-wise Assessments, Exposure to Real-time projects, Enhancing problem solving skills',
    };
    const box5 = {
        heading: '  Handling Real Time Projects',
        content:
            'You will be given real-time projects to work on! With the guidance of the trainers, here you will get hands-on experience in working with real-time projects. This stage will prepare you to handle any custom project requirements.Expertise in custom projects Confessing Real-time use cases Mastering the Job role & project handling',
    };
    const box6 = {
        heading: ' Profile Building & Interview Preparation',
        content:
            'Preparing you for an interview! This stage includes developing your interpersonal skills, Conducting mock-up interviews, Providing real-time Q & A from the core Technology, Resume preparation, Profile maintenance, and all the necessary set up to have a value-added profile. Assistance on creating value packed resume Conducting Mock up interviews Creating strong profile to stand out from the crowd',
    };
    const box7 = {
        heading: '  You are all set to kick start your career!',
        content: 'Come on! You have already mastered your favorite Technology with Smartcliff! Now its time for you to test your knowledge by competing with the industry experts. Go ahead! Show up for an interview, you will definitely get your job in hand! 100% we are sure that you will be the powerhouse of talent to answer your employer! What if you cant perform well? Again Nothing to worry about. You still have our support and you will always have it! Thats the promise we gave at stage 1 when you joined with Smartcliff! Our experts will again sit you, understand your problems, and will gear you up to your dream job!.',
    };



    return (
        <>


            <section class="approach-page2" id="approach-page2">
                <div class="container-fluid">

                    <div class="container-fluid tabs">
                        <div class="rows ">

                            <div class="tabbtn"><Button variant="outlined"
                                color='secondary'  onClick={() => handleScroll(con1Ref)}>Analysing Candidate</Button></div>
                            <div class="tabbtn"><Button variant="outlined"
                                color='secondary'  onClick={() => handleScroll(con2Ref)}>Training Module    </Button></div>
                            <div class="tabbtn"><Button variant="outlined"
                                color='secondary'  onClick={() => handleScroll(con3Ref)}>Allocating Tutors  </Button></div>
                            <div class="tabbtn"><Button variant="outlined"
                                color='secondary'  onClick={() => handleScroll(con4Ref)}>Regular Classes    </Button></div>
                            <div class="tabbtn"><Button variant="outlined"
                                color='secondary'  onClick={() => handleScroll(con5Ref)}>Hands-on Practice  </Button></div>
                            <div class="tabbtn"><Button variant="outlined"
                                color='secondary'  onClick={() => handleScroll(con6Ref)}>Resume Creation    </Button></div>
                            <div class="tabbtn"><Button variant="outlined"
                                color='secondary' onClick={() => handleScroll(con7Ref)}>All Set            </Button></div>

                        </div>
                    </div>



                    <div className='container con1' ref={con1Ref} style={{ marginTop: "40px" }}>
                        <Textcard3 imageSrc={logo5}
                            heading={box1.heading}
                            content={box1.content} />
                    </div>
                    <div className='container con2' ref={con2Ref} style={{ marginTop: "40px" }}>
                        <Textcard4 imageSrc={logo6}
                            heading={box2.heading}
                            content={box2.content} />
                    </div>


                    <div className='container con3' ref={con3Ref} style={{ marginTop: "40px" }}>
                        <Textcard3 imageSrc={logo7}
                            heading={box3.heading}
                            content={box3.content} />
                    </div>
                    <div className='container con4' ref={con4Ref} style={{ marginTop: "40px" }}>
                        <Textcard4 imageSrc={logo8}
                            heading={box4.heading}
                            content={box4.content} />
                    </div>




                    <div className='container con5' ref={con5Ref} style={{ marginTop: "40px" }}>
                        <Textcard3 imageSrc={logo9}
                            heading={box5.heading}
                            content={box5.content} />
                    </div>
                    <div className='container con6' ref={con6Ref} style={{ marginTop: "40px" }}>
                        <Textcard4 imageSrc={logo10}
                            heading={box6.heading}
                            content={box6.content} />
                    </div>

                    <div className='container con7' ref={con7Ref} style={{ marginTop: "40px" }}>
                        <Textcard3 imageSrc={logo11}
                            heading={box7.heading}
                            content={box7.content} />
                    </div>









                    <div class="container-fluid text">

                        <div class="row">
                            <div class="col-sm-12 ">
                                <div className='row heading1' style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                    <div className='col-sm-10'>
                                        <h3 className='maintext' style={{textAlign:"center"}}> Still, have questions? Talk with our experts to explore more about the possibilities to improve your career!</h3>
                                    </div>
                                    <div className='col-sm-2'>    <EnquiryForm btnname="talk to experts" btnvar="contained" btncolor="secondary" /></div>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            </section>





        </>
    )
}

export default Ourapproacsection2