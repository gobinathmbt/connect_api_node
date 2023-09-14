import "../css/Nav3.css"
import logo from "../Pics/logo.png"
import ApplyNow from '../Reusablecomponents/ApplyForm'
import EnquiryForm from '../Reusablecomponents/EnquiryForm'
import { FaUserGraduate } from 'react-icons/fa';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import { Button } from '@mui/material'
import { MdEmail } from "react-icons/md";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ScrollProgress from '../Reusablecomponents/ScrollProgress'
import AdminLoginForm from './AdminLoginForm'


const Nav3 = () => {

  const handleNavLinkClick = () => {
    window.scrollTo(0, 0);
};

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light fixed-top  " style={{ height: "auto", backgroundColor: "white" }}>

        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className=" collapse navbar-collapse" id="navbarNavDropdown" style={{ height: "20px" }}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Button
                  variant="text"
                  color="secondary"
                  href="tel:+91 811077033"
                  startIcon={<BsFillTelephoneOutboundFill />}
                >  Phone_1:+91 8110077033</Button>
              </li>
              <li className="nav-item" style={{ marginLeft: "20px" }}>
                <Button
                  variant="text"
                  color="secondary"
                  href="mailto:enquiry@smartcliff.in"
                  startIcon={<MdEmail />}
                > enquiry@smartcliff.in  </Button>
              </li>
     

            </ul>


            <ul className="navbar-nav ms-auto d-none d-lg-inline-flex" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px"}}>
              <li className="nav-item">
                <Button variant="text" component={Link} to="/admission" color="secondary" startIcon={<FaUserGraduate />} >  Admission  </Button>

              </li>
              <li className="nav-item">
          
                  <ApplyNow btnname="Apply  Now" btnvar="text" btncolor="secondary" />
       

              </li>
              <li className="nav-item">
                
                  <EnquiryForm btnname="Enquiry" btnvar="text" btncolor="secondary" />
            

              </li>
              <li className="nav-item">
             
                  <AdminLoginForm />
          

              </li>
            </ul>



            <ul className="navbar-nav ms-auto d-none d-lg-inline-flex">
              <li className="nav-item ">
                <Button variant="text" color="secondary" startIcon={<FacebookIcon />} >

                </Button>
              </li>
              <li className="nav-item ">
                <Button variant="text" color="secondary" startIcon={<TwitterIcon />} >

                </Button>
              </li>
              <li className="nav-item ">
                <Button variant="text" color="secondary" startIcon={<LinkedInIcon />} >

                </Button>
              </li>

            </ul>
          </div>
        </div>
      </nav>






      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#a200be", position: "sticky", top: "35px", zIndex: "9999999999" }}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to='/' style={{ background: 'white', borderRadius: "5px" }}>
            <img src={logo} style={{ height: "40px" }} alt="Logo"    onClick={handleNavLinkClick} />
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-4 main-menu">

              <li className="nav-item">
                <NavLink className="nav-link mx-4" exact activeClassName="active" to='/'    onClick={handleNavLinkClick}>Home</NavLink>
              </li>

              <li className="nav-item">  <NavLink className="nav-link mx-4" exact activeClassName="active"    onClick={handleNavLinkClick} to='/our-approach'>Our Approach</NavLink></li>
              <li className="nav-item">  <NavLink className="nav-link mx-4" exact activeClassName="active"    onClick={handleNavLinkClick} to='/who-we-are'>Who We Are</NavLink></li>
              <li className="nav-item">  <NavLink className="nav-link mx-4" exact activeClassName="active"    onClick={handleNavLinkClick} to='/course'>Courses</NavLink></li>
              <li className="nav-item">  <NavLink className="nav-link mx-4" exact activeClassName="active"    onClick={handleNavLinkClick} to='/service'>Services</NavLink></li>
              <li className="nav-item">  <NavLink className="nav-link mx-4" exact activeClassName="active"    onClick={handleNavLinkClick} to='/hire-from-us'>Hire From Us</NavLink></li>
              <li className="nav-item">  <NavLink className="nav-link mx-4" exact activeClassName="active"    onClick={handleNavLinkClick} to='/join-us'>Join Us</NavLink></li>
              <li className="nav-item">  <NavLink className="nav-link mx-4" exact activeClassName="active"    onClick={handleNavLinkClick} to='/placement'>Placement</NavLink></li>
              <li className="nav-item">  <NavLink className="nav-link mx-4" exact activeClassName="active"    onClick={handleNavLinkClick} to='/gallery'>Gallery</NavLink></li>

            </ul>
          </div>
        </div>
      </nav>


      <ScrollProgress />
    </>
  )
}

export default Nav3