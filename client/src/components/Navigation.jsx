import * as FaIcons from 'react-icons/fa'
import * as IconName from 'react-icons/gi'
import useStore from '../context/zustand'
import {useNavigate} from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Navigation = ({logo, username}) => {
  const navigate = useNavigate()
  const {logout} = useStore()

  const handleLogout = () => {
    logout()
    localStorage.removeItem("userData")
    navigate('/')
  }

  return (
    <header className="bg-dark text-light">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-header px-2">
            <h5>
              {logo} <IconName.GiChatBubble />
            </h5>
          </div>
          <div className="inline">
            <p>Welcome {username}</p>
            <FaIcons.FaUserAlt />
            <button onClick={handleLogout} className="btn btn-transparent text-light">
              Sign out
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation