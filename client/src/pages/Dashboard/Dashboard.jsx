import Chatbox from "../../components/Chatbox"
import Contacts from "../../components/Contacts"
import Footer from "../../components/Footer"
import Navigation from "../../components/Navigation"
import Sidebar from "../../components/Sidebar"
import {socket} from '../../config/socket'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import './dashboard.scss'
import { useEffect, useState } from "react"
import {http} from '../../config/axios'


const Dashboard = () => {
  const [loginUser, setLoginUser] = useState(null)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])

  const handleUser = async (id) => {
    try {
      const data = await http.get(`user/${id}`)
      setUser(data.data)
    } catch(err){
      console.log(err)
    }
  }

  
  useEffect(() => {
    const user = localStorage.getItem("userData");
    setLoginUser(JSON.parse(user));
  },[])

  useEffect(() => {
    const getUsers = async () => {
      const contacts = await http.get("/users");
      setUsers(contacts.data);
    };
    getUsers();

  }, []);

  if(!loginUser || !users){
    return null
  }

  return (
    <Container fluid className="no-gutters">
      <Navigation logo="Chat App" username={loginUser.userName} />
      <Row className="no-gutters">
        <Col lg={2} className="no-gutters">
          <Sidebar />
        </Col>
        <Col lg={3} className="no-gutters">
          <Contacts contactUser={users} loggedInUser={loginUser} handleUser={handleUser}/>
        </Col>
        <Col lg={7} className="no-gutters">
          <Chatbox username={user.userName} socket={socket} />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default Dashboard