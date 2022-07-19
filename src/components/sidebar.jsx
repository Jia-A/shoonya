import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";


const Sidebar = () =>{

return (
<aside className="sidebar-items">
    <ul className="items">
        <NavLink to="/homepage" className="link-style">
            <li className="side-item"><span><i className="fad fa-compass side-icon "></i></span>Explore</li>
        </NavLink>

        <NavLink to="/playlists" className="link-style">
            <li className="side-item"><span><i className="fad fa-list side-icon"></i></span>Playlists</li>
        </NavLink>

        <NavLink to="/liked" className="link-style">
            <li className="side-item"><span><i className="fad fa-thumbs-up side-icon"></i></span>Liked</li>
        </NavLink>
        <NavLink to="/watchLater" className="link-style">
            <li className="side-item"><span><i className="fad fa-clock side-icon"></i></span>Watch Later</li>
        </NavLink>
        <NavLink to="/history" className="link-style">
            <li className="side-item"><span><i className="fad fa-history side-icon"></i></span>History</li>
        </NavLink>

    </ul>
</aside>
);
}

export { Sidebar }