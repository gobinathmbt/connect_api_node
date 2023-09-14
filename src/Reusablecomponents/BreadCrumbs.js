import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

const BreadcrumbItem = ({ to, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
  
    return (
      <Link to={to}>
        <Typography variant={isActive ? 'h6' : 'body1'} color={isActive ? 'text.primary' : 'text.secondary'}>
          {label}
        </Typography>
      </Link>
    );
  };
  
const BreadcrumbSeparator = () => (
    <Typography variant="body1" color="text.secondary">
        /
    </Typography>
);



const BreadcrumbsComponent = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((pathname) => pathname !== '');
  
    return (
      <Breadcrumbs separator={<BreadcrumbSeparator />} aria-label="breadcrumb">
        <BreadcrumbItem to="/" label="Home" />
  
        {pathnames.map((pathname, index) => {
          const endpoint = `/${pathnames.slice(0, index + 1).join('/')}`;
  
          return (
            <BreadcrumbItem key={endpoint} to={endpoint} label={pathname} />
          );
        })}
      </Breadcrumbs>
    );
  };
  

export default BreadcrumbsComponent;
