import {createContext, useContext, useMemo} from "react";
import {useNavigate} from "react-router";
import {useLocalStorage} from "./UseLocalStorage";
import {useDispatch} from "react-redux";
import {apiSlice} from "../api/apiSlice";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [authToken, setToken] = useLocalStorage("user", null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async(data) => {
        setToken(data);
        navigate("/account");
    };

    const logout = () => {
        setToken(null);
        dispatch(apiSlice.util.resetApiState());
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user: authToken, login, logout
        }), [authToken]

    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};

