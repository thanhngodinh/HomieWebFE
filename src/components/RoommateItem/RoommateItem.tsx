import { FC,useLayoutEffect } from 'react';
import Link from 'next/link';
import { GenCurrecy } from '../../utils/func';
import { Avatar, Button, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { getMyProfile, selectUsers } from '../../redux/user/slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Condition, addDocument, getDocument, getDocumentWithRoomsIsExist } from '../../firebase/service';
import { useRouter } from 'next/router';

interface RoommateItemProps {
  id: string;
  img: string;
  name: string;
  costFrom: number;
  costTo: number;
  province: string;
  district: string[];
  gender?: string;
}

const RoommateItem: FC<RoommateItemProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { profile } = useSelector(selectUsers);

  useLayoutEffect(() => {
    dispatch(getMyProfile());
    
  }, [dispatch]);
  const handleChatWithAuthor = async (author: {
    id: string;
    name: string;
    avatar: string;
  }) => {
    if (!profile) return;
    try {
      console.log(75, author);
      const roomIsExist = await getDocumentWithRoomsIsExist(profile, author);
      if (roomIsExist.empty) {
        console.log(58,profile, author)

        const docRef = await addDocument('rooms', {
          keyUserId: profile.id,
          keyUserName: profile.name,
          keyUserAvatar: profile.avatar,
          id: author.id,
          name: author.name,
          avatar: author.avatar,
        });
        console.log(58,profile, author)
        if (docRef) router.push(`/chat/${docRef.id}`);
      } else {
        roomIsExist.forEach((doc) => {
          console.log(48,doc)
          router.push(`/chat/${doc.id}`);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="relative grid phone:grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 xxl:grid-cols-6 content-center  y-4 bg-slate-100 rounded-xxl px-8 md:h-72 sm:h-96 phone:h-96 mb-3">
        <div className="cursor-pointer m-auto">
          <Link href={'roommates/' + props.id}>
            <Avatar
              size={{ xs: 140, sm: 140, md: 140, lg: 140, xl: 160, xxl: 200 }}
              src={props.img}
              shape={'circle'}
            />
          </Link>
        </div>
        <div className="sm:col-span-2 md:col-span- lg:col-span-4 xl:col-span-4 xxl:col-span-4 sm:pl-16 phone:pl-0  my-auto">
          <Link href={'/users/' + props.id}>
            <h2 className="phone:text-base sm:text-xl  xl:text-2xl xxl:text-2xl mb-2 text-primary light cursor-pointer my-auto">
              {props.name}
            </h2>
          </Link>
          <div className=" flex items-center">
            <hr className="w-full" />
          </div>
          <div className="text-base  mb-1">
            <span className="font-semibold">Tỉnh: </span>
            <span>{props.province}</span>
          </div>
          <div className="text-base  mb-1">
            <span className="font-semibold">Quận/Huyện: </span>
            {props.district.map((d) => {
              return <Tag key={d}>{d}</Tag>;
            })}
          </div>
          <div className="text-base mb-1">
            <span className="font-semibold">Giá thuê: </span>
            <span>
              {GenCurrecy(props.costFrom)} - {GenCurrecy(props.costTo)}
            </span>
          </div>
          <div className="text-base mb-1">
            <span className="font-semibold">Giới tính: </span>
            <span>{props.gender}</span>
          </div>
        </div>
        <div className="h-full flex items-center col-span-1 text-right mb-6 cursor-pointer m-auto phone:absolute phone:block phone:h-auto phone:right-0 phone:mr-3 sm:absolute sm:block sm:h-auto sm:right-0 sm:mr-3 md:flex md:h-full md:relative ">

            <button
              type="button"
              onClick={() => handleChatWithAuthor({
                id: props.id,
                name: props.name,
                avatar: props.img
              })}
              className=" button button__fill button__fill-medium text__normal phone:hidden sm:hidden md:block"
            >
              Chat
            </button>

          <Link href="/chat">
            <div className="text-[#786fa6] sm:block md:hidden">
              <FontAwesomeIcon icon={faMessage} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoommateItem;