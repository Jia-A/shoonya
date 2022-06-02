import "../styles/landing.css"
const Landing = () =>{
    return (
        <div className="App">
            <div className="body-cont">
                <img src="images/universe-g276597298_1920.jpg" alt="main-page-img" className="hero-img" />
                <div className="content-box">
                    <h1 className="welcome-note">Welcome</h1>
                    <button className="landing-btn">Explore</button>
                </div>
            </div>
        </div>
    );

}

export { Landing };