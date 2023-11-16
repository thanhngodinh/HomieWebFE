import { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import ChatList from './components/chatList/ChatList';
import ChatContent from './components/chatContent/ChatContent';
import UserProfile from './components/userProfile/UserProfile';
import ReconnectingWebSocket from 'reconnecting-websocket';

const cx = classNames.bind(styles);

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
  const [data, setData] = useState();
  // const [ws, setWS] = useState<WebSocket>();

  // useEffect(() => {
  //   const newWS = new WebSocket(
  //     'ws://localhost:8080/chat?user_id=d6877823-ea96-425c-9b76-2c1dd9e42e48'
  //   );
  //   newWS.onerror = (err) => console.error(err);
  //   newWS.onopen = () => setWS(newWS);
  //   newWS.onmessage = (msg) => setData(JSON.parse(msg.data));
  // }, []);

useEffect(() => {
  const url = 'ws://localhost:8080/chat?user_id=d6877823-ea96-425c-9b76-2c1dd9e42e48'; // Thay URL bằng URL của máy chủ WebSocket của bạn
  const ws = new ReconnectingWebSocket(url);

  ws.addEventListener('open', (event) => {
    console.log('Kết nối WebSocket đã được thiết lập.');
  });

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    setData(message);
    console.log('Nhận tin nhắn từ máy chủ:', message);
    // Hiển thị tin nhắn trên giao diện của ứng dụng
  });

  // Xử lý các sự kiện khác
  ws.send('Dữ liệu của bạn');

  return () => {
    ws.close(); // Đảm bảo đóng kết nối khi component bị unmount
  };
}, []);

  console.log(data);
  return (
    <>
      <div className={cx('wrapper')}>
        <ChatList />
        <ChatContent data={data} />
        <UserProfile />
      </div>
    </>
  );
};

export default Chat;
