import {useState} from "react";

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try{
            const value = window.localStorage.getItem(keyName);
            if(value){
                console.log(keyName + " " + value);
                return JSON.parse(value);
            }
            else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err)
        {
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        try {
            console.log(keyName + " " + newValue);
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {}
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};