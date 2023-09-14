import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogActions, Menu, MenuItem } from '@mui/material';
import AdminCourse from './AdminCourse';
import AdminCategory from './AdminCategory';
import AdminEnquiry from './AdminEnquiry';
import AdminApply from './AdminApply';
import AdminJoinUs from './AdminJoinUsForm';
import AdminCorporateService from './AdminCorporateService';
import AdminInstituteService from './AdminInstituteService';
import AdminStudentService from './AdminStudentService';
import AdminEmployeeService from './AdminEmployeeService';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Banner from '../Reusablecomponents/Banner';
import { SwapHorizontalCircle } from '@mui/icons-material';
import DatabaseContext from '../DataBaseConfig/Config';
import AdminSiteManagementMaster from './AdminSiteManagementMaster';
import { useAuth } from '../DataBaseConfig/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CgLogOut } from 'react-icons/cg';
import logo from "../Pics/20964280803_auto_x2.jpg"



const AdminMaster = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { selectedDatabase, setSelectedDatabase } = useContext(DatabaseContext);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleDatabaseSwitch = () => {
    // Show the confirmation dialog before switching
    setConfirmDialogOpen(true);
  };

  const handleConfirmSwitch = (database) => {
    setSelectedDatabase(database);
    setConfirmDialogOpen(false);
  };

  const handleMoreMenuOpen = (event) => {
    setMoreMenuAnchor(event.currentTarget);
    setShowMoreMenu(true);
  };

  const handleMoreMenuClose = () => {
    setShowMoreMenu(false);
  };

  const handleTabSelect = (index) => {
    setSelectedTab(index);
    handleMoreMenuClose();
  };

  useEffect(() => {
    localStorage.setItem('selectedDatabase', selectedDatabase);
  }, [selectedDatabase]);


  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <>

      <div style={{ position: 'relative', marginBottom: "20px" }}>
        <img className="img-fluid" src={logo} style={{ height: "300px", width: "100%" }} />
        <div style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <h1 style={{ fontSize: '70px', fontWeight: 'bold', color: 'black' }}>Admin</h1>
        </div>
      </div>




      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: "20px", marginRight: "10px" }}>
        <Button
          variant="outlined"
          component={Link}
          to="/"
          color="secondary"
          startIcon={<FaHome />}
          target="_blank"
        >
          Back To Site
        </Button>
        <Button onClick={handleDatabaseSwitch} color="success" variant="outlined" startIcon={<SwapHorizontalCircle />}>
          Switch DB
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout} startIcon={<CgLogOut />}>
          Logout
        </Button>
      </div>

      <Tabs value={selectedTab} onChange={handleTabChange} centered style={{ marginTop: "10px" }}>
        <Tab label="Course Management" />   {/* 0 */}
        <Tab label="Category Management" />    {/* 1 */}
        <Tab label="Apply Details" />        {/* 2*/}
        <Tab label="service Enquiries" onClick={handleMoreMenuOpen} />    {/* 3 */}
        <Tab label="JoinUs Details " />     {/* 4 */}
        <Tab label="Enquiry Details" />    {/* 5 */}
        <Tab label="Site Management" />          {/* 6 */}
      </Tabs>

      {selectedTab === 0 && (
        <div className="container-fluid" style={{ marginTop: '40px' }}>
          <AdminCourse />

        </div>
      )}

      {selectedTab === 1 && (
        <div className="container" style={{ marginTop: '40px' }}>
          <AdminCategory />

        </div>
      )}
      {selectedTab === 2 && (
        <div className="container" style={{ marginTop: '40px' }}>
          <AdminApply />
        </div>
      )}
      {selectedTab === 4 && (
        <div className="container" style={{ marginTop: '40px' }}>
          <AdminJoinUs />
        </div>
      )}
      {selectedTab === 5 && (
        <div className="container" style={{ marginTop: '40px' }}>
          <AdminEnquiry />
        </div>
      )}
      {selectedTab === 6 && (
        <div className="container-fluid" style={{ marginTop: '40px' }}>

          <AdminSiteManagementMaster />
        </div>
      )}
      {selectedTab === 7 && (
        <div className="container" style={{ marginTop: '40px' }}>
          <AdminCorporateService />
        </div>
      )}
      {selectedTab === 8 && (
        <div className="container" style={{ marginTop: '40px' }}>
          <AdminInstituteService />
        </div>
      )}
      {selectedTab === 9 && (
        <div className="container" style={{ marginTop: '40px' }}>
          <AdminStudentService />
        </div>
      )}
      {selectedTab === 10 && (
        <div className="container" style={{ marginTop: '40px' }}>
          <AdminEmployeeService />
        </div>
      )}


      {/* More Tabs Menu */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={showMoreMenu}
        onClose={handleMoreMenuClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => handleTabSelect(7)}>Corporate Enquiry</MenuItem>
        <MenuItem onClick={() => handleTabSelect(8)}>Institution Enquiry</MenuItem>
        <MenuItem onClick={() => handleTabSelect(9)}>Students Enquiry</MenuItem>
        <MenuItem onClick={() => handleTabSelect(10)}>Employee Enquiry</MenuItem>


      </Menu>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Database Switch</DialogTitle>
        <DialogContent>
          Are you sure you want to switch to {selectedDatabase === 'mongodb' ? 'MySQL' : 'MongoDB'}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmSwitch(selectedDatabase)}>Cancel</Button>
          <Button onClick={() => handleConfirmSwitch(selectedDatabase === 'mongodb' ? 'mysql' : 'mongodb')} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminMaster;
