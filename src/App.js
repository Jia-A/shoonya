import "./App.css";
import { Homepage } from "./pages/homepage";
import { Landing } from "./pages/landing";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Routes, Route } from "react-router-dom";
import { History } from "./pages/history";
import { Liked } from "./pages/liked";
import { WatchLater } from "./pages/watchLater";
import { PrivateRoute } from "./components/private.jsx";


function App() {
  return (
    <div className="App">
      <Routes>
        {/* Open Routes */}
        <Route path = "/" element = { <Landing/> } />
        <Route path = "/homepage" element = { <Homepage/> } />
        <Route path = "/login" element = { <Login/> } />
        <Route path = "/signup" element = { <Signup/> } />

        {/* Private Routes */}
        <Route element = { <PrivateRoute/>}>
          <Route path = "/history" element = { <History/> } />
          <Route path = "/liked" element = { <Liked/>} />
          <Route path = "/watchLater" element = { <WatchLater/>} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
