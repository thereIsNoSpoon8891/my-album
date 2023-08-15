import { useContext, useState } from "react"
import { CredentialContext } from "./CredentialProvider"




const Authenticate = () => {

const {signUp, userLogin} = useContext(CredentialContext)

const defaultValues = {
    username: "",
    password: "",
    verifyPassword: ""
}

const [inputs, setInputs] = useState(defaultValues)

const [toggleForms, setToggleForms] = useState(false)

const handleChange = e => {
    const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
}

const handleSignUp = (e) => {
    e.preventDefault()
        if (inputs.verifyPassword === inputs.password){
            signUp(inputs)
                setInputs(defaultValues)
        } else if(inputs.verifyPassword !== inputs.password){
            alert("Passwords do NOT match")
        }
}

const handleLogIn = (e) => {
    e.preventDefault()
        userLogin(inputs)
            setInputs(defaultValues)
}
    return(
        <div className='login-form--container'>
        <h1>Welcome to My Album</h1>
        {toggleForms ?

        <form className="form">
            <input 
            type='text'
            name='username'
            placeholder='User Name'
            className='inputs'
            value={inputs.username}
            onChange={handleChange}
            />

            <input
            type='password'
            name='password'
            placeholder='Password'
            className='inputs'
            value={inputs.password}
            onChange={handleChange}
            />

            <input
            type='password'
            name='verifyPassword'
            placeholder='Verify Password'
            className='inputs'
            value={inputs.verifyPassword}
            onChange={handleChange}
            />
            <button 
            onClick={handleSignUp}
            className='form--button'
            >
                Sign Up
            </button>
        </form>
        :
        <form className="form">

        <input 
        type='text'
        name='username'
        placeholder='User Name'
        className='inputs'
        value={inputs.username}
        onChange={handleChange}
        />

        <input
        type='password'
        name='password'
        placeholder='Password'
        className='inputs'
        value={inputs.password}
        onChange={handleChange}
        />
        <button 
        className='form--button'
        onClick={handleLogIn}
        >
            Login
        </button>
    </form>}
        {toggleForms ?
        <p onClick={() => setToggleForms(prev => !prev)}>Already a memeber? Click <u>here</u> to log in</p>
        :
        <p onClick={() => setToggleForms(prev => !prev )}>Not a memeber? Click <u>here</u> to sign up</p>}
        {/* <h4>Error message here</h4> */}
    </div>
    )
}

export default Authenticate