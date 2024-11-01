import "./FarmEChatbot.css";
import { assets } from "../../assets/smart-assistant/assets";
import "./MarkdownRenderer.css"; // Import the Markdown styles
import React, { useEffect, useState } from "react";
import axios from 'axios';
import ReactMarkdown from "react-markdown";  // Import the library


const PDFRAGChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setShowChat(messages.length > 0);
  }, [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    setIsTyping(true);
    if (inputValue.trim() !== "") {
      const userMessage = {
        type: "user",
        content: inputValue,
      };
      setMessages([...messages, userMessage]);
      setInputValue("");
  
      try {
        const response = await axios.post('http://localhost:8001/ask_question/', {
          question: inputValue  // Changed from user_question to question
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        const botResponse = {
          type: "bot",
          content: response.data.response
        };
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error("Error details:", error.response?.data);
        const errorResponse = {
          type: "bot",
          content: `Error: ${error.response ? JSON.stringify(error.response.data) : error.message}`
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="main">
      <div className="nav"></div>
      <div className="main-container">
        <div
          className="initial-chat"
          style={{ display: showChat ? "none" : "block" }}
        >
          <div className="greet">
            <p>
              <span>Hi, I'm Database Energy Assistant</span>
            </p>
            <p>How can I assist you today?</p>
          </div>
          <div className="cards">
            <div className="card">
              <p>What is 2019-11-20 report summary</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
              <p>What is the total rainfall on 2019-11-20</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
              <p>Please tell me the summary on November</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
              <p>Send me the report on the November</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
        </div>
        <div
          className="chat-container"
          style={{ display: showChat ? "block" : "none", minHeight: "55vh" }}
        >
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.type === "user" && (
                  <div className="user-message" style={{ textAlign: "right" }}>
                    <p>
                      <span
                        style={{
                          padding: "10px",
                          borderRadius: "15px",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        {message.content}
                      </span>
                    </p>
                  </div>
                )}
                {message.type === "bot" && (
                  <div className="bot-message">
                    {/* Trim the message content before passing to ReactMarkdown */}
                    <div className="markdown-content">
                      <ReactMarkdown>{message.content.trim()}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="margin-top-30" style={{ marginTop: "30%" }}>
          {isTyping && <div className="loading">Loading...</div>}
          <div className="search-box">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a prompt here"
            />
            <div className="input-actions">
              <img src={assets.mic_icon} alt="Microphone" />
              <img
                src={assets.send_icon}
                alt="Send"
                onClick={handleSendMessage}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFRAGChatbot;
