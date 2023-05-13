import {useState, useEffect} from 'react'
import * as FaIcons from 'react-icons/fa'
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const Chatbox = ({ username, socket }) => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageReceive, setMessageReceive] = useState([])

    const handleSend = async (e) => {
        e.preventDefault()

        if(currentMessage !== ""){
            const messageData = {
              author: username,
              message: currentMessage,
              time:
                new Date(Date.now()).getHours().toString().padStart(2, "0") +
                ":" +
                new Date(Date.now()).getMinutes().toString().padStart(2, "0")
            };
            await socket.emit("send_message", messageData)
            // setMessageSend((prev) => [...prev, messageData])
            setCurrentMessage("")
        }
    }

    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMessageReceive((prevMessage) => [...prevMessage, data]);
      });
      // cleanup function
      return () => {
        socket.off("receive_message");
      };
    },[socket])

      const sortedMessages = [...messageReceive].sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      );


  return (
    <div>
      <div id="chatbox" className="shadow">
        <div className="chat-header bg-primary ">
          <div className="chat-header-name text-light p-2">
            <p>{username}</p>
          </div>
        </div>
        <div className="chat-body">
          <div className="chat-body-text">
            {sortedMessages.map((list, index) => (
              <div key={index} className="chat-message p-2 w-50">
                <div>
                  <p className="m-0">{list.author}</p>
                  <sup>{list.time}</sup>
                </div>
                <h6 className="p-2 bg-primary rounded  text-light">
                  {list.message}
                </h6>
              </div>
            ))}

          </div>
        </div>
        <div className="chat-footer">
          <div className="chat-input-wrapper">
            <input
              type="text"
              className="chat-input form-control"
              placeholder="Type here..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <div className="d-flex flex-row justify-content-between mt-2 my-1">
              <ul className="list-group list-group-horizontal">
                <li className="list-item text-secondary mx-2">
                  <FaIcons.FaPaperclip />
                </li>
                <li className="list-item text-secondary mx-2">
                  <FaIcons.FaRegFileImage />
                </li>
              </ul>
              <button
                className="chat-input-button btn btn-primary"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
