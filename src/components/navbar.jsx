import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../styles/navbar.css";
import { Sidebar } from "./sidebar";



const Navbar = () =>{
const [ sidebarShow, setSidebarShow ] = useState(false);
const { token, logoutHandler } = useAuth();
return (
<div className="main-nav">
    <nav className="nav-cont">
        <section className="nav-left">
            <div className="brand-title">
                <NavLink to="/" className="link-style">
                    <h3 className="brand-name">Shoonya</h3>
                </NavLink>
                <p className="brand-quote">Everything started with nothing</p>
            </div>
        </section>
        <div className="nav-buttons">
            {token ?
            (
            <NavLink to="/" className="link-style">
                <button className="nav-btn" onClick={logoutHandler}><i
                        className="fad fa-sign-out fa-2x nav-icon"></i></button>
            </NavLink>
            ) :
            (
            <NavLink to="/login" className="link-style">
                <button className="nav-btn"><i className="fad fa-sign-in fa-2x nav-icon"></i></button>
            </NavLink>
            )
            }

            { sidebarShow === true ?
            (
            <button className="nav-btn ham" onClick={()=> setSidebarShow(false)}><i
                    class="fas fa-rocket fa-2x nav-icon"></i></button>
            ) :

            (
            <button className="nav-btn ham" onClick={()=> setSidebarShow(true)}><i
                    className="fas fa-stars fa-2x nav-icon"></i></button>
            )
            }
        </div>
    </nav>
    { sidebarShow && (
    <div className="">
        <Sidebar />
    </div>
    )
    }
</div>

);
}

export { Navbar };