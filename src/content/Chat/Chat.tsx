import { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import ChatList from './components/chatList/ChatList';
import ChatContent from './components/chatContent/ChatContent';
import UserProfile from './components/userProfile/UserProfile';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Condition, getDocument } from '../../firebase/service';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { getMyProfile, selectUsers } from '../../redux/user/slice';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

interface ChatProps {}

export type Room = {
  keyUserId: string;
  id: string;
  name: string;
  createdAt: any;
}

const Chat: FC<ChatProps> = () => {
  const router = useRouter();
  const roomId = router.query.id as string;
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState();
  const { profile } = useSelector(selectUsers);
  const [rooms, setRooms] = useState<Room[]>([])


  useEffect(() => {
    (async ()  => {
      if(profile && profile.id){
        const condition: Condition = {
          fieldName: 'keyUserId',
          operator: '==',
          value: profile.id
        }
        const data = await getDocument('rooms',condition)
        const roomsRes = [] as any
        data.forEach(doc => roomsRes.push(doc.data()))
        console.log(roomsRes)
        setRooms(roomsRes)
      }
    })()
  }, [profile]);

  useEffect(() => {
      dispatch(getMyProfile());
  }, [dispatch]);


  console.log(data);
  return (
    <>
      <div className={cx('wrapper')}>
        <ChatList rooms={rooms}/>
        <ChatContent data={data} />
        <UserProfile />
      </div>
    </>
  );
};

export default Chat;
