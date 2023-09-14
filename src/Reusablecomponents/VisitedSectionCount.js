import React, { useState, useEffect } from 'react';

const CountSection = ({ countHeading, subheading, content }) => {
    const [count, setCount] = useState(0);
    const targetValue = countHeading;
    const speed = 100; 

    useEffect(() => {

        const handleScroll = () => {            
            const section = document.getElementById('custom-courses-section');
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

            if (isVisible) {
               
                if (count < targetValue) {
                    const interval = setInterval(() => {
                        setCount(prevCount => Math.min(prevCount + 1, targetValue));
                    }, speed);
                 
                    if (count === targetValue - 1) {
                        clearInterval(interval);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [count, targetValue]); 


    return (
        <div id="custom-courses-section">
            <h2 className="righthead">{count}+</h2>
            <h4 className="rightsubhead">{subheading}</h4>
            <p className="rightcontent">{content}</p>
        </div>
    );


};

export default CountSection;


// import React, { useState, useEffect } from 'react';

// const CountSection = ({ countHeading, subheading, content }) => {
//   const [count, setCount] = useState(0);
//   const targetValue = countHeading;
//   const speed = 100; // Delay in milliseconds

//   useEffect(() => {
//     const handleScroll = () => {
//       // Check if the section is in the viewport
//       const section = document.getElementById('custom-courses-section');
//       const rect = section.getBoundingClientRect();
//       const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

//       if (isVisible && count < targetValue) {
//         const interval = setInterval(() => {
//           setCount(prevCount => Math.min(prevCount + 1, targetValue));
//         }, speed);

//         // Clear the interval when the count reaches the target value
//         if (count === targetValue - 1) {
//           clearInterval(interval);
//         }
//       }
//     };

//     // Add event listener to listen for scroll events
//     window.addEventListener('scroll', handleScroll);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [count, targetValue]);

//   return (
//     <div id="custom-courses-section">
//       <h2 className="righthead">{countHeading}</h2>
//       <h4 className="rightsubhead">{subheading}</h4>
//       <p className="rightcontent">{content}</p>
//     </div>
//   );
// };

// export default CountSection;













