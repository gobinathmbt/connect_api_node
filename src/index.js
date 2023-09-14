import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { EnquiryFormDataProvider } from './components/Context';
import { DatabaseProvider } from './DataBaseConfig/Config';
import { AuthProvider } from './DataBaseConfig/AuthContext';
import UnmountComponent from './Unmount';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
  <AuthProvider>
    <BrowserRouter>
      <DatabaseProvider>
        <EnquiryFormDataProvider>
          {/* <UnmountComponent/> */}
          <App />
        </EnquiryFormDataProvider>
      </DatabaseProvider>
    </BrowserRouter>
    </AuthProvider>
  </>
);

reportWebVitals();

