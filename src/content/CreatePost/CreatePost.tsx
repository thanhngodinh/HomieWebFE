import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import BasicInformation from './BasicInformation';
import Map from '../../components/Map';

const cx = classNames.bind(styles);

interface CreatePostProps { }

const CreatePost: FC<CreatePostProps> = () => {
  // return <div className={cx('wrapper')}>Create Post</div>;
  // return (
  //   <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
  //     <div>
  //       Để mọi người cùng biết
  //     </div>
  //     <div>
  //       Bạn có nhà muốn cho thuê nhưng chưa có kênh? Hãy viết vài dòng để đưa mọi người đến nhà của bạn nhé.
  //     </div>
  //     <div className="text-xs w-full p-6 m-auto bg-white rounded-md shadow-xl ring-2 lg:max-w-xl">
  //       <div className="block mb-2">
  //         <p className="text-lg font-semibold text-indigo-700 leading-relaxed">
  //           Thông tin cơ bản
  //         </p>
  //       </div>
  //       <form className="mt-6">
  //         <div className="flex flex-wrap -mx-3 mb-6">
  //           <div className="w-full px-3 mb-6 md:mb-0">
  //             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
  //               Loại tin đăng
  //             </label>

  //             <input id='home1' name="home1" value="home1" className="mr-1" type="radio" />
  //             <label for="home1" className="">Tin ở ghép</label>


  //             <input id="home2" name="home1" value="home2" className="ml-3 mr-1" type="radio" aria-labelledby="home2" aria-describedby="home2" />
  //             <label for="home2" className="">Tin nhà ở</label>
  //           </div>
  //         </div>
  //         <div className="flex flex-wrap -mx-3 mb-6">
  //           <div className="w-full px-3 mb-6 md:mb-0">
  //             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
  //               Tên khu dân cư / dự án
  //             </label>
  //             <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Tên khu dân cư / dự án" />
  //             <p className="text-red-500 text-xs italic">Please fill out this field.</p>
  //           </div>
  //         </div>
  //         {/* <div className="w-full md:w-1/2 px-3"></div> */}
  //         <div className="flex flex-wrap -mx-3 mb-6">
  //           <div className="w-full px-3">
  //             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
  //               Tỉnh / Thành phố
  //             </label>
  //             <div className="relative">
  //               <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
  //                 <option>Hà Nội</option>
  //                 <option>Hồ Chí Minh</option>
  //                 <option>Đà Nẵng</option>
  //               </select>
  //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
  //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
  //               </div>
  //             </div>
  //             {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" /> */}
  //           </div>
  //         </div>
  //         <div className="flex flex-wrap -mx-3 mb-6">
  //           <div className="w-full px-3">
  //             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
  //               Quận / Huyện
  //             </label>
  //             <div className="relative">
  //               <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
  //                 <option>Hà Nội</option>
  //                 <option>Hồ Chí Minh</option>
  //                 <option>Đà Nẵng</option>
  //               </select>
  //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
  //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
  //               </div>
  //             </div>
  //             {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" /> */}
  //           </div>
  //         </div>
  //         <div className="flex flex-wrap -mx-3 mb-6">
  //           <div className="w-full px-3">
  //             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
  //               Phường / Xã
  //             </label>
  //             <div className="relative">
  //               <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
  //                 <option>Hà Nội</option>
  //                 <option>Hồ Chí Minh</option>
  //                 <option>Đà Nẵng</option>
  //               </select>
  //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
  //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
  //               </div>
  //             </div>
  //             {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" /> */}
  //           </div>
  //         </div>
  //         {/* <div className="flex flex-wrap -mx-3 mb-6">
  //           <div className="w-full px-3">
  //             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
  //               Password
  //             </label>
  //             <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
  //             <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
  //           </div>
  //         </div> */}
  //         <div className="flex flex-wrap -mx-3 mb-2">
  //           <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
  //             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
  //               Đường
  //             </label>
  //             <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Đường" />
  //           </div>
  //           {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
  //             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
  //               State
  //             </label>
  //             <div className="relative">
  //               <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
  //                 <option>New Mexico</option>
  //                 <option>Missouri</option>
  //                 <option>Texas</option>
  //               </select>
  //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
  //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
  //               </div>
  //             </div>
  //           </div> */}
  //           <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
  //             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
  //               Số nhà
  //             </label>
  //             <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Số nhà" />
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
  return (
    <div>
      <BasicInformation/>
      <Map></Map>
      {/* <BasicInformation/>
      <BasicInformation/> */}
    </div>
  );
};

export default CreatePost;
