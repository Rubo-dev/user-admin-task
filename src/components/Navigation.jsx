import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <div className="container">
        <Navbar.Brand href="#home" className="text-white">
          React is the best framework
        </Navbar.Brand>
      </div>
    </Navbar>
  );
};

export default Navigation;
