import { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

import { Header } from 'antd/es/layout/layout';
import HomeCard from '../../components/HomeCard';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  getCompare,
  getHostelById,
  selectHostels,
} from '../../redux/hostel/slice';
import { Post } from '../../models';
import Link from 'next/link';

const cx = classNames.bind(styles);

interface CompareProps {}

type TextCompare = {
  home1: any;
  field: string;
  home2: any;
  isLessGood: boolean;
};

const Compare: FC<CompareProps> = () => {
  const router = useRouter();
  const id1 = router.query.id1 as string;
  const id2 = router.query.id2 as string;

  const [text, setText] = useState<TextCompare[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { compareHostel1, compareHostel2, loading, error } =
    useSelector(selectHostels);

  useEffect(() => {
    if (id1 && id2) {
      dispatch(getCompare({ post1: id1, post2: id2 }));
    }
  }, [dispatch, id1, id2]);

  useEffect(() => {
    setText([
      {
        home1: compareHostel1?.cost,
        field: 'Giá',
        home2: compareHostel2?.cost,
        isLessGood: true,
      },
      {
        home1: compareHostel1?.capacity,
        field: 'Sức chứa',
        home2: compareHostel2?.capacity,
        isLessGood: false,
      },
      {
        home1: compareHostel1?.area,
        field: 'Diện tích',
        home2: compareHostel2?.area,
        isLessGood: false,
      },
      {
        home1: compareHostel1?.deposit || 0,
        field: 'Tiền cọc',
        home2: compareHostel2?.deposit || 0,
        isLessGood: true,
      },
      {
        home1: compareHostel1?.electricityPrice || 0,
        field: 'Tiền điện',
        home2: compareHostel2?.electricityPrice || 0,
        isLessGood: true,
      },
      {
        home1: compareHostel1?.waterPrice || 0,
        field: 'Tiền nước',
        home2: compareHostel2?.waterPrice || 0,
        isLessGood: true,
      },
      {
        home1: compareHostel1?.parkingPrice || 0,
        field: 'Tiền xe',
        home2: compareHostel2?.parkingPrice || 0,
        isLessGood: true,
      },
      {
        home1: compareHostel1?.serviecPrice || 0,
        field: 'Tiền dịch vụ',
        home2: compareHostel2?.serviecPrice || 0,
        isLessGood: true,
      },
      {
        home1: compareHostel1?.utilities?.length || 0,
        field: 'Số tiện ích',
        home2: compareHostel2?.utilities?.length || 0,
        isLessGood: false,
      },
    ]);
  }, [loading]);

  const CheckWorse = (home1: string, home2: string, isLessGood: boolean) => {
    if (parseInt(home1) == parseInt(home2)) {
      return '';
    } else if (
      (parseInt(home1) > parseInt(home2) && isLessGood) ||
      (parseInt(home1) < parseInt(home2) && !isLessGood)
    ) {
      return 'home1';
    } else {
      return 'home2';
    }
  };
  return (
    <>
      <section className={cx('__container', '__active')}>
        <div className={cx('__video')}></div>
        <div className={cx('__tab')}>
          <div className={cx('__statsSection', '__active', '__wrapper')}>
            <h3 className={cx('__header')}>So sánh nhà</h3>
            <table className={cx('__statsTable')}>
              <thead>
                <tr className={cx('__statsTeamBlock')}>
                  <th className="pl-1">
                    <div className={cx('__statsTeamText')}>
                      <HomeCard hostel={compareHostel1} />
                    </div>
                  </th>
                  <th className="w-[15%]">VS</th>
                  <th className="pr-1">
                    <div className={cx('__statsTeamText')}>
                      <HomeCard hostel={compareHostel2} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {text.map((x: any) => {
                  return (
                    <tr className={cx('__statsTeamContent')}>
                      <td>
                        <div className="items-center ">
                          {x.field !== 'PTS' ? (
                            <>
                              <p
                                className={
                                  CheckWorse(x.home1, x.home2, x.isLessGood) ===
                                  'home1'
                                    ? `${cx('worse')} mr-2 `
                                    : 'mr-2'
                                }
                              >
                                <span className="text-[18px] font-bold leading-[20px]">
                                  {x.home1}
                                </span>
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                className={
                                  CheckWorse(x.home1, x.home2, x.isLessGood) ===
                                  'home1'
                                    ? `${cx('worse')} col-span-5 `
                                    : ''
                                }
                              >
                                <span className="text-[18px] font-bold leading-[20px]">
                                  {x.home1}
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <p className="text-[18px] text-black font-normal leading-[20px]">
                          {x.field}
                        </p>
                      </td>
                      <td className="">
                        <div className=" items-center  ">
                          {x.field !== 'PTS' ? (
                            <>
                              <p
                                className={
                                  CheckWorse(x.home1, x.home2, x.isLessGood) ===
                                  'home2'
                                    ? `${cx('worse')}  `
                                    : ''
                                }
                              >
                                <span className="text-[18px] font-bold leading-[20px]">
                                  {x.home2}
                                </span>
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                className={
                                  CheckWorse(x.home1, x.home2, x.isLessGood) ===
                                  'home2'
                                    ? `${cx('worse')}  col-span-5 `
                                    : ''
                                }
                              >
                                <span className="text-[18px] font-bold leading-[20px]">
                                  {x.home2}
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Compare;
