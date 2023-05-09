import {useState} from 'react'
import { Link } from "react-router-dom";
import * as IconName from 'react-icons/gi'
import "./register.scss";
import {http} from '../../config/axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const handleChange = (e) => {
    const {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      if (!user.userName || !user.email || !user.password) {
        setError(true);
        setErrMsg("Please fill up the form");

        setTimeout(() => {
          setError(false);
        }, 3000);
      }

      const response = await http.post('/register', user)

      console.log(response.data)
      console.log(response.data.message)
      navigate('/')

    } catch(err) {
      setError(true)
      setErrMsg(err.response.data.message)
      console.log(err.response.data.message)

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }


  return (
    <div className="container d-flex flex-column justify-content-center text-center align-items-center mx-auto">
      {error && <p className="text-danger">{errMsg}</p>}
      <form onSubmit={handleSubmit} className="bg-light shadow rounded p-5">
        <h3>
          Chat App <IconName.GiChatBubble />
        </h3>
        <div className="form-group">
          <label className="form-label" htmlFor="userName">
            Username
          </label>
          <input className="form-control" name="userName" type="text" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="form-control" name="email" type="email" onChange={handleChange}/>
        </div>
        <div className="form-group mt-2">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input className="form-control" name="password" type="password" onChange={handleChange}/>
        </div>
        <div className="d-flex flex-column mt-2">
          <button className="btn btn-primary my-2" type="submit">
            Register
          </button>
          <Link to="/">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
