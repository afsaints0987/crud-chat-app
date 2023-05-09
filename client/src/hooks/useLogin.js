import useStore from '../context/zustand'
import {http} from '../config/axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const useLogin = () => {
    const {login} = useStore();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const userLogin = async (loginUser) => {
        try {
    
          const response = await http.post("/login", loginUser);
          const userData = await response.data
    
          localStorage.setItem('userData', JSON.stringify(userData))
          login(userData)

          navigate('/dashboard')
          
        } catch (err) {
            setError(true)
            setErrorMessage(err.response.data.message)
            console.log(err.response.data.message)
            
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }

    return {
        userLogin, 
        error,
        errorMessage  
    }
}