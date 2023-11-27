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

const cx = classNames.bind(styles);

interface CompareProps {}

type TextCompare = {
  home: any;
  field: string;
  away: any;
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

      setText([
        {
          home: compareHostel1?.cost,
          field: 'Giá',
          away: compareHostel2?.cost,
        },
        {
          home: compareHostel1?.capacity,
          field: 'Sức chứa',
          away: compareHostel2?.capacity,
        },
        {
          home: compareHostel1?.area,
          field: 'Diện tích',
          away: compareHostel2?.area,
        },
        {
          home: compareHostel1?.deposit,
          field: 'Tiền cọc',
          away: compareHostel2?.deposit,
        },
        {
          home: compareHostel1?.electricityPrice,
          field: 'Tiền điện',
          away: compareHostel2?.electricityPrice,
        },
        {
          home: compareHostel1?.waterPrice,
          field: 'Tiền nước',
          away: compareHostel2?.waterPrice,
        },
        {
          home: compareHostel1?.parkingPrice,
          field: 'Tiền xe',
          away: compareHostel2?.parkingPrice,
        },
        {
          home: compareHostel1?.serviecPrice,
          field: 'Tiền dịch vụ',
          away: compareHostel2?.serviecPrice,
        },
        {
          home: compareHostel1?.utilities,
          field: 'Tiện ích',
          away: compareHostel2?.utilities,
        },
      ]);
    }
  }, [dispatch, id1, id2]);

  console.log(compareHostel1, compareHostel2);

  const BetterNow = (home: string, away: string) => {
    if (parseInt(home) > parseInt(away)) {
      return 'home';
    } else if (parseInt(home) === parseInt(away)) {
      return '';
    } else {
      return 'away';
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
                  <th className="pl-4">
                    <a className={cx('__statsTeamText')}>
                      {/* <div className={cx('__statsTeamBadge__block', '__home')}>
                        <img
                          src="https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg"
                          className={cx('__statsTeamBadge__block--adjust')}
                        ></img>
                      </div>
                      Chicago Bulls */}
                      <HomeCard hostel={compareHostel1} />
                    </a>
                  </th>
                  <th className="w-[20%]">VS</th>
                  <th className="pr-4">
                    <a className={cx('__statsTeamText')}>
                      <HomeCard hostel={compareHostel2} />
                    </a>
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
                                  BetterNow(x.home, x.away) === 'home'
                                    ? `${cx('betterNow')} mr-2 `
                                    : 'mr-2'
                                }
                              >
                                <span className="text-[18px] font-bold leading-[20px]">
                                  {x.home}
                                </span>
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                className={
                                  BetterNow(x.home, x.away) === 'home'
                                    ? `${cx('betterNow')} col-span-5 `
                                    : ''
                                }
                              >
                                <span className="text-[18px] font-bold leading-[20px]">
                                  {x.home}
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
                                  BetterNow(x.home, x.away) === 'away'
                                    ? `${cx('betterNow')}  `
                                    : ''
                                }
                              >
                                <span className="text-[18px] font-bold leading-[20px]">
                                  {x.away}
                                </span>
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                className={
                                  BetterNow(x.home, x.away) === 'away'
                                    ? `${cx('betterNow')}  col-span-5 `
                                    : ''
                                }
                              >
                                <span className="text-[18px] font-bold leading-[20px]">
                                  {x.away}
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
