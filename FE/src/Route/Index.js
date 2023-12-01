import { Route, Switch , Routes} from "react-router-dom";
import LoginForm from "../components/loginForm";
import SignupForm from "../components/signUp";
import ForgotPasswordForm from "../components/forgotPassword";

const Routes = () => {
    return (<>
    <Routes >
        <Route path="/" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/forget-password" element={<ForgotPasswordForm />} />


    </Routes>
    </> )
}