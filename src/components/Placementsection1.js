import React from 'react'
import Banner from '../Reusablecomponents/Banner';
import Placement from '../Reusablecomponents/Placement';
const Placementsection1 = () => {
    return (
        <>
            <Banner title="Placement" />
            <section class="Placement-page1" id="Placement-page1" style={{ marginTop: "80px" }}>
                <div class="container-fluid">

                    <div class="container">
                        <div class="heading" style={{ textAlign: "center", fontSize: "50px", color: "#434345" }}>
                            <h1>Placement Opportunities</h1>
                        </div>
                        <div class="content" style={{ marginTop: "30px", paddingLeft: "20%", paddingRight: "20%", textAlign: "center" }}>
                            <p>SmartCliff offers exceptional placement opportunities to its students, providing them with a strong foundation for a successful career. With its robust network of industry connections and collaborations, SmartCliff ensures that students have access to a wide range of job prospects in various sectors.

                                Through strategic partnerships with leading companies, SmartCliff offers internship programs and placement assistance to enhance students' practical skills and increase their employability. These opportunities allow students to gain valuable real-world experience and apply their knowledge in a professional setting.
                            </p>
                        </div>
                    </div>

                    <Placement />


                </div>
            </section>

        </>
    )
}

export default Placementsection1