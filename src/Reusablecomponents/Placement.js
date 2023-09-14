import React from 'react'
import "../css/Hire.css"
import SmallSwiperCard from '../Reusablecomponents/SmallSwiperCard'
import EligibilityTable from '../Reusablecomponents/Table'


const Placement = () => {
    const data = [
        {
            year: '2022',
            month: 'Jan',
            num: '152',
        },

        {
            year: '2022',
            month: 'Feb',
            num: '152',
        }
        , {
            year: '2022',
            month: 'March',
            num: '152',
        }
        , {
            year: '2022',
            month: 'April',
            num: '152',
        }
        , {
            year: '2022',
            month: 'May',
            num: '152',
        }
        , {
            year: '2022',
            month: 'Jun',
            num: '152',
        }
        , {
            year: '2022',
            month: 'July',
            num: '152',
        }
        , {
            year: '2022',
            month: 'Aug',
            num: '152',
        }
        , {
            year: '2022',
            month: 'Sep',
            num: '152',
        }
        , {
            year: '2022',
            month: 'Oct',
            num: '152',
        }
        , {
            year: '2022',
            month: 'Nov',
            num: '152',
        },
        ,
        {
            month: 'February',
            year: 2022,
            num: 15
        }
    ]
    return (
        <>

            <section class="hirefromus-page1" id="hirefromus-page1">

          
                <div class="container-fluid">

    
                    <div class="container-fluid " style={{ marginTop: "60px" }}>
                        <h3 style={{ textAlign: "center" }}>Recent Placement Records</h3>
                        <div style={{ marginTop: "60px" }}>
                            <SmallSwiperCard
                                data={data}
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



export default Placement




const Hiresection3 = () => {
    const data = [
        {
            year: '2022',
            month: 'Jan',
            num: '152',
        }

        , {
            year: '2022',
            month: 'Feb',
            num: '152',
        }
        , {
            year: '2022',
            month: 'March',
            num: '152',
        }
        , {
            year: '2022',
            month: 'April',
            num: '152',
        }
        , {
            year: '2022',
            month: 'May',
            num: '152',
        }
        , {
            year: '2022',
            month: 'Jun',
            num: '152',
        }
        , {
            year: '2022',
            month: 'July',
            num: '152',
        }
        , {
            year: '2022',
            month: 'Aug',
            num: '152',
        }
        , {
            year: '2022',
            month: 'Sep',
            num: '152',
        }
        , {
            year: '2022',
            month: 'Oct',
            num: '152',
        }
        , {
            year: '2022',
            month: 'Nov',
            num: '152',
        },
        ,
        {
            month: 'February',
            year: 2022,
            num: 15
        }
    ]
    return (
        <>
            <div class="container-fluid " style={{ marginTop: "60px" }}>
                <h3 style={{ textAlign: "center" }}>Placement Records Of 2022</h3>
                <div style={{ marginTop: "60px" }}>
                    <SmallSwiperCard
                        data={data}
                    />
                </div>
            </div>
        </>
    )
}



















