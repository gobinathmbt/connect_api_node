// import React, { useState } from 'react';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { CgLogIn,CgLogOut } from 'react-icons/cg';
// const AdminLoginButton = () => {
//   const [open, setOpen] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleLogin = () => {
//     if (username === 'a' && password === 'a') {
//       localStorage.setItem('isAdminLoggedIn', 'true');
//       navigate('/admin');
//     } else {
//       alert('Incorrect username or password');
//     }
//   };

//   const handleLogout = () => {

//     localStorage.removeItem('isAdminLoggedIn');
//     navigate('/'); 
//   };


//   const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

//   return (
//     <div>
//       {!isAdminLoggedIn ? (
//         <Button variant="text" color="secondary" onClick={handleOpen}     startIcon={<CgLogIn />}>
//           Admin Login
//         </Button>
//       ) : (
//         <Button variant="text" color="secondary" onClick={handleLogout}     startIcon={<CgLogOut />}>
//           Logout
//         </Button>
//       )}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Admin Login</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Username"
//             type="text"
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Password"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleLogin}>Login</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminLoginButton;


// AdminLoginButton.js
// import React, { useState } from 'react';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { CgLogIn, CgLogOut } from 'react-icons/cg';
// import { useAuth } from './PrivateRoutes/AuthContext';

// const AdminLoginButton = () => {
//   const [open, setOpen] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const { authToken, login, logout } = useAuth();

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleLogin = () => {
//     // Simulating login with a hardcoded condition
//     if (username === 'a' && password === 'a') {
//       const newAuthToken = 'your_generated_auth_token'; // Replace with actual token
//       login(newAuthToken);
//       setOpen(false); // Close the login dialog
//       navigate('/admin');
//     } else {
//       alert('Incorrect username or password');
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <div>
//       {!authToken ? (
//         <Button variant="text" color="secondary" onClick={handleOpen} startIcon={<CgLogIn />}>
//           Admin Login
//         </Button>
//       ) : (
//         <Button variant="text" color="secondary" onClick={handleLogout} startIcon={<CgLogOut />}>
//           Logout
//         </Button>
//       )}

//       {/* Login Dialog */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Admin Login</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Username"
//             type="text"
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Password"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleLogin}>Login</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminLoginButton;











import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CgLogIn} from 'react-icons/cg';
import { useAuth } from '../DataBaseConfig/AuthContext';

const AdminLoginButton = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    await login(username, password);// Wait for the login to complete
    setUsername('');
    setPassword('');
    setOpen(false);
    navigate('/admin'); // Redirect to the admin page after successful login

  };



  return (
    <div>

        <Button variant="text" color="secondary" onClick={handleOpen} startIcon={<CgLogIn />}>
          Admin Login
        </Button>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminLoginButton;
