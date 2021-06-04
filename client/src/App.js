import './App.css';
import { useEffect, useState } from 'react';
import { socket } from './socket';

const App = () => {
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    socket.emit('send message', { name, message: value });
  };

  useEffect(() => {
    socket.on('receive message', (message) => {
      setMessageList((messageList) => messageList.concat(message));
    });
  }, []);

  return (
    <div className="App">
      <section className="chat-list">
        {messageList.map(({ name, message }, i) => (
          <div key={i} className="message">
            <p className="username">{name.toUpperCase()}</p>
            <p className="message-text">{message}</p>
          </div>
        ))}
      </section>
      <form className="chat-form" onSubmit={(e) => submit(e)}>
        <div className="chat-inputs">
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="유저이름"
          />
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="메세지입력하기"
          />
        </div>
        <button type="submit">입력하기</button>
      </form>
    </div>
  );
};

export default App;
