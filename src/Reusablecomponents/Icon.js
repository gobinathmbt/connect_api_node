import React from 'react'


const Icon = ({ logo, num, content }) => {
    return (
        <>
            <div class="icon-section icon" id="icon-section">

                <div className='icon'>
                    <div class="img"><img src={logo} /></div>
                    <div class="text"><span class="num">{num}+</span>
                        {content}</div>

                </div>
            </div>
        </>
    )
}

export default Icon