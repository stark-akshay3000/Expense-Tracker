import Home from "../src/component/Home";
// import "./App.css";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ErrorModal from "./component/ErrorModal";
import Spinner from "./component/Spinner";
function App() {
    const { user, isLoading } = useSelector((state) => state.auth);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route path="/DashBoard" element={<Home />} />

                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
            {isLoading && <Spinner />}
        </>
    );
}

export default App;
