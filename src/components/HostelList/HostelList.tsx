import { FC, MouseEvent, useEffect, useState } from 'react';
import HostelItem from '../HostelItem';
import { Post } from '../../models/hostel';
import { GenAddress } from '../../utils/func';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/router';

interface HostelListProps {
  title?: string;
  hostels: Post[];
}

const HostelList: FC<HostelListProps> = ({ title, hostels }) => {
  const router = useRouter();

  const [token, setToken] = useState('');
  const [compare, setCompare] = useState(['', '']);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let value = sessionStorage.getItem('token') || '';
    setToken(value);
  }, []);

  useEffect(() => {
    if (compare[1]) {
      setOpen(true);
    }
  }, [compare[1]]);

  const handleCompare = (checked: boolean, id: string) => {
    if (checked === true && id) {
      if (compare[0]) {
        setCompare([compare[0], id]);
      } else {
        setCompare([id, compare[1]]);
      }
    } else if (checked === false && id) {
      if (compare.includes(id)) {
        setCompare(['', compare[1]]);
      }
    }
  };
  const handleCloseModal = () => {
    setCompare(['', '']);
    setOpen(false);
  };

  const getHostelById = (id: string) => {
    return hostels?.find((h) => h.id === id);
  };

  return (
    <div className="mt-20 w-4/5 mx-auto">
      {title && <h1 className="text-4xl mb-5">{title}</h1>}
      <hr />
      <div className=" mt-6 relative">
        {hostels?.map((item, index) => {
          return (
            <HostelItem
              id={item.id}
              name={item.name}
              img={item.imageUrl[0]}
              size={item.capacity}
              address={GenAddress(
                item.street,
                item.ward,
                item.district,
                item.province
              )}
              cost={item.cost}
              isLiked={item.isLiked}
              token={token}
              handleCompare={handleCompare}
              isCompareChecked={compare.includes(item.id)}
            />
          );
        })}
      </div>
      <Modal
        width={800}
        title="So sánh nhà"
        open={open}
        onOk={undefined}
        okType="primary"
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Quay lại
          </Button>,
          <Button
            className="bg-[#1677ff]"
            key="submit"
            type="primary"
            onClick={() => {
              router.push('/compare/' + compare[0] + '/' + compare[1]);
            }}
          >
            So sánh
          </Button>,
        ]}
      >
        {[getHostelById(compare[0]), getHostelById(compare[1])].map(
          (item, idx) => {
            if (!item) return <></>;
            return (
              <HostelItem
                id={item.id}
                name={item.name}
                img={item.imageUrl[0]}
                size={item.capacity}
                address={GenAddress(
                  item.street,
                  item.ward,
                  item.district,
                  item.province
                )}
                cost={item.cost}
                isLiked={item.isLiked}
                token={token}
                handleCompare={handleCompare}
                isCompareChecked={compare.includes(item.id)}
                removeAction={true}
              />
            );
          }
        )}
      </Modal>
    </div>
  );
};

export default HostelList;
