import React, {useContext} from "react";
import { NavLink, useHistory } from "react-router-dom";
 import { AuthContext } from "../../context/AuthContext";
export const Navbar = () => {

    const{isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const history = useHistory();

  const logout = () => {
    setIsAuthenticated(false);
    history.push("/login")
  };
 
  //för demo innan context är satt
 
  const authNavbar = () => {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/account">Account</NavLink>
        <button onClick={logout}>Logout</button>
      </>
    );
  };
 
  const unAuthNavbar = () => {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </>
    );
  };
 
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid black",
      }}
    >
      {isAuthenticated ? authNavbar() : unAuthNavbar()}
    </div>
  );
};