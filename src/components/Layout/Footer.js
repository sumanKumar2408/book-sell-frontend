import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer" style={{position:"relative", bottom: "0", left:"0", right:"0", width:"100%", marginTop:"10px", height:"150px"}}>
      <h1 className="text-center mx-auto">All Right Reserved &copy; </h1>
      <p className="text-center mt-3 mx-auto">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
