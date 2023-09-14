import React from 'react'
import Banner from '../Reusablecomponents/Banner'
import HireUs from '../Reusablecomponents/HireUsForm'
import "../css/Hire.css"
import logo2 from "../Pics/training-lft-image.png"
import SmallSwiperCard from '../Reusablecomponents/SmallSwiperCard'
import EligibilityTable from '../Reusablecomponents/Table'
import data from "./DataMaster.json"

const Hirefromussection1 = () => {
    const datas = data.HireFromusSection
    return (
        <>

            <section class="hirefromus-page1" id="hirefromus-page1">

                <Banner title="Hire From Us" />
                <div class="container-fluid">

                    <div class="container-fluid start">
                        <div class="row">
                            <div class="col-sm-4"> <img class="img-fluid" src={logo2} style={{ height: "100%", width: "100%" }} /></div>
                            <div className='col-sm-1'></div>
                            <div class="col-sm-6 form">
                                <h1>Hire From SmartCliff</h1>
                                <HireUs />
                            </div>
                            <div className='col-sm-1'></div>
                        </div>
                    </div>


                    <div class="container-fluid " style={{ marginTop: "60px" }}>
                        <h1 style={{ textAlign: "center" }}>Recent Placement Records</h1>
                        <div style={{ marginTop: "60px" }}>
                            <SmallSwiperCard
                                data={datas}
                            />
                        </div>
                    </div>


                    <div class="container-fluid" style={{ marginTop: "60px" }}>
                        <div class="row" style={{ marginTop: "60px" }}>
                            <div class="col-sm-2"></div>
                            <div class="col-sm-3">
                                <div class="container">
                                    <div>
                                        <h6 class="b">Students Placed
                                            in 2022</h6>
                                    </div>
                                    <div>
                                        <h6 class="c">2208</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-1"></div>
                            <div class="col-sm-1"></div>
                            <div class="col-sm-3">
                                <div class="container">
                                    <div>
                                        <h6 class="b">MNC's Hired
                                            in 2022</h6>
                                    </div>
                                    <div>
                                        <h6 class="c">712</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2"></div>
                        </div>
                        <br /><br /><br />
                        <div class="row">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-3">
                                <div class="container">
                                    <div>
                                        <h6 class="b">Students Placed
                                            in 2021</h6>
                                    </div>
                                    <div>
                                        <h6 class="c">2150 +</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-1"></div>
                            <div class="col-sm-1"></div>
                            <div class="col-sm-3">
                                <div class="container">
                                    <div>
                                        <h6 class="b">Highest
                                            Package</h6>
                                    </div>
                                    <div>
                                        <h6 ><span class="c">15.4</span> <span class="d">Lpa</span></h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2"></div>
                        </div>
                    </div>


                    <Hiresection3 />

                    <div className='container-fluid' style={{ marginTop: "60px" }}>
                        <div className='row'>
                            <div class="col-sm-2"></div>
                            <div class="col-sm-8">   <EligibilityTable /></div>
                            <div class="col-sm-2"></div>
                        </div>

                    </div>




                </div>
            </section>



        </>
    )
}



export default Hirefromussection1




const Hiresection3 = () => {

    const datas = data.HireFromusSection

    return (
        <>
            <div class="container-fluid " style={{ marginTop: "60px" }}>
                <h1 style={{ textAlign: "center" }}>Placement Records Of 2022</h1>
                <div style={{ marginTop: "60px" }}>
                    <SmallSwiperCard
                        data={datas}
                    />
                </div>
            </div>
        </>
    )
}



















