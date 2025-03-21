import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/AuthSlice";
import { FaHome, FaProductHunt, FaListAlt, FaUsers, FaSignOutAlt } from "react-icons/fa"; // Import icons

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Define your styles object
  const inStyle = {
    sidebar: {
      width: "250px",
      height: "100vh",
      backgroundColor: "#2c3e50",
      color: "#ecf0f1",
      padding: "20px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
    },
    list: {
      listStyleType: "none",
      padding: "0",
      margin: "0",
    },
    listItem: {
      marginBottom: "15px",
    },
    link: {
      color: "#ecf0f1",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
      padding: "10px",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
    },
    linkHover: {
      backgroundColor: "#34495e",
    },
    icon: {
      marginRight: "10px",
    },
    logoutButton: {
      backgroundColor: "#e74c3c",
      color: "#ecf0f1",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    logoutButtonHover: {
      backgroundColor: "#c0392b",
    },
  };

  return (
    <div style={inStyle.sidebar}>
      <h2 style={inStyle.heading}>Dashboard</h2>
      <ul style={inStyle.list}>
        <li style={inStyle.listItem}>
          <Link to="/dashboard" style={inStyle.link}>
            <FaHome style={inStyle.icon} /> Home
          </Link>
        </li>
        <li style={inStyle.listItem}>
          <Link to="/dashboard/products" style={inStyle.link}>
            <FaProductHunt style={inStyle.icon} /> Manage Products
          </Link>
        </li>
        <li style={inStyle.listItem}>
          <Link to="/dashboard/orders" style={inStyle.link}>
            <FaListAlt style={inStyle.icon} /> View Orders
          </Link>
        </li>
        <li style={inStyle.listItem}>
          <Link to="/dashboard/approve-vendors" style={inStyle.link}>
            <FaUsers style={inStyle.icon} /> Approve Vendors
          </Link>
        </li>
        <li style={inStyle.listItem}>
          <Link to="/dashboard/manage-users" style={inStyle.link}>
            <FaUsers style={inStyle.icon} /> Manage Users
          </Link>
        </li>
      </ul>
      <button onClick={handleLogout} style={inStyle.logoutButton}>
        <FaSignOutAlt style={inStyle.icon} /> Logout
      </button>
    </div>
  );
};

export default Sidebar;


