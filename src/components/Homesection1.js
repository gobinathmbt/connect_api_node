import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Home.css';
import logo from '../Pics/curriculum.png';
import FormComponent from '../Reusablecomponents/FormComponent';
import ApplyNow from '../Reusablecomponents/ApplyForm';
import EnquiryForm from '../Reusablecomponents/EnquiryForm';
import axios from 'axios';
import DatabaseContext from '../DataBaseConfig/Config';
import { Key } from 'react-bootstrap-icons';

// const carouselImages = [
//   'https://previews.123rf.com/images/vectorgift/vectorgift1604/vectorgift160400011/55410559-education-concept-with-vector-icons-and-elements-education-banner-for-website-header-advertising.jpg',
//   'https://previews.123rf.com/images/alexandraklestova/alexandraklestova2003/alexandraklestova200300153/143270675-online-education-banner-with-tablet-books-academic-cap-prize-coffee-cup-notebook-and-smartphone.jpg',
//   'https://indiater.com/wp-content/uploads/2019/02/free-education-website-promotion-banner-psd-template.jpg ',
//   // Add more image paths as needed
// ];

const Homesection1 = () => {


  const { selectedDatabase } = useContext(DatabaseContext);
  const mysqlBannerUrl = 'http://localhost:3002/MysqlSiteManagement';
  const mongoBannerUrl = 'http://localhost:3002/SiteManagement';
  const BannerUrl = selectedDatabase === 'mysql' ? mysqlBannerUrl : mongoBannerUrl;


  const mysqlContentUrl = 'http://localhost:3002/MysqlSiteManagement/Homecontent';
  const mongoContentUrl = 'http://localhost:3002/SiteManagement/Homecontent';
  const ContentUrl = selectedDatabase === 'mysql' ? mysqlContentUrl : mongoContentUrl;



  const [carouselImages, setcarouselImages] = useState([]);
  const [data, setData] = React.useState([]);

  const fetchContent = async () => {
    try {
      const response = await axios.get(ContentUrl);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);




  const fetchBannerUrl = async () => {
    try {
      const response = await axios.get(BannerUrl);
      setcarouselImages(response.data); // Ensure we are receiving the correct array of URLs
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBannerUrl();
  }, []);





  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <>
      <section className="home-page1" id="home-page1">
        {/* Carousel */}
        <div className="carousel-container" style={{ marginTop: "100px" }}>
          <Slider {...settings}>
            {carouselImages.map((image, index) => (
              <div key={index} >
                
                <img src={`http://localhost:3002/${image}`} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>

        {/* Existing content */}

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-7 left" style={{ paddingLeft: '80px', marginTop: '80px' }}>

              {data.length > 0 && (
                <div>
                  <h1 style={{ color: data[0].fontcolour, fontSize: `${data[0].fontsize}px` }}>
                    {data[0].text}
                  </h1>
                </div>
              )}
              {data.length > 0 && (
                <div>
                  <h3 style={{ color: data[1].fontcolour, fontSize: `${data[1].fontsize}px` }}>
                    {data[1].text}
                  </h3>
                </div>
              )}




              {/* <h3  >
                Unveiling the right pattern to learn & master any
                technology. Join us today!

              </h3> */}

              <div className="middle">
                <div className="btn1">
                  <ApplyNow btnname="start ur career" btnvar="contained" btncolor="secondary" />
                </div>
                <div className="btn2">
                  <EnquiryForm btnname="talk to experts" btnvar="contained" btncolor="secondary" />
                </div>
              </div>
              <div class="row icon">
                <div class="col-sm-2 ">
                  <div class="img"><img src={logo} /></div>
                  <div class="text"><span class="num">5000+</span>
                    students
                    trained
                    and placed</div>
                </div>


                <div class="col-sm-2">
                  <div class="img"><img src={logo} /></div>
                  <div class="text"><span class="num">100+</span>
                    live practical
                    session</div>
                </div>


                <div class="col-sm-2">
                  <div class="img"><img src={logo} /></div>
                  <div class="text"><span class="num">150+</span>
                    customized
                    courses</div>
                </div>


                <div class="col-sm-2">
                  <div class="img"><img src={logo} /></div>
                  <div class="text"><span class="num">80+</span>
                    highly
                    authorized
                    trainers</div>
                </div>


                <div class="col-sm-2">
                  <div class="img"><img src={logo} /></div>
                  <div class="text"><span class="num">N+</span>
                    number of access to the Projects</div>
                </div>
              </div>

            </div>

            <div className="col-sm-5 right" style={{ marginTop: '12%' }}>
              <FormComponent />
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Homesection1;
