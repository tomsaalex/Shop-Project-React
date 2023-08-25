import {useAuth} from "./AuthProvider";
import {Navigate, useNavigate} from "react-router";

export const ProtectedRoute = ({ children }) => {
    const { user, authToken } = useAuth();
    const navigate = useNavigate();

    if(!user)
    {
        return <Navigate to="/login" />
    }
    return children;
};

export const UnloggedRoute = ({ children }) => {
    const { user, authToken } = useAuth();
    if(user)
    {
        return <Navigate to="/"/>
    }
    return children;
}