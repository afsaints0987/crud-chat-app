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

const sampleFriends = [
  {
    id: 1,
    username: "joe123",
  },
  {
    id: 2,
    username: "kitty541",
  },
  {
    id: 3,
    username: "jondoe365",
  },
];


const Dashboard = () => {
  const [loginUser, setLoginUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem("userData")
    setLoginUser(JSON.parse(user))
  },[])

  if(!loginUser){
    return
  }

  return (
    <Container fluid className="no-gutters">
      <Navigation logo="Chat App" username={loginUser.userName} />
      <Row className="no-gutters">
        <Col className="no-gutters">
          <Sidebar />
        </Col>
        <Col className="no-gutters">
          <Contacts contactUser={sampleFriends}/>
        </Col>
        <Col xs={8} className="no-gutters">
          <Chatbox username="gigi543" socket={socket} />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default Dashboard