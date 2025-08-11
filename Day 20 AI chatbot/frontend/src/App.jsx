import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      timestamp: new Date().toLocaleTimeString(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    socket.emit("user-message", inputText);
    setInputText("");
  };

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("ai-response", (response) => {
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        timestamp: new Date().toLocaleTimeString(),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    });

    return () => socketInstance.disconnect();
  }, []);

  return (
    <div className="container">
      <div className="chat-container">
        <div className="chat-header">
          <h1>
            Sarthi <span>GPT</span>
          </h1>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="no-messages">Start a conversation...</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-content">
                  <span className="message-text">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </span>
                  <span className="message-timestamp">{msg.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="input-field"
          />
          <button
            onClick={handleSendMessage}
            className="send-button"
            disabled={inputText.trim() === ""}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
