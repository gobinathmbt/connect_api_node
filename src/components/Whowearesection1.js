import React from 'react'
import "../css/Whoweare.css"
import EnquiryForm from '../Reusablecomponents/EnquiryForm'
import Banner from '../Reusablecomponents/Banner'


const Whowearesection1 = () => {



    return (
        <>



            <section class="whowe-page1" id="whowe-page1">

                <Banner title="Who We Are" />
                <div class="container-fluid main">
                    <div class="container-fluid">
                        <div>
                            <h3>Who We Are</h3>
                        </div>
                        {/* <div>
                            <h6>smart cliff is the branch of montbleu Technologies. More than acquiring his entrepreneur's dream we equally
                                wanted to earn satisfaction from whatever we does! </h6>
                        </div>
                        <div className='btn2'>
                            <EnquiryForm btnname="talk to experts" btnvar="contained" btncolor="secondary" />
                        </div> */}
                    </div>

                </div>
            </section>


        </>
    )
}

export default Whowearesection1