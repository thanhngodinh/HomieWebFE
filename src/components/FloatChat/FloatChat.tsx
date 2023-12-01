import { FC, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import { GenCurrecy } from '../../utils/func';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { likePost } from '../../redux/hostel/slice';
import { Checkbox, FloatButton } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { getMyProfile, selectUsers } from '../../redux/user/slice';
import { useSelector } from 'react-redux';
import { Condition, getDocumentMutipleCondition, getDocumentWithFloatChat } from '../../firebase/service';


interface FloatChatProps {
  
}

const FloatChat: FC<FloatChatProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, user } = useSelector(selectUsers);
	const [rooms, setRooms] = useState<any[]>([])
	const [isClient, setIsClient] = useState(false)



  console.log(22,rooms)

  useEffect(() => {
    dispatch(getMyProfile());
    }, [dispatch]);

	useEffect(() => {
		setIsClient(true)
	}, []);

  useEffect(() => {
  	(async ()  => {
  	  if(profile && profile.id){
  	    const data = await getDocumentWithFloatChat('room_operations',profile.id)
  	    const roomsRes = [] as any
  	    data && data.forEach(doc => 
					roomsRes.push({...doc.data(),roomId: doc.id})
				)
  	    console.log(roomsRes)
  	    setRooms(roomsRes)
  	  }
  	})()
	}, [profile]);

  // return (
	// 	<div>
  //   	<FloatButton icon={<CommentOutlined />} shape="circle" badge={{ dot: rooms && rooms.length !==0 }} style={{ right: 24 }} />

	// 	</div>
  // );
	if(isClient) return (
		<Link href={`/chat/${rooms[0] ? rooms[0].roomId :  ""}`}>
    		<FloatButton icon={<CommentOutlined />} shape="circle" badge={{ dot: rooms && rooms.length !==0 }} style={{ right: 24 }} />

		</Link>
	)  
	return <></>
};

export default FloatChat;
