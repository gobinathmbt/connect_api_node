import React from 'react'
import CardSlider from '../Reusablecomponents/CardsliderComponent'
import "../css/Home.css"
import StarIcon from '@mui/icons-material/Star';
import logo from "../Pics/online-course (1).png"
import logo2 from "../Pics/graduated (1).png"
import logo3 from "../Pics/goal.png"
import DisplayCard from '../Reusablecomponents/CardComponent';



const Homesection2 = () => {
    return (
        <>


            <section class="home-page2" id="home-page2">
                <div class="container-fluid">

                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 heading">
                                <h1 className='maintext'>The Best Software Training Institute in Coimbatore Smart-Cliff Learning solution Reviews</h1>
                            </div>
                        </div>
                    </div>


                    <div class="container">
                        <div class="row review-section">

                            <div class="col-sm-4 googlereview">
                                <div class="div">
                                    <h3> <strong className="ti-rating"> Excellent </strong> <span className="nowrap">Based on <strong>206 reviews</strong></span></h3>
                                </div>

                                <div class="div stars-master" style={{alignItems:"center",justifyContent:"center"}}>
                                    <div><StarIcon  style={{color:"rgb(250 175 0)"}}/></div>
                                    <div><StarIcon  style={{color:"rgb(250 175 0)"}}/></div>
                                    <div><StarIcon  style={{color:"rgb(250 175 0)"}} /></div>
                                    <div><StarIcon  style={{color:"rgb(250 175 0)"}}/></div>
                                    <div><StarIcon  style={{color:"rgb(250 175 0)"}}/></div>
                                </div>
                                <div class="googleimg" style={{display:'flex',alignItems:"center",justifyContent:"center",paddingTop:"10px"}}>
                                    <img
                                        className="ti-logo-fb lazyloaded"
                                        src="https://cdn.trustindex.io/assets/platform/Google/logo.svg"
                                        width="150"
                                        height="25"
                                        alt="Google"
                                        data-lazy-src="https://cdn.trustindex.io/assets/platform/Google/logo.svg"
                                        data-was-processed="true"
                                    />
                                </div>

                            </div>

                            <div className='col-sm-8'>
                                <CardSlider />
                            </div>
                        </div>

                    </div>


                    <div class="container">

                        <div class="row">
                            <div class="col-sm-12 heading">
                                <h1 className='maintext'>Endless Benefits From The Best Software Training Institute In Coimbatore</h1>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <h6 className='subtext'>smartcliff provides various benefits to make sure our students stands out from the competition</h6>
                            </div>
                        </div>

                    </div>




                    <div class="container-fluid display-cards">
                        <div class="row mainrow">


                            <div class="col-sm-4 box1">
                                <div class="container-fluid">
                                    <DisplayCard
                                        logo={logo}
                                        heading="CUSTOMIZED COURSES"
                                        content="All the courses at SMARTCLIFF are extensively and precisely planned by IT experts according to the needs of the industry and changing trends."
                                    />
                                </div>
                            </div>


                            <div class="col-sm-4 box2">
                                <div class="container-fluid ">

                                    <DisplayCard
                                        logo={logo2}
                                        heading="EXPERIENCED FACULTY"
                                        content="SMARTCLIFF faculty are richly experienced with 15+ years of IT industry training. Having a diversified knowledge about all the sectors of the industry."
                                    />
                                </div>
                            </div>


                            <div class="col-sm-4 box3">
                                <div class="container-fluid">
                                    <DisplayCard
                                        logo={logo3}
                                        heading="CAREER GUIDANCE"
                                        content="One of the best software training institutes in Coimbatore that owns a Dedicated team to help you ace your interviews like a star performer."
                                    />
                                </div>
                            </div>


                        </div>
                    </div>






                </div>



            </section>

        </>
    )
}

export default Homesection2










