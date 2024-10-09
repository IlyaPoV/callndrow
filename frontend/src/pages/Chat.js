const Chat = ({ messages, sendMessage, message, setMessage, isConnected }) => {
    return (
      <div>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.username}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!isConnected} // Отключаем ввод, если соединение отсутствует
          />
          <button onClick={sendMessage} disabled={!isConnected}>
            Send
          </button>
        </div>
      </div>
    );
  };
  
  export default Chat;
  