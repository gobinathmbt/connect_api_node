import React from 'react'
import Form from '../Reusablecomponents/FormComponent'
import logo from "../Pics/try-demo.png"
import logo1 from "../Pics/computer.png"
import logo2 from "../Pics/success (1).png"

const Homesection5 = () => {
    return (
        <>


            <section class="home-page6" id="home-page6">
                <div class="container">


                    <div class="row">

                        <div class="col-sm-5 form">
                            <Form />
                        </div>


                        <div class="col-sm-7">


                            <div class="item1">

                                <div class="row">
                                    <div class="col-sm-2 img-container">
                                        <div><img className='img-fluid' src={logo} /></div>
                                    </div>
                                    <div class="col-sm-10">
                                        <div class="itemhead">
                                            <h1>Get a free course demo from us!</h1>
                                        </div>
                                        <div class="itemcontent">
                                            <p>Want to know our expertise? We offer free demo classes! You can attend our free classroom training and make your decisions. We only deliver the best!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div class="item2">
                                <div class="row">
                                    <div class="col-sm-2 img-container">
                                        <div><img className='img-fluid' src={logo1} /></div>
                                    </div>
                                    <div class="col-sm-10">
                                        <div class="itemhead">
                                            <h1>Get our free sample course syllabus!</h1>
                                        </div>
                                        <div class="itemcontent">
                                            <p>
                                                Smartcliff course materials are highly rated among industry experts. We made our sample course lectures available for free. Take a look at it and know our quality.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div class="item3">
                                <div class="row">
                                    <div class="col-sm-2 img-container">
                                        <div><img className='img-fluid' src={logo2} /></div>
                                    </div>
                                    <div class="col-sm-10">
                                        <div class="itemhead">
                                            <h1>Get a free career consulting from our experts!</h1>
                                        </div>
                                        <div class="itemcontent">
                                            <p>
                                                We offer free career consulting with immense care! Keeping your Ambition & career Goals in mind, we guide you to build a great career ahead!</p>
                                        </div>
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

export default Homesection5