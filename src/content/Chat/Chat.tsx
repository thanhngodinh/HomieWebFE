import { FC, useEffect, useLayoutEffect, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import ChatList from './components/chatList/ChatList';
import ChatContent from './components/chatContent/ChatContent';
import UserProfile from './components/userProfile/UserProfile';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Condition, getDocument, getDocumentMutipleCondition } from '../../firebase/service';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { getMyProfile, getUserById, selectUsers } from '../../redux/user/slice';
import { useSelector } from 'react-redux';
import useFirestore from '../../firebase/useFirestore';
import { WhereFilterOp } from 'firebase/firestore';

const cx = classNames.bind(styles);

interface ChatProps {}

export type Room = {
  roomId: string
  keyUserId: string;
  keyUserName: string;
  keyUserAvatar: string;
  id: string;
  name: string;
  avatar: string;
  createdAt: any;
  chats?: Chat[]
}

type Chat = {
  id: string;
  name: string;
  message: string;
  avatar: string;
  createdAt: any;
}

const Chat: FC<ChatProps> = () => {
  const router = useRouter();
  const roomId = router.query.id as string;
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState();
  const { profile, user } = useSelector(selectUsers);
  const [rooms, setRooms] = useState<Room[]>([])
  const [roomSelected, setRoomSelected] = useState<Room>()

  const condition1 = useMemo(()=>{
    return {
      fieldName: 'keyUserId',
      operator: '==' as WhereFilterOp,
      value: profile?.id || ""
    }
  },[profile?.id])
  
  const condition2 = useMemo(()=>{
    return {
      fieldName: 'id',
      operator: '==' as WhereFilterOp,
      value: profile?.id || ""
    }
  },[profile?.id])

  const document = useFirestore('rooms',condition1,condition2,'roomId',roomId, profile?.id )
  console.log(58,document)

  useEffect(() => {
    if(document){
      console.log(61,document)
      setRooms(document)
      const roomSelect = getRoomsById(document,roomId)
      if(roomSelect){
        setRoomSelected(roomSelect)
      }
    }
  }, [document]);

  // useEffect(() => {
  //   (async ()  => {
  //     if(profile && profile.id){
  //       const condition1: Condition = {
  //         fieldName: 'keyUserId',
  //         operator: '==',
  //         value: profile.id
  //       }
  //       const condition2: Condition = {
  //         fieldName: 'id',
  //         operator: '==',
  //         value: profile.id
  //       }
  //       const data = await getDocumentMutipleCondition('rooms',condition1,condition2)
  //       const roomsRes = [] as any
  //       data.forEach(doc => roomsRes.push({roomId: doc.id , ...doc.data()}))
  //       console.log(roomsRes)
  //       setRooms(roomsRes)
  //       const roomSelect = getRoomsById(roomsRes,roomId)
  //       if(roomSelect){
  //         setRoomSelected(roomSelect)
  //       }
  //     }
  //   })()
  // }, [profile]);

  useLayoutEffect(() => {
      dispatch(getMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if(roomSelected){
      const targetUser = roomSelected.id !== profile.id ? roomSelected.id :  roomSelected.keyUserId
      dispatch(getUserById(targetUser || ""));
    }
}, [roomSelected]);

  const getRoomsById = (rooms: Room[],id: string) => {
    return rooms?.find(room => room.roomId === id)
  }

  console.log(data);
  return (
    <>
      <div className={cx('wrapper')}>
        <ChatList rooms={rooms} user={user}/>
        <ChatContent data={roomSelected} user={user} me={profile}/>
        <UserProfile info={user}/>
      </div>
    </>
  );
};

export default Chat;
