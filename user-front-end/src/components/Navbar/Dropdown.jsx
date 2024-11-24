import React, { useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from "react-router-dom";
import "./Dropdown.css";
import "./heading.css";

function Dropdown() {
  const [istoggle, setToggle] = useState(false);

  function toggle() {
    setToggle(!istoggle);
    console.log("HII");
  }

  return (
    <>
      <div className="accountIcon">
        <AccountCircleOutlinedIcon style={{
          fontSize: "40px"
        }} onClick={toggle} />
      </div>
      {istoggle && (
        <div className="toggleoption_div" >
          <Link to="/account" className="toggleoption">Profile</Link>
          <Link to="/orders" className="toggleoption">Orders</Link>
          <Link to="/sign out" className="toggleoption">Sign Out</Link>
        </div>
      )}

    </>
  );
}

export default Dropdown;
