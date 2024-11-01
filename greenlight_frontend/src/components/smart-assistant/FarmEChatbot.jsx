import "./FarmEChatbot.css";
import "./MarkdownRenderer.css"; // Import the Markdown styles
import { assets } from "../../assets/smart-assistant/assets";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import ReactMarkdown from "react-markdown";  // Import the library



const FarmEChatbot = () => {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setShowChat(
      messages.length > 0 || fileNames.length > 0 || imageFiles.length > 0
    );
  }, [messages, fileNames, imageFiles]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageClick2 = () => {
    imageInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = [];
    const newImages = [];
  
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        newImages.push(file);
      } else if (file.type === "application/pdf") {
        newFiles.push(file);
      } else {
        console.warn(`Unsupported file type: ${file.type}`);
      }
    });
  
    setFileNames((prevFileNames) => [...prevFileNames, ...newFiles]);
    setImageFiles((prevImageFiles) => [...prevImageFiles, ...newImages]);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    setIsTyping(true);
    if (
      inputValue.trim() !== "" ||
      fileNames.length > 0 ||
      imageFiles.length > 0
    ) {
      const userMessage = {
        type: "user",
        content: inputValue,
        files: fileNames,
        images: imageFiles,
      };
      setMessages([...messages, userMessage]);
      setInputValue("");
  
      try {
        const formData = new FormData();
        formData.append('text_input', inputValue);
  
        // Handle PDF files
        fileNames.forEach((file, index) => {
          if (file.type === 'application/pdf') {
            formData.append(`pdfs`, file);
          }
        });
  
        // Handle image files
        imageFiles.forEach((image, index) => {
          if (image.type.startsWith('image/')) {
            formData.append(`images`, image);
          }
        });
  
        console.log('FormData contents:');
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }
  
        console.log('Sending request to:', 'http://localhost:8000/process_input/');
        const response = await axios.post('http://localhost:8000/process_input/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        const botResponse = {
          type: "bot",
          content: response.data.response
        };
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Error in handleSendMessage:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        const errorResponse = {
          type: "bot",
          content: `Error: ${error.response ? JSON.stringify(error.response.data) : error.message}`
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsTyping(false);
        setFileNames([]);
        setImageFiles([]);
      }
    }
  };

  const removeFile = (index, type) => {
    if (type === "file") {
      setFileNames((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else if (type === "image") {
      setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="main">
      <div className="nav">
        {/* <p>FarmAI</p> */}
        {/* <img src={assets.user_icon} alt="" /> */}
      </div>
      <div className="main-container">
        <div
          className="initial-chat"
          style={{ display: showChat ? "none" : "block" }}
        >
          <div className="greet">
            <p>
              <span>Hello, I'm farmAI</span>
            </p>
            <p>How can I help you today?</p>
          </div>
          <div className="cards">
            <div className="card">
              <p>Where should I plan to build an agrivoltaic farm?</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
              <p>What plant should I plant with the solar panel?</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
              <p>What can agrivoltaic help me?</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
              <p>What location is good for agrivoltaic farm?</p>
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
                      {message.files.map((file, fileIndex) => (
                        <div
                          key={fileIndex}
                          style={{
                            padding: "8px",
                            marginLeft: "auto",
                          }}
                        >
                          <img
                            src={assets.file_icon}
                            alt="Upload"
                            style={{ width: "18px", marginRight: "5px" }}
                          />
                          <span>{file.name}</span>
                        </div>
                      ))}
                      {message.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          style={{
                            padding: "8px",
                            marginLeft: "auto",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Upload"
                            style={{ width: "200px", marginRight: "5px" }}
                          />
                        </div>
                      ))}
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
                    {/* Use ReactMarkdown to render the markdown content */}
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
          {fileNames.length > 0 && (
            <div className="file-preview">
              {fileNames.map((file, index) => (
                <div key={index} className="file-item">
                  <span>{file.name}</span>
                  <button onClick={() => removeFile(index, "file")}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {imageFiles.map((image, imgIndex) => (
            <div key={imgIndex} className="file-item">
              <div
                style={{
                  padding: "8px",
                  marginLeft: "auto",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Upload"
                  style={{ width: "100px", marginRight: "5px" }}
                />
              </div>
              <button onClick={() => removeFile(imgIndex, "image")}>
                Remove
              </button>
            </div>
          ))}
          <div className="search-box">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a prompt here"
            />
            <div className="input-actions">
              <img
                src={assets.file_icon}
                alt="Upload"
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <img
                src={assets.gallery_icon}
                alt="Gallery"
                onClick={handleImageClick2}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                ref={imageInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <img src={assets.mic_icon} alt="Microphone" />
              <img
                src={assets.send_icon}
                alt="Send"
                onClick={handleSendMessage}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate information. Please verify with a
            reliable source before making any decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmEChatbot;