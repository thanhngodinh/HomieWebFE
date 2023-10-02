import { FC } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './SubHeader.module.scss';


const cx = classNames.bind(styles);

interface SubHeaderProps  {
  title?: string
  items?: Array<{id: string, name: string}>
}

const SubHeader: FC<SubHeaderProps> = ({title, items}) => {
    const router = useRouter()
    const param = router.pathname
    const params = param.split("/")
    const current = params[params.length-1]
    // const ahead = params[params.length-2]
    return (
      <header className="w-screen h-fit grid grid-cols-9 my-auto pt-4 bg-[#f4f4f4]">
        <div className="col-start-2 col-span-7">
          <div className="text-[32px] text__main-color mb-4">
              {title}
          </div>
          <div className="flex justify-start gap-4 text-base text__main-color">
            {items && items.map((item) => 
              <div className={`${current === item.id ? cx('active'): ''} pb-4`}> 
                <Link  href={`${item.id}`}>{item.name}</Link>
              </div>
            )}
          </div>
        </div>

        
      </header>
    );
};

SubHeader.defaultProps = {
  title: '',
  items: []
}

export default SubHeader;
