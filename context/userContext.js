
import React, { useState, createContext } from "react";
import { Alert, Spinner } from 'react-bootstrap';

export const UserContext = createContext();

const UserContextProvider = ({ children, usuario }) => {
    const [user, setUser] = useState(usuario);
    const [loadingShow, setLoading] = useState(false);

    const storeUser = user => {
        setUser(user)
    }

    const signIn = (user) => {
        return setUser(user)
    }

    const isLogged = () => {
        let logeado = false
        if (user != null) {
            logeado = true
        } else {
            logeado = false
        }
        return logeado
    }

    const signOut = () => {
        localStorage.removeItem('user')
        window.location.replace('/Login')
        return setUser(null)
    }

    function Loading() {
        return (
            <>
                { (true) &&
                <>
                    <Alert className="alert">
                        <Spinner style={{width:'5em', height: '5em'}} animation="border" />
                        <Alert.Heading>Cargando...</Alert.Heading>
                    </Alert>
                <div className="alertContainer"/>
                </>
                }
            </>
        )
    }

    return (
        <UserContext.Provider value={{ user, storeUser, isLogged, signIn, signOut, Loading, loadingShow, setLoading}} >
            <>
                {children}
            </>
        </UserContext.Provider>
    )
}
export default UserContextProvider;
