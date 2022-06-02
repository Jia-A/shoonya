import "../styles/sidebar.css";

const Sidebar = () =>{
    return (
        <aside className="sidebar-items">
            <ul className="items">
                <li className="side-item"><span><i className="fas fa-compass"></i></span>Explore</li>
                <li className="side-item"><span><i className="fas fa-list"></i></span>Playlist</li>
                <li className="side-item"><span><i className="fas fa-thumbs-up"></i></span>Liked Videos</li>
                <li className="side-item"><span><i className="fas fa-clock"></i></span>Watch Later</li>
                <li className="side-item"><span><i className="fas fa-history"></i></span>History</li>
            </ul>
        </aside>
    );
}

export { Sidebar }