import {useState} from 'react'
import {Link} from 'react-router-dom'
import * as IconName from 'react-icons/gi'
import './login.scss'
import { useLogin } from '../../hooks/useLogin'


const Login = () => {
  const { userLogin, error, errorMessage } = useLogin();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await userLogin(loginUser)
  };


  return (
    <div className="container d-flex flex-column justify-content-center text-center align-items-center mx-auto">
      {error && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-light shadow rounded p-5">
        <h3>
          Chat App <IconName.GiChatBubble />
        </h3>
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
            Login
          </button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login