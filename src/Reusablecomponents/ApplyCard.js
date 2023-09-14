import React from 'react'
import JoinUsForm from '../Reusablecomponents/JoinUsForm'
const ApplyCard = ({ heading, content }) => {
    return (
        <>


            <div class="container-fluid">
                <div>
                    <h6>
                        {heading}
                    </h6>
                </div>
                <div>
                    <p style={{ textAlign: "center" }}>

                        {content}

                    </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div>
                        <JoinUsForm btnname="ApplyNow" btnvar="outlined" btncolor="secondary" />
                    </div>
                </div>
            </div>



        </>
    )
}

export default ApplyCard