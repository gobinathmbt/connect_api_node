import React from 'react';

const EligibilityTable = () => {
  const eligibilityData = [
    ['Theory', '75%', '40%', 'Recommendation'],
    ['Lab', '75%', '40%', 'Recommendation'],
    ['Communication', '75%', '40%', 'Recommendation'],
    ['Aptitude', '75%', '40%', 'Not Applicable'],
  ];

  return (
    <table className="table table-striped " style={{marginTop:"60px"}}>
      <thead>
        <tr style={{backgroundColor:"orange",fontSize:"20px",color:"white"}}>
          <th>Criteria</th>
          <th>Minimum Attendance</th>
          <th>Minimum Internal Score</th>
          <th>Mock and Assessment Interview</th>
        </tr>
      </thead>
      <tbody>
        {eligibilityData.map((row, index) => (
          <tr key={index}>
            {row.map((cell, index) => (
              <td key={index} style={{fontSize:"20px"}}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EligibilityTable;
