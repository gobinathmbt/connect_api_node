import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function ResponsiveNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = React.useState(null);
  const [openSubmenu, setOpenSubmenu] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenSubmenu = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
    setOpenSubmenu(true);
  };

  const handleCloseSubmenu = () => {
    setSubmenuAnchorEl(null);
    setOpenSubmenu(false);
  };

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <AppBar position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              <a href="mailto:info@example.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                info@example.com
              </a>{' '}
              |{' '}
              <a href="tel:123-456-789" style={{ color: 'inherit', textDecoration: 'none' }}>
                123-456-789
              </a>
            </Typography>
            {/* Admission Process, Apply Now, and Enquiry */}
            <Button color="inherit" href="/admission-process">
              Admission Process
            </Button>
            <Button color="inherit" href="/apply-now">
              Apply Now
            </Button>
            <Button color="inherit" href="/enquiry">
              Enquiry
            </Button>
            {/* Social Media Icons */}
            <IconButton color="inherit" href="https://facebook.com" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" href="https://twitter.com" target="_blank">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" href="https://instagram.com" target="_blank">
              <InstagramIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Second Navbar */}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Hamburger Menu */}
            <IconButton color="inherit" edge="start" onClick={handleMobileMenuOpen} sx={{ display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              {/* Home, About Us, and Courses */}
              <Button color="inherit" href="/">
                Home
              </Button>
              <Button color="inherit" href="/about">
                About Us
              </Button>
              <Button
                color="inherit"
                aria-controls="courses-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                endIcon={<ExpandMoreIcon />}
              >
                Courses
              </Button>

              {/* Courses Dropdown */}
              <Menu
                id="courses-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                MenuListProps={{ 'aria-labelledby': 'courses-menu' }}
              >
                <MenuItem onClick={handleOpenSubmenu}>
                  <ListItemText primary="Submenu 1" />
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                </MenuItem>
                <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                  <Menu
                    id="submenu-1"
                    anchorEl={submenuAnchorEl}
                    open={openSubmenu}
                    onClose={handleCloseSubmenu}
                    MenuListProps={{ 'aria-labelledby': 'submenu-1' }}
                  >
                    <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-1/item-1">
                      Item 1
                    </MenuItem>
                    <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-1/item-2">
                      Item 2
                    </MenuItem>
                  </Menu>
                </Collapse>

                <MenuItem onClick={handleOpenSubmenu}>
                  <ListItemText primary="Submenu 2" />
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                </MenuItem>
                <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                  <Menu
                    id="submenu-2"
                    anchorEl={submenuAnchorEl}
                    open={openSubmenu}
                    onClose={handleCloseSubmenu}
                    MenuListProps={{ 'aria-labelledby': 'submenu-2' }}
                  >
                    <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-2/item-1">
                      Item 1
                    </MenuItem>
                    <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-2/item-2">
                      Item 2
                    </MenuItem>
                  </Menu>
                </Collapse>

                <MenuItem onClick={handleOpenSubmenu}>
                  <ListItemText primary="Submenu 3" />
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                </MenuItem>
                <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                  <Menu
                    id="submenu-3"
                    anchorEl={submenuAnchorEl}
                    open={openSubmenu}
                    onClose={handleCloseSubmenu}
                    MenuListProps={{ 'aria-labelledby': 'submenu-3' }}
                  >
                    <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-3/item-1">
                      Item 1
                    </MenuItem>
                    <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-3/item-2">
                      Item 2
                    </MenuItem>
                  </Menu>
                </Collapse>

                <MenuItem onClick={handleOpenSubmenu}>
                  <ListItemText primary="Submenu 4" />
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                </MenuItem>
                <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                  <Menu
                    id="submenu-4"
                    anchorEl={submenuAnchorEl}
                    open={openSubmenu}
                    onClose={handleCloseSubmenu}
                    MenuListProps={{ 'aria-labelledby': 'submenu-4' }}
                  >
                    <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-4/item-1">
                      Item 1
                    </MenuItem>
                    <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-4/item-2">
                      Item 2
                    </MenuItem>
                  </Menu>
                </Collapse>
              </Menu>

              {/* Services, Hire from Us, Join Us, Placement, and Gallery */}
              <Button color="inherit" href="/services">
                Services
              </Button>
              <Button color="inherit" href="/hire">
                Hire from Us
              </Button>
              <Button color="inherit" href="/join">
                Join Us
              </Button>
              <Button color="inherit" href="/placement">
                Placement
              </Button>
              <Button color="inherit" href="/gallery">
                Gallery
              </Button>
            </Typography>

            {/* Mobile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={mobileMenuOpen}
              onClose={handleMobileMenuClose}
              MenuListProps={{ 'aria-labelledby': 'mobile-menu' }}
            >
              {/* Home, About Us, and Courses */}
              <MenuItem onClick={handleMobileMenuClose} href="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose} href="/about">
                About Us
              </MenuItem>
              <MenuItem onClick={handleOpenMenu}>
                Courses
                <ExpandMoreIcon />
              </MenuItem>

              {/* Courses Dropdown */}
              <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                <Menu
                  id="mobile-submenu"
                  anchorEl={submenuAnchorEl}
                  open={openSubmenu}
                  onClose={handleCloseSubmenu}
                  MenuListProps={{ 'aria-labelledby': 'mobile-submenu' }}
                >
                  <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-1/item-1">
                    Item 1
                  </MenuItem>
                  <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-1/item-2">
                    Item 2
                  </MenuItem>
                  <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-2/item-1">
                    Item 1
                  </MenuItem>
                  <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-2/item-2">
                    Item 2
                  </MenuItem>
                  <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-3/item-1">
                    Item 1
                  </MenuItem>
                  <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-3/item-2">
                    Item 2
                  </MenuItem>
                  <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-4/item-1">
                    Item 1
                  </MenuItem>
                  <MenuItem onClick={handleCloseSubmenu} href="/courses/submenu-4/item-2">
                    Item 2
                  </MenuItem>
                </Menu>
              </Collapse>

              {/* Services, Hire from Us, Join Us, Placement, and Gallery */}
              <MenuItem onClick={handleMobileMenuClose} href="/services">
                Services
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose} href="/hire">
                Hire from Us
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose} href="/join">
                Join Us
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose} href="/placement">
                Placement
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose} href="/gallery">
                Gallery
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveNavbar;
