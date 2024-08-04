import React from 'react';
import Navbar from './Navbar'; // Example Navbar component import
import Footer from './footer'; // Example Footer component import
import Wrapper from './wrapper'; // Example Wrapper component import
import '../index.css'; // Example CSS import for global styles

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <Wrapper>
        {children} {/* Render children inside Wrapper */}
      </Wrapper>
      <Footer />
    </div>
  );
};

export default Layout;
