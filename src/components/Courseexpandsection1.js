import React, { useState, useContext, useEffect } from 'react';
import { Tab, Tabs, Typography,Button } from '@mui/material';
import Banner from '../Reusablecomponents/Banner';
import ApplyNow from '../Reusablecomponents/ApplyForm'
import EnquiryForm from '../Reusablecomponents/EnquiryForm'
import FormComponent from '../Reusablecomponents/FormComponent'
import Icon from '../Reusablecomponents/Icon'
import "../css/Course.css"
import DisplayCard from '../Reusablecomponents/CardComponent';
import logo from "../Pics/curriculum.png"
import logo2 from "../Pics/graduated (1).png"
import logo3 from "../Pics/goal.png"
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Accordion, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import demo from "../Pics/demo-concept-illustration_114360-7492.avif"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatabaseContext from '../DataBaseConfig/Config';

const Courseexpandsection1 = () => {


    const { selectedDatabase } = useContext(DatabaseContext);

    const mysqlUrl = 'http://localhost:3002/MysqlCourses';
    const mongoUrl = 'http://localhost:3002/Courses';
    const CoursesUrl = selectedDatabase === 'mysql' ? mysqlUrl : mongoUrl;

    const { _id } = useParams();
    const id = parseInt(_id)
    const [course, setCourse] = useState({});

    // Function to fetch data from the server
    const fetchCourseData = async () => {
        try {
            const response = await axios.get(CoursesUrl);
            const data = response.data;
            setCourse(data.find((course) => course._id === id) || {});
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchCourseData(); // Fetch data from the server when the component mounts
    }, [id]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleSyllabusClick = () => {
        if (course.syllabusPath) {
            window.open(`http://localhost:3002/${course.syllabusPath}`, '_blank');
        }
    };



    return (
        <>
            <Banner title={course.title} />


            <section class="courseexpandmaster" id="courseexpandmaster" style={{ background: "#ffe0ff70" }}>
                <div class="container-fluid">




                    <div className='container indexsection'>

                        <div class="row" >

                            <div class="col-sm-8" style={{ marginTop: '60px' }}>

                                <div>
                                    <h1>{course.title} Course    Beginners</h1>
                                </div>
                              
                                {/* <div style={{ display: "flex", marginTop: '10px' }}>
                                    <div><FaGraduationCap /></div>
                                    <div><h4>Best Seller</h4></div>
                                    <div> <Rating name="read-only" value={4} readOnly /></div>
                                </div> */}

                                <div style={{ marginTop: '20px' }}>
                                    <p>{course.longDesc} </p>
                                </div>



                                <div className='btnsection'>
                                    <div className='btn1'>
                                        <ApplyNow btnname="start ur career" btnvar="contained" btncolor="secondary" />
                                    </div>
                                    <div className='btn2'>
                                        <EnquiryForm btnname="talk to experts" btnvar="contained" btncolor="secondary" />
                                    </div>
                                    <div >
                                    {course.syllabusPath && (
                                        <div>
                                            <Button onClick={handleSyllabusClick} variant="contained" color="secondary">
                                                View Syllabus
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                </div>
                              



                                <div className='iconsection'>
                                    <div class="row icon">
                                        <div class="col-sm-2 ">
                                            <Icon logo={logo} num="5000" content="Students Trained & Placed On MNC’s" />
                                        </div>


                                        <div class="col-sm-2">
                                            <Icon logo={logo} num="100" content="  live practical session" />
                                        </div>


                                        <div class="col-sm-2">
                                            <Icon logo={logo} num="150" content="   customized courses" />
                                        </div>


                                        <div class="col-sm-2">
                                            <Icon logo={logo} num="80" content="  highly authorized  trainers" />
                                        </div>


                                        <div class="col-sm-2">
                                            <Icon logo={logo} num="N" content="    number of access to the Projects" />
                                        </div>
                                    </div>
                                </div>



                            </div>


                            <div class="col-sm-4 formsection">
                                <div>
                                    <FormComponent />
                                </div>
                            </div>


                        </div>

                    </div>






                    <div class="container section2" >



                        <div class="row">
                            <div class="col-sm-8 contentsection" >
                                <div>
                                    <h3>{course.title} Course For {course.level} - Why SmartCliff?</h3>
                                </div>
                                <div>
                                    <p><span style={{ fontWeight: "400" }}>Choosing the right institute for your learning journey is essential to ensure you receive the best education and career opportunities. At SmartCliff, we are committed to providing high-quality training and a supportive learning environment. Our experienced instructors bring their expertise and industry knowledge to the classroom, creating a dynamic and engaging learning experience. We offer practical training and real-world scenarios to help you develop valuable skills that can be applied in various fields. Our institute also provides career guidance and placement assistance to support your professional growth. With affordable fees and a dedication to student success, SmartCliff is the ideal choice for individuals looking to enhance their knowledge and advance their careers. Enroll with us today and take the first step towards a successful future.</span></p>
                                </div>

                                <div>


                                    <ul >
                                        <li><strong>Experienced
                                            Instructors:</strong> Our instructors are
                                            experienced developers with a passion for teaching.</li>
                                        <li ><strong>Practical
                                            Training:</strong> Our course focuses on
                                            hands-on training to help you build real-world projects.</li>
                                        <li ><strong>Career
                                            Guidance:</strong> We provide career guidance and support to help you achieve your
                                            career goals.</li>
                                        <li ><strong>Placement
                                            Assistance:</strong> We offer placement
                                            assistance to help you land your dream job after completing the course.</li>
                                        <li ><strong>Affordable
                                            Fees:</strong> Our {course.title} course for
                                            beginners is affordably priced, making it accessible to everyone.</li>
                                    </ul>
                                </div>


                                <div>
                                    <p><span style={{ fontWeight: "400" }}>Enroll in our {course.title}  classes for beginners today and take the
                                        first step towards a successful career in web development!</span></p>
                                </div>


                            </div>


                            <div class="col-sm-4 formsection">
                                <div>
                                    <FormComponent />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="container section3">

                        <div>
                            <h4>Key Features Of Our{course.title} Training For  {course.level}</h4>
                        </div>

                        <div class="row">


                            <div class="col-sm-3">

                                <DisplayCard
                                    logo={logo}
                                    heading="CUSTOMIZED COURSES"
                                    content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                />

                            </div>


                            <div class="col-sm-3">


                                <DisplayCard
                                    logo={logo2}
                                    heading="EXPERIENCED FACULTY"
                                    content="SMARTCLIFF faculty are richly experienced with 15+ years of IT industry training. Having a diversified knowledge about all the sectors of the industry."
                                />

                            </div>


                            <div class="col-sm-3">

                                <DisplayCard
                                    logo={logo3}
                                    heading="CAREER GUIDANCE"
                                    content="One of the best software training institutes in Coimbatore that owns a Dedicated team to help you ace your interviews like a star performer."
                                />

                            </div>


                        </div>

                    </div>






                    <div class="container section4">

                        <div class="row">
                            <div class="col-sm-12 ">
                                <div className='row'>
                                    <div className='col-sm-8'>
                                        <h3>  Join SmartCliff To Learn The Technology For A Bright Career!</h3>
                                    </div>
                                    <div className='col-sm-2'>    <EnquiryForm btnname="talk to experts" btnvar="contained" btncolor="secondary" /></div>
                                </div>
                            </div>
                        </div>

                    </div>





                    {/* <div class="container section5">

                        <div>
                            <h3>What Makes SmartCliff Unique For Taking HTML Course?</h3>
                            <p>At SmartCliff, we take pride in our HTML course for beginners, and we believe that we offer a unique learning experience that sets us apart from other institutes. Here are a few factors that make us so unique:</p>
                        </div>
                        <div>
                            <h6><strong>
                                Practical Learning Approach:</strong></h6>
                            <p>We believe in a practical learning approach where students learn by doing. Our HTML course for beginners includes hands-on exercises, real-world projects, and case studies, which helps students understand how HTML is used in the industry. We also provide a supportive learning environment where students can ask questions and get feedback from their instructors.</p>
                        </div>
                        <div>
                            <h6><strong>
                                Expert Instructors:</strong></h6>
                            <p>Our HTML course for beginners is taught by experienced developers who have worked on real-world HTML projects. Our instructors bring their expertise, feedback, and guidance to the classroom, helping students develop the skills they need to succeed in the industry. Moreover, our instructors are passionate about teaching, and they are dedicated to helping their students achieve their learning goals.

                            </p>
                        </div>
                        <div>
                            <h6><strong>
                                Career Support:</strong></h6>
                            <p>At SmartCliff, we believe that learning should be a pathway to a successful career. That’s why we provide career support services to our students, including resume building, interview coaching, and job placement assistance. We work with leading employers in the industry to connect our students with the right job opportunities that match their skills and interests.</p>
                        </div>
                        <div>
                            <h6><strong>
                                Affordable Fees:</strong></h6>
                            <p>We understand that education can be expensive, and we want to make our HTML course for beginners accessible to everyone. That’s why we offer our course at an affordable price, without compromising on the quality of education and learning experience.</p>
                        </div>
                        <div>
                            <h6><strong>
                                Flexibility:</strong></h6>
                            <p>We understand that students have different learning styles and schedules, and we want to accommodate them as much as possible. Our HTML course for beginners offers flexible learning options, including part-time and full-time classes, online and in-person options, and customized schedules to fit our students’ needs.
                                Smartcliff offers a unique learning experience for our HTML course for beginners. Our practical learning approach, expert instructors, career support services, affordable fees, and flexible learning options are just a few of the factors that make us stand out from other institutes. Enroll in our HTML course for beginners today and take the first step towards a successful career in web development.</p>
                        </div>

                    </div> */}





                    <div class="container section6">
                        <h2>Our Course Previlege</h2>
                    </div>



                    <div className='container section7'>


                        <div className='row'>

                            <div className='col-sm-2' >
                                <Tabs
                                    orientation="vertical"
                                    centered
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="Side tabs"
                                    sx={{ borderRight: 1, borderColor: 'purple' }}
                                >

                                    <Tab style={{ marginTop: "26px" }} label="Course Details" />
                                    <Tab style={{ marginTop: "26px" }} label="Time & Duration" />
                                    <Tab style={{ marginTop: "26px" }} label="Demo" />
                                    <Tab style={{ marginTop: "26px" }} label="Free Trial" />
                                    <Tab style={{ marginTop: "26px" }} label="Certification" />
                                    <Tab style={{ marginTop: "26px" }} label="FAQ" />
                                    <Tab style={{ marginTop: "26px" }} label="Contact Us" />
                                    <Tab style={{ marginTop: "26px" }} label="Reviews" />

                                </Tabs>

                            </div>

                            <div className='col-sm-10 maintabsection'>


                                {value === 0 && (
                                    <section>
                                        <div className='container'>
                                            <div> <h3>{course.title} Course For  {course.level} - Course Details</h3> </div>
                                            <div> <h6>Learn The Art Of Crafting Compelling Content With SmartCliff</h6> </div>

                                            <div className='row'>

                                                <div className='col-sm-5'>
                                                    <TableContainer component={Paper}>
                                                        <Table>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell><strong>Course Duration</strong></TableCell>
                                                                    <TableCell><span style={{ fontWeight: 400 }}>{course.duration}Hrs</span></TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell><strong>Course Fees</strong></TableCell>
                                                                    <TableCell><span style={{ fontWeight: 400 }}>Affordable pricing</span></TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell><strong>Learning Format</strong></TableCell>
                                                                    <TableCell>
                                                                        <span style={{ fontWeight: 400 }}>Online and in-person</span><br />
                                                                        <i></i>
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell><strong>Prerequisites</strong></TableCell>
                                                                    <TableCell><span style={{ fontWeight: 400 }}>No previous experience required</span></TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell><strong>Course Level</strong></TableCell>
                                                                    <TableCell>
                                                                        <div className="hlist hlist-separated">
                                                                            <ul>
                                                                                <li>Class Room Training’s</li>
                                                                                <li>Online Training’s</li>
                                                                                <li>Webinars</li>
                                                                                <li>Assignments</li>
                                                                                <li>Projects</li>
                                                                            </ul>
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell><strong>24/7 Technical Support</strong></TableCell>
                                                                    <TableCell>Yes</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell><strong>Lifetime Access to Content</strong></TableCell>
                                                                    <TableCell>Yes</TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </div>




                                                <div className='col-sm-7 tabsection1'>


                                                    <div class="row">


                                                        <div class="col-sm-5">

                                                            <DisplayCard
                                                                logo={logo}
                                                                heading="CUSTOMIZED COURSES"
                                                                content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                                            />

                                                        </div>


                                                        <div class="col-sm-5">


                                                            <DisplayCard
                                                                logo={logo2}
                                                                heading="EXPERIENCED FACULTY"
                                                                content="SMARTCLIFF faculty are richly experienced with 15+ years of IT industry training. Having a diversified knowledge about all the sectors of the industry."
                                                            />

                                                        </div>


                                                    </div>

                                                    <div class="row">


                                                        <div class="col-sm-5">

                                                            <DisplayCard
                                                                logo={logo}
                                                                heading="CUSTOMIZED COURSES"
                                                                content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                                            />

                                                        </div>


                                                        <div class="col-sm-5">


                                                            <DisplayCard
                                                                logo={logo2}
                                                                heading="EXPERIENCED FACULTY"
                                                                content="SMARTCLIFF faculty are richly experienced with 15+ years of IT industry training. Having a diversified knowledge about all the sectors of the industry."
                                                            />

                                                        </div>


                                                    </div>



                                                </div>

                                            </div>

                                        </div>
                                    </section>
                                )}





                                {value === 1 && (
                                    <section>
                                        <div className='container'>
                                            <div> <h3>{course.title} Course For  {course.level} - Time and Duration</h3> </div>
                                            <div> <h6>Learn Content Writing At Your Convenience With SmartCliff</h6> </div>


                                            <div className='tabsection2'>
                                                <div class="row">


                                                    <div class="col-sm-6">

                                                        <DisplayCard
                                                            logo={logo}
                                                            heading="CUSTOMIZED COURSES"
                                                            content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                                        />

                                                    </div>


                                                    <div class="col-sm-6">


                                                        <DisplayCard
                                                            logo={logo2}
                                                            heading="EXPERIENCED FACULTY"
                                                            content="SMARTCLIFF faculty are richly experienced with 15+ years of IT industry training. Having a diversified knowledge about all the sectors of the industry."
                                                        />

                                                    </div>


                                                </div>

                                                <div class="row">


                                                    <div class="col-sm-6">

                                                        <DisplayCard
                                                            logo={logo}
                                                            heading="CUSTOMIZED COURSES"
                                                            content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                                        />

                                                    </div>


                                                    <div class="col-sm-6">


                                                        <DisplayCard
                                                            logo={logo2}
                                                            heading="EXPERIENCED FACULTY"
                                                            content="SMARTCLIFF faculty are richly experienced with 15+ years of IT industry training. Having a diversified knowledge about all the sectors of the industry."
                                                        />

                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    </section>
                                )}








                                {value === 2 && (
                                    <section>
                                        <div className='container'>
                                            <div> <h3>{course.title} Course For  {course.level} - Time and Duration</h3> </div>
                                            <div> <h6>Learn Content Writing At Your Convenience With SmartCliff</h6> </div>


                                            <div className='row'>
                                                <div className='col-sm-5 img'>
                                                    <img src={demo} className='img-fluid' />
                                                    <EnquiryForm btnname="get a demo call" btnvar="contained" btncolor="secondary" />
                                                </div>

                                                <div className='col-sm-7 tabsection1'>
                                                    <div class="row">


                                                        <div class="col-sm-5">

                                                            <DisplayCard
                                                                logo={logo}
                                                                heading="CUSTOMIZED COURSES"
                                                                content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                                            />

                                                        </div>


                                                        <div class="col-sm-5">


                                                            <DisplayCard
                                                                logo={logo2}
                                                                heading="EXPERIENCED FACULTY"
                                                                content="SMARTCLIFF faculty are richly experienced with 15+ years of IT industry training. Having a diversified knowledge about all the sectors of the industry."
                                                            />

                                                        </div>


                                                    </div>

                                                    <div class="row" style={{ marginTop: "30px" }}>


                                                        <div class="col-sm-5">

                                                            <DisplayCard
                                                                logo={logo}
                                                                heading="CUSTOMIZED COURSES"
                                                                content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                                            />

                                                        </div>


                                                        <div class="col-sm-5">


                                                            <DisplayCard
                                                                logo={logo2}
                                                                heading="EXPERIENCED FACULTY"
                                                                content="SMARTCLIFF faculty are richly experienced with 15+ years of IT industry training. Having a diversified knowledge about all the sectors of the industry."
                                                            />

                                                        </div>


                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                    </section>
                                )}





                                {value === 3 && (
                                    <section>
                                        <div className='container'>
                                            <div> <h3>Take a Free Trial of Our {course.title} Course For  {course.level}</h3> </div>
                                            <div> <h6>SmartCliff gives the best and excellent knowledge to upgrade your knowledge.</h6> </div>


                                            <div className='row'>
                                                <div className='col-sm-7'>
                                                    <div>

                                                        <DisplayCard
                                                            logo={logo}
                                                            heading="CUSTOMIZED COURSES"
                                                            content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                                        />

                                                    </div>
                                                    <div >


                                                        <DisplayCard
                                                            logo={logo2}
                                                            heading="EXPERIENCED FACULTY"
                                                            content="SMARTCLIFF faculty are richly experienced with 15+ years of IT industry training. Having a diversified knowledge about all the sectors of the industry."
                                                        />

                                                    </div>
                                                    <div>

                                                        <DisplayCard
                                                            logo={logo}
                                                            heading="CUSTOMIZED COURSES"
                                                            content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                                        />

                                                    </div>

                                                </div>
                                                <div className='col-sm-5'>
                                                    <FormComponent />
                                                </div>
                                            </div>



                                        </div>
                                    </section>
                                )}





                                {value === 4 && (
                                    <section>
                                        <div className='container'>
                                            <div> <h3>{course.title} Course For  {course.level} - Certification</h3> </div>
                                            <div> <h6>Stand Out In The Crowd With Our Content Writing Certification</h6> </div>


                                            <div className='row'>


                                                <div className='col-sm-12' style={{ textAlign: "center" }}>

                                                    <img
                                                        src={`http://localhost:3002/${course.imagePath}`}
                                                        alt={course.title}
                                                        style={{ height: "300px", width: "420px" }}
                                                    />

                                                    {/* <img src={course.Certification} alt={course.title} style={{ height: "300px", width: "420px" }} /> */}
                                                </div>
                                            </div>
                                            <div className='row' style={{ marginTop: "20px" }}>
                                                <div className='col-sm-12'>

                                                    <div className='row'>

                                                        <div className='col-sm-6'>
                                                            <DisplayCard
                                                                logo={logo2}
                                                                heading="EXPERIENCED FACULTY"
                                                                content="SMARTCLIFF faculty are richly experienced with 15+ years of IT industry training. Having a diversified knowledge about all the sectors of the industry."
                                                            />
                                                        </div>

                                                        <div className='col-sm-6'>
                                                            <DisplayCard
                                                                logo={logo}
                                                                heading="CUSTOMIZED COURSES"
                                                                content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                                            />
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>




                                        </div>
                                    </section>
                                )}





                                {value === 5 && (
                                    <section>
                                        <div className='container'>
                                            <div> <h3>FAQ's</h3> </div>
                                            <div> <h6>I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6> </div>
                                            <div class="row">
                                                <div class="col-sm-9"> <Accordion>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography>Accordion Item 1</Typography>
                                                    </AccordionSummary>
                                                    <h6>No, you do not need any prior coding experience to enroll in our HTML course for beginners. Our course is designed to teach you HTML from scratch, and we provide all the necessary resources and support to help you succeed.</h6>
                                                </Accordion>

                                                    <Accordion>
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                            <Typography>Accordion Item 2</Typography>
                                                        </AccordionSummary>
                                                        <h6>No, you do not need any prior coding experience to enroll in our HTML course for beginners. Our course is designed to teach you HTML from scratch, and we provide all the necessary resources and support to help you succeed.</h6>

                                                    </Accordion>

                                                    <Accordion>
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                            <Typography>Accordion Item 3</Typography>
                                                        </AccordionSummary>
                                                        <h6>No, you do not need any prior coding experience to enroll in our HTML course for beginners. Our course is designed to teach you HTML from scratch, and we provide all the necessary resources and support to help you succeed.</h6>

                                                    </Accordion>

                                                    <Accordion>
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                            <Typography>Accordion Item 4</Typography>
                                                        </AccordionSummary>
                                                        <h6>No, you do not need any prior coding experience to enroll in our HTML course for beginners. Our course is designed to teach you HTML from scratch, and we provide all the necessary resources and support to help you succeed.</h6>

                                                    </Accordion>

                                                    <Accordion>
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                            <Typography>Accordion Item 5</Typography>
                                                        </AccordionSummary>
                                                        <h6>No, you do not need any prior coding experience to enroll in our HTML course for beginners. Our course is designed to teach you HTML from scratch, and we provide all the necessary resources and support to help you succeed.</h6>

                                                    </Accordion></div>
                                                <div class="col-sm-3">
                                                    <div> <h6>Quick enquiry!</h6></div>
                                                    <div><p>Get the expert’s guidance with advanced knowledge to help you move towards a bright future in your career.</p></div>
                                                    <div> <EnquiryForm btnname="contact us" btnvar="contained" btncolor="secondary" /></div>
                                                </div>
                                            </div>

                                        </div>
                                    </section>
                                )}







                                {value === 6 && (
                                    <section>
                                        <div className='container'>
                                            <div> <h3>Let's get in touch</h3> </div>
                                            <div> <h6>Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days.</h6> </div>

                                            <div> <EnquiryForm btnname="contact us" btnvar="contained" btncolor="secondary" /></div>

                                        </div>
                                    </section>
                                )}
                                {value === 7 && (
                                    <Typography paragraph>Reviews content goes here.</Typography>
                                )}

                            </div>

                        </div>
                    </div>










                    <div class="container end">

                        <div class="row">
                            <div class="col-sm-12 ">
                                <div className='row'>
                                    <div className='col-sm-8'>
                                        <h3> Interested In Building Life-Changing Career? Let's Get In Touch!</h3>
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

export default Courseexpandsection1