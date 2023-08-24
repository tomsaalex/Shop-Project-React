import {createContext, useContext, useMemo} from "react";
import {useNavigate} from "react-router";
import {useLocalStorage} from "./UseLocalStorage";
import {useDispatch} from "react-redux";
import {apiSlice} from "../api/apiSlice";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useLocalStorage("user_id", null);
    const [authToken, setToken] = useLocalStorage("user_token", null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async(userToken, userId) => {
        console.log("Setting ID to: " + userId);
        setToken(userToken);
        setUserId(userId);
        navigate("/account");
    };

    const logout = () => {
        console.log("Logging out");
        setToken(null);
        setUserId(null);
        dispatch(apiSlice.util.resetApiState());
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user: userId, authToken, login, logout
        }), [userId, authToken]

    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};

