import React,{useState} from 'react';
import { Link } from 'react-router-dom';
//import 'font-awesome/css/font-awesome.min.css'; // For icons
import './navbar.css'; // For styling
//U2669165 GAJJAR
 export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Football Manager</h1>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" exact activeClassName="active-link">Home</Link>
        </li>
        <li>
          <Link to="/add-team" activeClassName="active-link">Add Team</Link>
        </li>
        <li>
          <Link to="/update-team" activeClassName="active-link">Update Team</Link>
        </li>
        <li>
          <Link to="/display-data" activeClassName="active-link">Display Data</Link>
        </li>
        <li>
          <Link to="/delete-team" activeClassName="active-link">Delete Team</Link>
        </li>
        <li>
          <Link to="/total-year" activeClassName="active-link">Totals For Year</Link>
        </li>
        <li>
          <Link to="/query-teams" activeClassName="active-link">Query Teams</Link>
        </li>
        <li>
          <Link to="/view" activeClassName="active-link">View data</Link>
        </li>
      </ul>
    </nav>
  );
};

