import {useAuth} from "./AuthProvider";
import {Navigate, useNavigate} from "react-router";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if(!user)
    {
        return <Navigate to="/login" />
    }
    return children;
};

export const UnloggedRoute = ({ children }) => {
    const { user } = useAuth();
    if(user)
    {
        return <Navigate to="/"/>
    }
    return children;
}