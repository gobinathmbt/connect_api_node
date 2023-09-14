import React from 'react'
import logo from "../Pics/Screenshot 2023-06-13 235923.png"
import logo1 from "../Pics/Screenshot 2023-06-14 001224.png"
import ApplyNow from '../Reusablecomponents/ApplyForm'

const Homesection4 = () => {
    return (
        <>

            <section class="home-page5" id="home-page5">
                <div class="container-fluid">

                    <div class="container-fluid">

                        <div class="row">
                            <div class="col-sm-12 heading">
                                <h1 className='maintext'> Courses We Offer</h1>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <h6 className='subtext'>
                                    We train and develop your skillset in all the top software and technical courses to make your career
                                    successful! Interested? </h6>
                            </div>
                        </div>

                    </div>

                    <div className='container'>
                        <img className='img-fluid' src={logo} />
                    </div>


                    <div class="container-fluid text">

                        <div class="row">
                            <div class="col-sm-12 ">
                                <div className='row heading1'>
                                    <div className='col-sm-10'>
                                        <h3 className='maintext'> We’re the leader & most trusted software training institute in Coimbatore! Join us today to upgrade your career!</h3>
                                    </div>
                                    <div className='col-sm-2'>     <ApplyNow btnname=" Click Here" btnvar="contained" btncolor="secondary" /></div>
                                </div>
                            </div>
                        </div>
                       
                        <div class="row">
                            <div class="col-sm-12">
                                <h2 className='subtext1'>
                                    Our Students Are Ruling Across The Globe In Top MNC’s</h2>
                            </div>
                        </div>

                    </div>

                    <div className='container '>
                        <img className='img-fluid' src={logo1} />
                    </div>






                </div>
            </section>



        </>
    )
}

export default Homesection4