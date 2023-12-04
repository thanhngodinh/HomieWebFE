import React, { useEffect } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../models';
import { GenAddress, GenCurrecy, GetUtility } from '../../utils/func';
import { useDispatch, useSelector } from 'react-redux';
import { getUtilitiess, selectUtilitiess } from '../../redux/utilities/slice';
import { AppDispatch } from '../../app/store';

const cx = classNames.bind(styles);

type HomeProps = {
  hostel?: Post;
};

const HomeCard = ({ hostel }: HomeProps) => {
  const { listUtilities } = useSelector(selectUtilitiess);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUtilitiess());
  }, [dispatch]);

  return (
    <Link href={'/posts/' + hostel?.id}>
      <div className="relative basis-1/5 group bg-black rounded-md text-white overflow-hidden h-96">
        <button
          type="button"
          className={`${cx(
            'text-center uppercase tracking-wider text-transparent group-hover:text-[#f23333] font-light text-[2rem] leading-[4.25rem] font-[Teko] m-0 z-[5] absolute top-[5%] left-[5%]',
            '_number'
          )}`}
        ></button>
        <div className="hover:cursor-pointer">
          <img
            src={hostel?.imageUrl[0]}
            className="w-full max-w-full h-auto block"
          ></img>
        </div>
        <p
          className={`${cx(
            'cursor-pointer text-center uppercase tracking-wider text-white font-medium text-[3rem] leading-[4.25rem] font-[Teko] m-0 z-[5] absolute top-[2%] right-[2%]',
            '_number'
          )}`}
        >
          {hostel?.capacity}
          {hostel?.capacity && (
            <span className="group-hover:text-white ml-1">
              <FontAwesomeIcon icon={faPerson} />
            </span>
          )}
        </p>
        {/* <div className={`${cx('_logo')}`}>
        <img
          className="h-full object-contain "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png"
        />
      </div> */}

        <div className={`${cx('_playerInfo')}`}>
          <>
            <p
              className={`${cx(
                'font-extrabold text-left !leading-7 text-2xl !ml-0 mb-6 mr-16',
                '_name'
              )}`}
            >
              {hostel?.name}
            </p>
            <div className="text-left font-normal !leading-4 text-xl !ml-0 my-2">
              <span className="uppercase">Địa chỉ:</span>
              <span className="text-xl ml-2">
                {GenAddress(
                  hostel?.street,
                  hostel?.ward,
                  hostel?.district,
                  hostel?.province
                )}
              </span>
            </div>{' '}
            <p className="text-left font-normal !leading-5 text-xl !ml-0 my-2">
              <span className="uppercase">Giá phòng:</span>
              <span className="block font-extrabold my-2">
                {GenCurrecy(hostel?.cost)}
              </span>
            </p>
            <span className="text-left uppercase font-normal !leading-5 text-xl !ml-0 my-2">
              Tiện ích:
            </span>
            <span>
              {hostel?.utilities?.map((utility: string, i: number) => {
                let u = GetUtility(utility, listUtilities);
                return (
                  u && (
                    <span className="!text-left white text-l !leading-5 font-semibold">
                      {u.name +
                        (i != hostel?.utilities?.length - 1 ? ', ' : '')}
                    </span>
                  )
                );
              })}
            </span>
            {/* <p className="text-left uppercase font-normal text-sm !leading-4 text-xl !ml-0 my-2">
            Diện tích:
            <span className="block font-extrabold my-2">{hostel?.area}</span>
          </p> */}
            {/* <p className="text-left uppercase font-normal text-sm !leading-4 text-xl !ml-0 my-2">
            Tiền điện
            <span className="block font-extrabold my-2">
              {GenCurrecy(hostel?.electricityPrice)}
            </span>
          </p>{' '}
          <p className="text-left uppercase font-normal text-sm !leading-4 text-xl !ml-0 my-2">
            Tiền nước
            <span className="block font-extrabold my-2">
              {GenCurrecy(hostel?.waterPrice)}
            </span>
          </p>{' '}
          <p className="text-left uppercase font-normal text-sm !leading-4 text-xl !ml-0 my-2">
            Tiền xe
            <span className="block font-extrabold my-2">
              {GenCurrecy(hostel?.parkingPrice)}
            </span>
          </p>{' '} */}
          </>
        </div>

        {/* {openEditModal && (
        <CreatePlayerModal
          reload={reload}
          setReload={setReload}
          player={player}
          title="Edit Player"
          handleCloseModal={() => setOpenEditModal(false)}
        ></CreatePlayerModal>
      )} */}
      </div>
    </Link>
  );
};

export default HomeCard;
