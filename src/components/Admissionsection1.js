import React from 'react'
import "../css/Admission.css"
import { FaCheck } from 'react-icons/fa';
import Banner from '../Reusablecomponents/Banner';



const Admissionsection1 = () => {
  return (
    <>
      <Banner title="Admission" />
      <div className='container-fluid'>
        <section className="service-section1" id='service-section1' >

     

          <div className="container" style={{ marginTop: "60px" }}>

            <div className="service-details__right single-course-page">
              <div className="service-details__content session-content mt-0">
                <h3>MODE OF ADMISSION</h3>
                <ul className="list-unstyled list-mrgn" style={{ marginTop: "20px" }}>
                  <li style={{ display: "flex" }}>
                    <div className="icon">
                      <FaCheck />
                    </div>
                    <div className="text" style={{ paddingLeft: "20px" }}>
                      <p> The Admission into SMARTCLIFF long term Embedded Systems &amp; Full Stack Development course is based on
                        our SMARTCLIFF SCHOLARSHIP TEST which provides transparent and prompt admission process.</p>
                    </div>
                  </li>
                  <li style={{ display: "flex" }}>
                    <div className="icon">
                      <FaCheck />
                    </div>
                    <div className="text" style={{ paddingLeft: "20px" }}>
                      <p>Visit our website SMARTCLIFF to register for our online scholarship test.</p>
                    </div>
                  </li>
                  <li style={{ display: "flex" }}>
                    <div className="icon">
                      <FaCheck />
                    </div>
                    <div className="text" style={{ paddingLeft: "20px" }}>
                      <p>No fees for taking the scholarship test</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

















        </section>
      </div>
    </>
  )
}

export default Admissionsection1





