import React from 'react';

export const LoaderContext = React.createContext();
export const AuthContext = React.createContext();
export const UserContext = React.createContext();
export const UserProvider = (props) => {
    const [userData, setUserData] = React.useState({})
    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    )
};