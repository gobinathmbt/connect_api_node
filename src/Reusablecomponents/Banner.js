import React from 'react'
import logo from "../Pics/20964280803_auto_x2.jpg"
import BreadcrumbsComponent from './BreadCrumbs'

const Banner = ({title}) => {
    return (
        <div style={{ position: 'relative' }}>
        <img className="img-fluid" src={logo} style={{ height: "300px", width: "100%"}} />
            <div style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <h1 style={{ fontSize: '70px', fontWeight: 'bold', color: 'black' }}>{title}</h1>
            
            </div>
            <BreadcrumbsComponent/>
        </div>
    )
}

// https://t3.ftcdn.net/jpg/04/71/08/14/240_F_471081435_JRdtNpn8uXnj4VEZoZU6Yrdw9sl6chtZ.jpg
// https://t3.ftcdn.net/jpg/04/71/08/12/240_F_471081282_wcsRAjF2XDR1gnf0TuKpAS9P790gwfzn.jpg
// https://t3.ftcdn.net/jpg/04/71/08/14/240_F_471081443_zQxxFUD1TPxTvRZceUOsBvAArUnK6YHK.jpg
// https://t3.ftcdn.net/jpg/04/71/08/14/240_F_471081440_xGPHrQqDOAuxAcjp2o9SmWL4n9SOjFNp.jpg
// https://t4.ftcdn.net/jpg/04/71/08/13/240_F_471081312_aNE9cL0Z7QsbtZXVvNlsH26e2Wfmuc2n.jpg

export default Banner