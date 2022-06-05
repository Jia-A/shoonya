import { NavLink } from "react-router-dom";
import "../styles/navbar.css";


const Navbar = ({sidebar, setSidebar}) =>{
    return (
        <nav className="nav-cont">
            <section className="nav-left">
            { sidebar === true ? (
                <button className="nav-btn ham" onClick={()=> setSidebar(false)}><i class="fas fa-rocket fa-2x nav-icon"></i></button> ) : 
                ( <button className="nav-btn ham" onClick={()=> setSidebar(true)}><i className="fas fa-stars fa-2x nav-icon"></i></button> )
            }
            <div className="brand-title">
            <h3 className="brand-name">Shoonya</h3>
            <p className="brand-quote">Everything started with nothing</p>
            </div>
            </section>
            <NavLink to="/login" className="link-style">
            <button className=" nav-btn"><i className="fas fa-sign-in fa-2x nav-icon"></i></button>
            </NavLink>
        </nav>
    );
}

export { Navbar };