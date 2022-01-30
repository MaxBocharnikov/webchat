import React, {useState} from 'react';
import "./styles/index.scss";

const socket = new WebSocket("ws://localhost:5000/");

let userName;
let id;

socket.onopen = () => {
    userName = prompt('Как к вам обращаться, сэр?');
    id = Date.now() + 'id';
};

socket.onClose = () => {
    alert('Подключение потеряно');
};

const App = () => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    socket.onmessage = event => {
        const message = JSON.parse(event.data);
        setMessages([...messages, message]);
    }

    const onSend = event => {
        event.preventDefault();
        const payload = {
            id,
            userName,
            message: text,
            date: Date.now(),
        }
        socket.send(JSON.stringify({
            event: 'chat-message',
            payload
        }));
        setText('');
    }

    console.log(messages)
    return (
        <div className='wrapper'>
            <h1 className='title'>Это чат</h1>
            <div className='chatWindow'>
                <div className="messages">
                    {messages.map(m => (
                        <div key={m.date} className={`message ${m.id === id ? 'own-message' : ''}`}>
                            <span className='name'>
                                {m.id === id ? 'Вы' : m.userName}:
                            </span>
                            <span className='text'>{m.message}</span>
                        </div>
                    ))}
                </div>
                <form onSubmit={onSend}>
                    <input
                        type="text"
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />
                </form>
            </div>
        </div>
    )
};

export default App;