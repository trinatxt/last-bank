// Wrapper.js
// import React from 'react';

// const Wrapper = ({ children }) => {
//   return (
//     <div className="bg-beigelight">
//       {children}
//     </div>
//   );
// };

// export default Wrapper;

// Wrapper.js
import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar component file path
import Footer from './footer'; // Example Footer component import


const Wrapper = ({ children }) => {
  return (
    <div className="bg-3">
      <Navbar /> {/* Include Navbar component */}
      <div className="container mx-auto"> {/* Assuming Tailwind CSS for centering content */}
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
