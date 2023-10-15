import { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

const cx = classNames.bind(styles);

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
  const [data, setData] = useState();
  const [ws, setWS] = useState<WebSocket>();

  useEffect(() => {
    const newWS = new WebSocket(
      'ws://localhost:8080/chat?user_id=d6877823-ea96-425c-9b76-2c1dd9e42e48'
    );
    newWS.onerror = (err) => console.error(err);
    newWS.onopen = () => setWS(newWS);
    newWS.onmessage = (msg) => setData(JSON.parse(msg.data));
  }, []);

  console.log(data);
  return (
    <>
      <h1>Chat app</h1>
    </>
  );
};

export default Chat;
