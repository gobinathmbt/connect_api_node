import React, { createContext, useState } from 'react';

const EnquiryFormDataContext = createContext();

const EnquiryFormDataProvider = ({ children }) => {
    const [enquiryFormData, setEnquiryFormData] = useState({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const updateEnquiryFormData = (data) => {
        setEnquiryFormData(data);
        setIsFormSubmitted(true);
    };

    return (
        <EnquiryFormDataContext.Provider value={{ enquiryFormData, isFormSubmitted, updateEnquiryFormData }}>
            {children}
        </EnquiryFormDataContext.Provider>
    );
};

export { EnquiryFormDataContext, EnquiryFormDataProvider };
