import React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import HomeBanner from './AdminSiteManagement/HomeBanner';
import HomeContent from './AdminSiteManagement/HomeContent';

const AdminSiteManagementMaster = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Scrollable and fixed Tabs */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          flexShrink: 0, // Ensure the Tabs don't shrink when there are many
          maxHeight: 'calc(100vh - 64px)', // Set the maximum height to the viewport height minus some padding (e.g., app bar height)
        }}
      >
        <Tab label="Home Banner" />
        <Tab label="Home Content" />
      </Tabs>


      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>



        <TabPanel value={selectedTab} index={0}>
          <Typography><HomeBanner/></Typography>
        </TabPanel>



        <TabPanel value={selectedTab} index={1}>
          <Typography><HomeContent/></Typography>
        </TabPanel>



      </Box>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default AdminSiteManagementMaster;
