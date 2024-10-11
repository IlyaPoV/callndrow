import React, { useState, useEffect, useRef } from 'react';

// Функция форматирования времени
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Возвращает дату и время в локальном формате
};

const Chat = ({ messages, sendMessage, isConnected, currentUser }) => {
    const [localMessage, setLocalMessage] = useState('');
    const lastMessageRef = useRef(null); // Реф для последнего сообщения

    // Прокрутка к последнему сообщению при обновлении messages
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.ctrlKey || e.metaKey || e.shiftKey) {
                e.preventDefault();
                setLocalMessage((prevMessage) => prevMessage + '\n');
            } else {
                e.preventDefault();
                sendMessage(localMessage);
                setLocalMessage('');
            }
        }
    };

    const textValueChangeHandler = (e) => {
        setLocalMessage(e.target.value);
    };

    const renderMessageWithLinks = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/gi;
    
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line.split(urlRegex).map((part, i) =>
                    urlRegex.test(part) ? (
                        <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={styles.link}>
                            {part}
                        </a>
                    ) : (
                        part
                    )
                )}
                <br />
            </React.Fragment>
        ));
    };
    
    return (
        <div style={styles.chatContainer}>
            <div style={styles.messagesContainer}>
                {messages.map((msg, index) => {
                    const isCurrentUser = msg.username === currentUser;
                    const isLastMessage = index === messages.length - 1;

                    return (
                        <div
                            key={index}
                            ref={isLastMessage ? lastMessageRef : null}
                            style={{
                                ...styles.message,
                                ...(isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage),
                            }}
                        >
                            <strong>{msg.username}:</strong> {renderMessageWithLinks(msg.message)}
                            <div style={styles.timestamp}>
                                {formatTimestamp(msg.timestamp)} {/* Отображаем дату и время */}
                            </div>
                        </div>
                    );
                })}
            </div>
            <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
                <textarea
                    rows="3"
                    value={localMessage}
                    onChange={textValueChangeHandler}
                    onKeyDown={handleKeyDown}
                    disabled={!isConnected}
                    placeholder={isConnected ? 'Enter your message...' : 'Connecting...'}
                    style={styles.input}
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
        marginLeft: 'auto',
    },
    otherUserMessage: {
        backgroundColor: '#e0e0e0',
        color: 'black',
    },
    timestamp: {
        fontSize: '12px',
        color: '#666',
        marginTop: '5px',
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
    link: {
        color: '#0645AD',
        textDecoration: 'underline',
    },
};

export default Chat;
