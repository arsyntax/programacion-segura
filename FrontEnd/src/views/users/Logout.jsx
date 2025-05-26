import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authentication token from localStorage
    sessionStorage.removeItem("authToken");

    // Navigate to the home page
    navigate("/home");

    // Reload the page to reflect the logout state
    window.location.reload();
  };

  return (
    <form className="d-inline-block ml-4" onSubmit={(e) => e.preventDefault()}>
      <button className="btn btn-danger" type="button" onClick={handleLogout}>
        Logout
      </button>
    </form>
  );
}

export default Logout;