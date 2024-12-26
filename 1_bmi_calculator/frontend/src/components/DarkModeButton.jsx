import React from 'react'
import "./DarkModeButton.css";

const DarkModeButton = ({ onToggle }) => {

  return (
    <>
      <label className="switch">
        <input type="checkbox" onChange={onToggle} />
        <span className="slider"></span>
      </label>
    </>
  )
}

export default DarkModeButton