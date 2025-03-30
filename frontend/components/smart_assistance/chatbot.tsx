"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { marked } from "marked";
import Image from "next/image";
import { Paperclip, Image as ImageIcon, Send, TrendingUp, MapPin, Wrench, BatteryWarning } from 'lucide-react';

import styles from "./chatbot.module.css";
import markdownStyles from "./chatbot_markdown_render.module.css";


interface Message {
  type: "user" | "bot";
  content: string;
  files?: File[];
  images?: File[];
}

interface Card {
  text: string;
  icon: React.ElementType;
}

export default function Chatbot() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setShowChat(
      messages.length > 0 || fileNames.length > 0 || imageFiles.length > 0
    );
  }, [messages, fileNames, imageFiles]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageClick2 = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles: File[] = [];
    const newImages: File[] = [];

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    setIsTyping(true);
    if (
      inputValue.trim() !== "" ||
      fileNames.length > 0 ||
      imageFiles.length > 0
    ) {
      const userMessage: Message = {
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
        fileNames.forEach((file) => {
          if (file.type === 'application/pdf') {
            formData.append(`pdfs`, file);
          }
        });

        // Handle image files
        imageFiles.forEach((image) => {
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

        const botResponse: Message = {
          type: "bot",
          content: response.data.response
        };
        setMessages(prev => [...prev, botResponse]);
      } catch (error: any) {
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
        const errorResponse: Message = {
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

  const removeFile = (index: number, type: "file" | "image") => {
    if (type === "file") {
      setFileNames((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else if (type === "image") {
      setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        {/* Navigation content */}
      </div>
      <div className={styles.mainContainer}>
        <div className={`${styles.initialChat} ${showChat ? styles.hidden : ""}`}>
          <div className={styles.greet}>
            <div>
              <span>Hello, I'm energyAI</span>
            </div>
            <div className={styles.subtext}>How can I help you today?</div>
          </div>
          <div className={styles.cards}>
            {([
              { text: "How much can I save with solar energy?", icon: TrendingUp },
              { text: "Which solar panel is best for my location?", icon: MapPin },
              { text: "How do I maintain my solar panels?", icon: Wrench },
              { text: "Why is my solar panel efficiency low?", icon: BatteryWarning }
            ] as Card[]).map((card, index) => (
              <div key={index} className={styles.card}>
                <div>{card.text}</div>
                {React.createElement(card.icon, { size: 24 })}
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.chatContainer} ${showChat ? styles.show : ""}`}>
          <div className={styles.messages}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${styles[message.type]}`}>
                {message.type === "user" && (
                  <div className={styles.userMessage}>
                    {/* Files and images */}
                    {message.files?.map((file, fileIndex) => (
                      <div
                        key={fileIndex}
                        style={{
                          padding: "8px",
                          marginRight: "auto", /* Align files/images to the left */
                        }}
                      >
                        <Paperclip size={18} style={{ marginRight: "5px" }} />
                        <span>{file.name}</span>
                      </div>
                    ))}
                    {message.images?.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        style={{
                          padding: "8px",
                          marginRight: "auto", /* Align images to the left */
                        }}
                      >
                        <Image
                          src={URL.createObjectURL(image)}
                          alt="Upload"
                          width={200}
                          height={200}
                          style={{ marginRight: "5px" }}
                        />
                      </div>
                    ))}
                    {/* User message content */}
                    <span
                      style={{
                        padding: "10px",
                        borderRadius: "15px",
                        backgroundColor: "#D3F9D8", // Light green
                        color: "black", // Ensure black font color
                      }}
                    >
                      {message.content}
                    </span>
                  </div>
                )}
                {message.type === "bot" && (
                  <div className={styles.botMessage}>
                    {/* Bot message content */}
                    <div
                      className={`${styles.markdownContent} ${markdownStyles.markdownRenderer}`}
                      dangerouslySetInnerHTML={{ __html: marked(message.content.trim()) }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.searchBoxContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a prompt here"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className={styles.inputActions}>
            <Paperclip
              size={24}
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <ImageIcon
              size={24}
              onClick={handleImageClick2}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Send
              size={24}
              onClick={handleSendMessage}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}