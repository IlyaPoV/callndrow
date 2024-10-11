import React, { useState } from 'react';

const Chat = ({ messages, sendMessage, isConnected, currentUser }) => {
  const [localMessage, setLocalMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (localMessage.trim()) {
      sendMessage(localMessage);
      setLocalMessage('');
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => {
          const isCurrentUser = msg.username === currentUser;

          return (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage),
              }}
            >
              <strong>{msg.username}:</strong> {msg.message}
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSendMessage} style={styles.form}>
        <input
          type="text"
          value={localMessage}
          onChange={(e) => setLocalMessage(e.target.value)}
          disabled={!isConnected}
          style={styles.input}
          placeholder={isConnected ? "Type your message..." : "Connecting..."}
        />
        <button type="submit" disabled={!isConnected} style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '500px',
    width: '400px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '20px',
    paddingRight: '10px',
    maxHeight: '60vh',
    borderBottom: '1px solid #eee',
  },
  message: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  currentUserMessage: {
    backgroundColor: '#4CAF50',
    color: 'white',
    marginLeft: 'auto', // Выровнять по правому краю
  },
  otherUserMessage: {
    backgroundColor: '#e0e0e0',
    color: 'black',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Chat;
