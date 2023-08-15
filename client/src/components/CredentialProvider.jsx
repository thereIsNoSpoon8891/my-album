import { createContext, useState } from "react";
import axios from 'axios'

const CredentialContext = createContext()

const axiosCredentials = axios.create()

axiosCredentials.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const CredentialContextProvider = props => {

    const defaultValues = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || ""
    }

    const [user, setUser] = useState(defaultValues)

    const signUp = credentials => {
        axios.post("/api/authenticate/signup", credentials)
            .then(res => {
                const {token, user} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                    setUser(prevUser => ({
                        ...prevUser,
                        user,
                        token
                    }))
            })
            .catch(err => console.log(err))
    }

    const userLogin = credentials => {
        axios.post("api/authenticate/login", credentials)
        .then(res => {console.log(res.data)
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUser(prevUser => ({
                ...prevUser,
                user,
                token
            }))
        })
            .catch(err => console.log(err))
    }



    return(
        <CredentialContext.Provider
        value={{
            signUp,
            userLogin,
            user

        }}
        >
            {props.children}
        </CredentialContext.Provider>

    )
}

export { CredentialContextProvider, CredentialContext}