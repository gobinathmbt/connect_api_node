import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarMaster from "./components/NavbarMaster";
import Footer from "./Reusablecomponents/Footer";
import HomeMaster from "./components/HomeMaster"
import OurApproachMaster from "./components/OurApproachMaster";
import WhoWeAreMaster from "./components/WhoWeAreMaster";
import CourseMaster from "./components/CoursesMaster"
import HireFromUsMaster from "./components/HireFromUsMaster";
import JoinUsMaster from "./components/JoinUsMaster";
import Page404 from "./Reusablecomponents/Page404";
import ScrollToTopButton from "./Reusablecomponents/ScrollTop";
import AdmissionMaster from "./components/AdmissionMaster";
import ServiceMaster from "./components/ServiceMaster";
import GalleryMaster from "./components/GalleryMaster";
import PlacementMaster from "./components/PlacementMaster";
import AdminMaster from "./components/AdminMaster";
import Courseexpandsection1 from "./components/Courseexpandsection1";
import PrivateRoute from "./DataBaseConfig/PrivateRoute";


const MasterHome = () => {
  return (
    <>
      <title>Smart Cliff - Home</title>
      <NavbarMaster />
      <HomeMaster />
      <ScrollToTopButton />
      <Footer />

    </>
  );
};

const MasterApproach = () => {
  return (
    <>
      <title>Smart Cliff - Approach</title>
      <NavbarMaster />
      <ScrollToTopButton />
      <OurApproachMaster />
      <Footer />
    </>
  );
};


const MasterWhoWeAre = () => {
  return (
    <>
      <title>Smart Cliff - Who We Are</title>
      <NavbarMaster />
      <ScrollToTopButton />
      <WhoWeAreMaster />
      <Footer />
    </>
  );
};



const MasterCourses = () => {
  return (
    <>
      <title>Smart Cliff - Courses</title>
      <NavbarMaster />
      <ScrollToTopButton />
      <CourseMaster />
      <Footer />
    </>
  );
};


const MasterService = () => {
  return (
    <>
      <title>Smart Cliff - Services</title>
      <NavbarMaster />
      <ScrollToTopButton />
      <ServiceMaster />
      <Footer />

    </>
  );
};


const MasterHireFromUs = () => {
  return (
    <>
      <title>Smart Cliff - Hire From Us</title>
      <NavbarMaster />
      <ScrollToTopButton />
      <HireFromUsMaster />
      <Footer />
    </>
  );
};


const MasterJoinUs = () => {
  return (
    <>
      <title>Smart Cliff - Join Us</title>
      <NavbarMaster />
      <ScrollToTopButton />
      <JoinUsMaster />
      <Footer />
    </>
  );
};

const MasterAdmission = () => {
  return (
    <>
      <title>Smart Cliff - Admission</title>
      <NavbarMaster />
      <ScrollToTopButton />
      <AdmissionMaster />
      <Footer />
    </>
  );
};
const MasterGallery = () => {
  return (
    <>
      <title>Smart Cliff - Gallery</title>
      <NavbarMaster />
      <ScrollToTopButton />
      <GalleryMaster />
      <Footer />
    </>
  );
};
const MasterPlacement = () => {
  return (
    <>
      <title>Smart Cliff - Placement</title>
      <NavbarMaster />
      <ScrollToTopButton />
      <PlacementMaster />
      <Footer />
    </>

  );
};

const MasterCourseExpand = () => {

  return (
    <>
      <title>Smart Cliff - Courses</title>
      <NavbarMaster />
      <ScrollToTopButton />
      <Courseexpandsection1 />
      <Footer />
    </>
  );
};
const MasterAdmin = () => {
  return (
    <>
      <title>Smart Cliff - Admin</title>
      <AdminMaster />
    </>
  );
};





const App = () => {
  return (
    <>

      <Routes>
        <Route exact path="/" element={<MasterHome />} />
        <Route exact path="our-approach" element={<MasterApproach />} />
        <Route exact path="who-we-are" element={<MasterWhoWeAre />} />
        <Route exact path="course" element={<MasterCourses />} />
        <Route exact path="service" element={<MasterService />} />
        <Route exact path="hire-from-us" element={<MasterHireFromUs />} />
        <Route exact path="join-us" element={<MasterJoinUs />} />
        <Route exact path="admission" element={<MasterAdmission />} />
        <Route exact path="gallery" element={<MasterGallery />} />
        <Route exact path="placement" element={<MasterPlacement />} />
        <Route exact path="course/:_id" element={<MasterCourseExpand />} />
        {/* <Route exact path="admin" element={<MasterAdmin />} /> */}
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <MasterAdmin />
            </PrivateRoute>
          }
        />

        <Route exact path="*" element={<Page404 />} />
      </Routes>

    </>
  );

};

export default App;
