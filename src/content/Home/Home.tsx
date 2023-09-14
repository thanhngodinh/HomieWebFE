import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import HostelList from '../../components/HostelList';
import SuggestItemBasic, {
  SuggestItemBasicProps,
} from '../../components/SuggestItemBasic/SuggestItemBasic';
import { Carousel } from 'antd';

const cx = classNames.bind(styles);

interface HomeProps {
  bgImg: string;
  city: SuggestItemBasicProps[];
}

const Home: FC<HomeProps> = (props) => {
  return (
    <div className="home w-screen bg-slate-100">
      <div className="w-full h-3/5 relative">
        <img className="w-full h-full" src={props.bgImg} />
        <div className="absolute top-1/4 w-full text-center flex justify-center">
          <div className="bg-white rounded-full w-2/5 p-5 light grid grid-cols-12">
            <input className="col-span-11" />
            <div className="col-span-1 pl-6">
              <div className="h-full w-full bg-purple light rounded-full hover:cursor-pointer">
                <SearchIcon fontSize="medium" className="text-white light" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-40 bottom-1/3 grid-flow-row">
          <h1 className="text-6xl text-white">Tìm Home,</h1>
          <h1 className="text-6xl text-white">Tìm Homie</h1>
        </div>
      </div>
      <div className="content-around px-40 p-8">
        <div className="city">
          <h1 className="text-4xl mb-5">Khám phá tại các thành phố</h1>
          <div className="">
            <Carousel autoplay slidesToShow={4}>
              {[
                ...props.city.map((i, index) => {
                  return (
                    <div className="p-2 mb-4">
                      <SuggestItemBasic img={i.img} title={i.title} />
                    </div>
                  );
                }),
              ]}
            </Carousel>
          </div>
        </div>
      </div>
      <HostelList title="Gợi ý của chúng tôi" />
      <HostelList title="Tìm homie chung nhà" />
    </div>
  );
};

Home.defaultProps = {
  bgImg:
    'https://lh3.googleusercontent.com/bX1zQAzOo05wVVEVWG8HauZVI4xkOmZftOKEfIOjXcKt_q5nBD6yfFaXpD83hPVeqyPRifwrzq-BfynzP_-AfwHsJE_dWzGdb5_Mz_M',
  city: [
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Ha Noi',
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'TP HCM',
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Da Nang',
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Can Tho',
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Binh Duong',
    },
  ],
};

export default Home;
