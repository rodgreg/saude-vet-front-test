import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export function AppRoutes() {

    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Login />}/>
                <Route path={"/home"} element={<Home />}/>
                <Route path={"/login"} element={<Login />}/>
                <Route path={"/home/:page"} element={<Home />}/>
            </Routes>
        </Router>
    )
}