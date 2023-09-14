import { FC } from "react";
import classNames from 'classnames/bind';
import styles from './HostelPostList.module.scss';
import HostelList from "../../components/HostelList";

const cx = classNames.bind(styles);

interface HostelListProps {
}

const HostelPostList: FC<HostelListProps> = () => {
    return <HostelList title="" />;
}

export default HostelPostList;