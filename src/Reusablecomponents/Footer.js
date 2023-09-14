import React from 'react'
import "../Reusablecomponents/Footer.css"
import { NavLink } from 'react-router-dom'
import "../Reusablecomponents/display.css"
import logo from "../Pics/logo.png"
const Footer = () => {

    const handleNavLinkClick = () => {
        window.scrollTo(0, 0);
    };


    const year = new Date();
    return (
        <>
            {/* <div class="container-fluid mx-auto" id='footer'>
                <div class="row justify-content-center mt-4 row-1">
                    <div class="col-md-10">
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <h1 class="heading">Newsletter Signup</h1>
                                <p>Get Best Deals On The Internet Delivered Right In Your Inbox</p>
                            </div>
                            <div class="col-md-6">
                                <form class="form-card row mt-5">
                                    <div class="form-group">
                                        <input type="email" name="email" placeholder="Enter Your Email ID" />
                                    </div>
                                    <div class="form-group">
                                        <input class="btn btn-orange" type="submit" name="submit" value="Subscribe Now" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="terms d-flex pb-3">
                            <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <img class="img-1" />
                    </div>
                </div>
                <div class="row d-flex justify-content-between row-2">
                    <div class="col-md-2">
                        <div class="block-item">
                            <div class="fa fa-envelope"></div>
                            <div class="sub-head">Newsletter</div>
                            <p class="desc">5,00,000 People have already subscribed special newsletter</p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="block-item">
                            <div class="fa fa-eye"></div>
                            <div class="sub-head">Page Views</div>
                            <p class="desc">1 Billion Page views we receive every year</p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="block-item">
                            <div class="fa fa-fire"></div>
                            <div class="sub-head">Ranking</div>
                            <p class="desc">Top 200+ We are among top 200 sites in India</p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="block-item">
                            <div class="fa fa-home"></div>
                            <div class="sub-head">Merchants</div>
                            <p class="desc">Top 200 Merchants who are promoting their products</p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="block-item">
                            <div class="fa fa-facebook"></div>
                            <div class="sub-head">Fan's on Facebook</div>
                            <p class="desc">2,00,000+ fans on Facebook</p>
                        </div>
                    </div>
                </div>
                <div class="row d-flex px-4">
                    <div class="col-md-8">
                        <div class="row d-flex justify-content-between">
                            <div class="col-md-3">
                                <div class="d-flex flex-column block-footer">
                                    <h5 class="footer-headings">Quick Links</h5>
                                    <NavLink
                                        className="list-items"
                                        style={{ textDecoration: "none", color: "white" }}
                                        to="/"
                                       // onClick={handleNavLinkClick}
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        className="list-items"
                                        style={{ textDecoration: "none", color: "white" }}
                                        to="/our-approach"
                                       // onClick={handleNavLinkClick}
                                    >
                                        Our Approach
                                    </NavLink>
                                    <NavLink
                                        className="list-items"
                                        style={{ textDecoration: "none", color: "white" }}
                                        to="/who-we-are"
                                       // onClick={handleNavLinkClick}
                                    >
                                        Who We Are
                                    </NavLink>
                                    <NavLink
                                        className="list-items"
                                        style={{ textDecoration: "none", color: "white" }}
                                        to="/course"
                                       // onClick={handleNavLinkClick}
                                    >
                                        Courses
                                    </NavLink>
                                    <NavLink
                                        className="list-items"
                                        style={{ textDecoration: "none", color: "white" }}
                                        to="/service"
                                       // onClick={handleNavLinkClick}
                                    >
                                        Services
                                    </NavLink>
                                    <NavLink
                                        className="list-items"
                                        style={{ textDecoration: "none", color: "white" }}
                                        to="/hire-from-us"
                                       // onClick={handleNavLinkClick}
                                    >
                                        Hire From Us
                                    </NavLink>
                                    <NavLink
                                        className="list-items"
                                        style={{ textDecoration: "none", color: "white" }}
                                        to="/join-us"
                                       // onClick={handleNavLinkClick}
                                    >
                                        Join Us
                                    </NavLink>
                                    <NavLink
                                        className="list-items"
                                        style={{ textDecoration: "none", color: "white" }}
                                        to="/admission"
                                       // onClick={handleNavLinkClick}
                                    >
                                        Admission
                                    </NavLink>
                                </div>
                            </div>


                            <div class="col-md-3">
                                <div class="d-flex flex-column block-footer">
                                    <h5 class="footer-headings">Festival Deals</h5>
                                    <p class="list-items">Diwali Offers</p>
                                    <p class="list-items">New Year Offers</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex flex-column block-footer">
                                    <h5 class="footer-headings">Top Stories</h5>
                                    <p class="list-items">Jlorem2</p>
                                    <p class="list-items">dummy</p>
                                    <p class="list-items">dummy</p>

                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex flex-column block-footer">
                                    <h5 class="footer-headings">Need Help?</h5>
                                    <p class="list-items">Getting Started</p>
                                    <p class="list-items">Contact Us</p>
                                    <p class="list-items">FAQ's</p>
                                    <p class="list-items">Press</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="d-flex flex-column pl-md-5 px-4">
                            <div class="d-flex flex-column pl-md-2 border-left pb-3">
                                <h5 class="footer-headings mb-3">Follow Us</h5>
                                <div class="footersocial ">
                                   <a href="https://www.facebook.com/smartcliff.in/"><i class="fa fa-sm fa-facebook"></i></a> 
                                   <a href=""> <i class="fa fa-sm fa-twitter"></i></a>
                                   <a href=""><i class="fa fa-sm fa-google-plus"></i></a>
                                   <a href="https://in.pinterest.com/smartcliff/"> <i class="fa fa-sm fa-pinterest"></i></a>
                                   <a href="https://www.linkedin.com/posts/smartcliff_education-oppurtunity-learn-activity-6910082777627451392-Ewyi/?originalSubdomain=in"><i class="fa fa-sm fa-linkedin"></i></a>
                                   <a href=""><i class="fa fa-sm fa-youtube-play"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="container-fluid">

                <div class="row footer-end">
                    <div class="col-sm-9"><h3> Copyrights @  {year.getFullYear()} SmartCliff. All Rights Reserved.   </h3></div>
                    <div class="col-sm-3"><h3>Designed by GobiNath.S</h3></div>
                </div>

            </div> */}

            <footer class="footer-section" style={{marginTop:"60px"}}>
                <div class="container">

                    <div class="footer-content pt-5 pb-5">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4">

                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-evenly", flexDirection: "column", gap: "40px" }}>
                                    <div >
                                        <div class=" single-cta row">
                                            <div className='col-sm-1'>
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>

                                            <div class="col-sm-11 cta-text">
                                                <h4>Find us</h4>
                                                <span>2000, Krishna Colony (opp. to Central Studio) Ramanathapuram Trichy Road Coimbatore - 641 005</span>
                                            </div>

                                        </div>
                                    </div>
                                    <div >
                                        <div class="single-cta">
                                            <i class="fas fa-phone"></i>
                                            <a href="tel:+91 811077033">
                                                <div class="cta-text">
                                                    <h4>Call us</h4>
                                                    <span>+91 8110077033</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div >
                                        <div class="single-cta">
                                            <i class="far fa-envelope-open"></i>
                                            <a href="mailto:enquiry@smartcliff.in">
                                                <div class="cta-text">
                                                    <h4>Mail us</h4>
                                                    <span>enquiry@smartcliff.in</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
                                <div class="footer-widget">
                                    <div class="footer-widget-heading">
                                        <h3>Quick Links</h3>
                                    </div>
                                <div style={{ display: "flex" , gap: "20px"}}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/"
                                            onClick={handleNavLinkClick}
                                        >
                                            Home
                                        </NavLink>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/our-approach"
                                            onClick={handleNavLinkClick}
                                        >
                                            Our Approach
                                        </NavLink>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/who-we-are"
                                            onClick={handleNavLinkClick}
                                        >
                                            Who We Are
                                        </NavLink>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/course"
                                            onClick={handleNavLinkClick}
                                        >
                                            Courses
                                        </NavLink>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/service"
                                            onClick={handleNavLinkClick}
                                        >
                                            Services
                                        </NavLink>
                                
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/hire-from-us"
                                            onClick={handleNavLinkClick}
                                        >
                                            Hire From Us
                                        </NavLink>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/join-us"
                                            onClick={handleNavLinkClick}
                                        >
                                            Join Us
                                        </NavLink>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/admission"
                                            onClick={handleNavLinkClick}
                                        >
                                            Admission
                                        </NavLink>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/placement"
                                            onClick={handleNavLinkClick}
                                        >
                                            Placement
                                        </NavLink>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/gallery"
                                            onClick={handleNavLinkClick}
                                        >
                                            Gallery
                                        </NavLink>
                                
                                    </div>
                                </div>

                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
                                <div class="footer-widget">
                                    <div class="footer-widget-heading">
                                        <h3>Subscribe</h3>
                                    </div>
                                    <div class="footer-text mb-25">
                                        <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                    </div>
                                    <div class="subscribe-form">
                                        <form action="#">
                                            <input type="text" placeholder="Email Address" />
                                            <button><i class="fab fa-telegram-plane"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="copyright-area">
                    <div class="container">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                            <div >
                                <div class="copyright-text">
                                    <p> Copyrights @  {year.getFullYear()} SmartCliff. All Rights Reserved.</p>
                                </div>
                            </div>
                            <div >


                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", gap: "70px" }}>
                                    <div>   <NavLink
                                        className="list-items"
                                        style={{ textDecoration: "none", color: "white" }}
                                        to="/"
                                        onClick={handleNavLinkClick}
                                    >
                                        Home
                                    </NavLink></div>
                                    <div>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/course"
                                            onClick={handleNavLinkClick}
                                        >
                                            Courses
                                        </NavLink></div>
                                    <div>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/service"
                                            onClick={handleNavLinkClick}
                                        >
                                            Services
                                        </NavLink></div>
                                    <div>
                                        <NavLink
                                            className="list-items"
                                            style={{ textDecoration: "none", color: "white" }}
                                            to="/gallery"
                                            onClick={handleNavLinkClick}
                                        >
                                            Gallery
                                        </NavLink></div>

                                </div>






                            </div>
                            <div >
                                <div class="copyright-text">
                                    <p> Designed And Developed by GobiNath.S </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


            {/* 

            <footer class="new_footer_area bg_color">
                <div class="new_footer_top">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 col-md-6">
                                <div class="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s" style={{ visibility: "visible", animationDelay: "0.2s", animationName: "fadeInLeft" }}>
                                    <h3 class="f-title f_600 t_color f_size_18">Get in Touch</h3>
                                    <p>Don’t miss any updates of our new templates and extensions.!</p>
                                    <form action="#" class="f_subscribe_two mailchimp" method="post" novalidate="true" _lpchecked="1">
                                        <input type="text" name="EMAIL" class="form-control memail" placeholder="Email" />
                                        <button class="btn btn_get btn_get_two" type="submit">Subscribe</button>
                                        <p class="mchimp-errmessage" style={{ display: "none" }}></p>
                                        <p class="mchimp-sucmessage" style={{ display: "none" }}></p>
                                    </form>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.4s" style={{ visibility: "visible", animationDelay: "0.4s", animationName: "fadeInLeft" }}>
                                    <h3 class="f-title f_600 t_color f_size_18">Download</h3>
                                    <ul class="list-unstyled f_list">
                                        <li><a href="#">Company</a></li>
                                        <li><a href="#">Android App</a></li>
                                        <li><a href="#">ios App</a></li>
                                        <li><a href="#">Desktop</a></li>
                                        <li><a href="#">Projects</a></li>
                                        <li><a href="#">My tasks</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.6s" style={{ visibility: "visible", animationDelay: "0.6s", animationName: "fadeInLeft" }}>
                                    <h3 class="f-title f_600 t_color f_size_18">Help</h3>
                                    <ul class="list-unstyled f_list">
                                        <li><a href="#">FAQ</a></li>
                                        <li><a href="#">Term &amp; conditions</a></li>
                                        <li><a href="#">Reporting</a></li>
                                        <li><a href="#">Documentation</a></li>
                                        <li><a href="#">Support Policy</a></li>
                                        <li><a href="#">Privacy</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s" style={{ visibility: "visible", animationDelay: "0.8s", animationName: "fadeInLeft" }}>
                                    <h3 class="f-title f_600 t_color f_size_18">Team Solutions</h3>
                                    <div class="f_social_icon">
                                        <a href="#" class="fab fa-facebook"></a>
                                        <a href="#" class="fab fa-twitter"></a>
                                        <a href="#" class="fab fa-linkedin"></a>
                                        <a href="#" class="fab fa-pinterest"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer_bg">
                        <div class="footer_bg_one"></div>
                        <div class="footer_bg_two"></div>
                    </div>
                </div>
                <div class="footer_bottom">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-6 col-sm-7">
                                <p class="mb-0 f_400">© cakecounter Inc.. 2019 All rights reserved.</p>
                            </div>
                            <div class="col-lg-6 col-sm-5 text-right">
                                <p>Made with <i class="icon_heart"></i> in <a href="http://cakecounter.com" target="_blank">CakeCounter</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> */}



        </>
    )
}


export default Footer