import React from 'react';
import "../Reusablecomponents/display.css"
import ApplyNow from '../Reusablecomponents/ApplyForm'
import EnquiryForm from '../Reusablecomponents/EnquiryForm'
import ServiceCorporatesForm from './ServiceCorporatesForm';
import ServiceInstituteForm from './ServiceInstituteForm';
import ServiceStudentsForm from './ServiceStudentsForm';
import ServiceEmployeeForm from './ServiceEmployeeForm';


const Textcard1 = ({ imageSrc, heading, content }) => {
  return (
    <div className="mainbox" id='displaycomponent'>
      <div className="subbox">
        <div className="col-sm-5" style={{ padding: 0 }}>
          <img className="image" src={imageSrc} alt="" />
        </div>
        <div className="col-sm-7">
          <div>
            <h4 className="heading">
              {heading}
            </h4>
          </div>
          <div>
            <p className="content">
              {content}
            </p>
          </div>
          <div className="middle">
            <div className="div">
              <ApplyNow btnname="Apply Now" btnvar="outlined" btncolor="secondary" />
            </div>
            <div className="div">
              <EnquiryForm btnname="Enquiry Now" btnvar="outlined" btncolor="secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Textcard2 = ({ imageSrc, heading, content }) => {
  return (
    <div className="mainbox" id='displaycomponent'>
      <div className="subbox">

        <div className="col-sm-7">
          <div>
            <h3 className="heading">
              {heading}
            </h3>
          </div>
          <div>
            <p className="content">
              {content}
            </p>
          </div>
          <div className="middle">
            <div className="div ">
              <ApplyNow btnname="Apply Now" btnvar="outlined" btncolor="secondary" />
            </div>
            <div className="div ">
              <EnquiryForm btnname="Enquiry Now" btnvar="outlined" btncolor="secondary" />
            </div>
          </div>
        </div>
        <div className="col-sm-5" style={{ padding: 0 }}>
          <img className="image" src={imageSrc} alt="" />
        </div>
      </div>
    </div>
  );
};

const Textcard3 = ({ imageSrc, heading, content }) => {
  return (
    <div className="mainbox" id='displaycomponent'>
      <div className="subbox">

        <div className="col-sm-7">
          <div>
            <h3 className="heading">
              {heading}
            </h3>
          </div>
          <div>
            <p className="content">
              {content}
            </p>
          </div>
          <div className="middle">
            <div className="div">
              <ApplyNow btnname="Apply Now" btnvar="outlined" btncolor="secondary" />
            </div>
            <div className="div">
              <EnquiryForm btnname="Enquiry Now" btnvar="outlined" btncolor="secondary" />
            </div>
          </div>

        </div>
        <div className="col-sm-5" style={{ padding: 0 }}>
          <img className="image" src={imageSrc} alt="" />
        </div>
      </div>
    </div>
  );
};


const Textcard4 = ({ imageSrc, heading, content }) => {
  return (
    <div className="mainbox" id='displaycomponent'>
      <div className="subbox">
        <div className="col-sm-5" style={{ padding: 0 }}>
          <img className="image" src={imageSrc} alt="" />
        </div>
        <div className="col-sm-7">
          <div>
            <h3 className="heading">
              {heading}
            </h3>
          </div>
          <div>
            <p className="content">
              {content}
            </p>
          </div>
          <div className="middle">
            <div className="div">
              <ApplyNow btnname="Apply Now" btnvar="outlined" btncolor="secondary" />
            </div>
            <div className="div">
              <EnquiryForm btnname="Enquiry Now" btnvar="outlined" btncolor="secondary" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};




const Textcard5 = ({ imageSrc, heading, content,formType  }) => {

  let FormComponent;

  // Determine the appropriate form component based on the formType prop
  switch (formType) {
    case 'corporate':
      FormComponent = ServiceCorporatesForm;
      break;
    case 'institute':
      FormComponent = ServiceInstituteForm ;
      break;
    case 'students':
      FormComponent = ServiceStudentsForm ;
      break;
    case 'employee':
      FormComponent = ServiceEmployeeForm ;
      break;
    default:
      FormComponent = null;
  }



  return (
    <div className="mainbox" id='displaycomponent'>
      <div className="subbox">
        <div className="col-sm-5" style={{ padding: 0 }}>
          <img className="image" src={imageSrc} alt="" />
        </div>
        <div className="col-sm-7">
          <div>
            <h4 className="heading">
              {heading}
            </h4>
          </div>
          <div>
            <p className="content"  style={{textAlign:"center"}}>
              {content}
            </p>
          </div>
          {FormComponent && (
            <div className="middle">
              <div className="div">
                <FormComponent />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const Textcard6 = ({ imageSrc, heading, content,formType }) => {

  let FormComponent;

  // Determine the appropriate form component based on the formType prop
  switch (formType) {
    case 'corporate':
      FormComponent = ServiceCorporatesForm;
      break;
    case 'institute':
      FormComponent = ServiceInstituteForm ;
      break;
    case 'students':
      FormComponent = ServiceStudentsForm ;
      break;
    case 'employee':
      FormComponent = ServiceEmployeeForm ;
      break;
    default:
      FormComponent = null;
  }




  return (
    <div className="mainbox" id='displaycomponent'>
      <div className="subbox">

        <div className="col-sm-7">
          <div>
            <h3 className="heading">
              {heading}
            </h3>
          </div>
          <div>
            <p className="content" style={{textAlign:"center"}}>
              {content}
            </p>
          </div>
          {FormComponent && (
            <div className="middle">
              <div className="div">
                <FormComponent />
              </div>
            </div>
          )}
        </div>
        <div className="col-sm-5" style={{ padding: 0 }}>
          <img className="image" src={imageSrc} alt="" />
        </div>
      </div>
    </div>
  );
};


export { Textcard1, Textcard2, Textcard3, Textcard4, Textcard5, Textcard6 };