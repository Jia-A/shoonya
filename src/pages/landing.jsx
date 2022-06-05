import "../styles/landing.css"
import "../root.css"
import { Link } from "react-router-dom";
const Landing = () =>{
return (
<div className="App">
    <div className="body-cont">
        <img src="images/universe-g276597298_1920.jpg" alt="main-page-img" className="hero-img" />
        <div className="content-box">
            <h1 className="welcome-note">Welcome to Shoonya</h1>
            <Link to="/homepage" className="landing-style">
            <button className="landing-btn">Explore...</button>
            </Link>
        </div>
    </div>
</div>
);

}

export { Landing };