"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'
import title from '@/app/public/images/title.png';
import pic1 from '@/app/public/images/pic1.png';
import pic2 from '@/app/public/images/pic2.jpeg';
import pic3 from '@/app/public/images/pic3.png';

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null; // Hide after timeout

  return (
    <>
    <div className='w-full h-full min-h-screen min-w-screen bg-[#030303] flex flex-col relative'>      
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-6 max-w-4xl w-full text-center z-10">
        <Image src={title} alt="Column 3"  width={200} height={200} className="mx-auto" />
        <div className="w-12 h-12 border-4  border-[#DC5E12] border-t-4 border-t-[#292624] rounded-full animate-spin mx-auto mt-10"></div>
    </div>
    <div className='grid grid-cols-3 gap-4 flex-grow p-4 z-0'>
        <div className='relative bg-white/10 backdrop-blur-md text-white p-6 rounded-lg flex flex-col items-center overflow-hidden w-full h-full'>
          {/* <Image src={pic1} alt="Column 1" width={1000} height={1000} className="absolute inset-0  bg-cover bg-center bg-no-repeat rounded-lg opacity-30" /> */}
          <Image 
      src={pic3}
      alt="Column 1" 
      fill
      style={{ objectFit: "cover" }}
      className=" absolute inset-0 opacity-30" 
    />
        </div>
        <div className='bg-white/10 backdrop-blur-md text-white p-6 rounded-lg flex flex-col items-center '>
          {/* <Image src={pic2} alt="Column 2" width={1000} height={1000} className="absolute inset-0  bg-cover bg-center bg-no-repeat rounded-lg opacity-30" /> */}
          <Image 
      src={pic2}
      alt="Column 1" 
      layout="fill" 
      objectFit="cover" 
      className="absolute bg-cover bg-center bg-no-repeat inset-0 opacity-30" 
    />
        </div>
        <div className='bg-white/10 backdrop-blur-md text-white p-6 rounded-lg flex flex-col items-center'>
          {/* <Image src={pic3} alt="Column 3"  width={1000} height={1000} className="absolute inset-0  bg-cover bg-center bg-no-repeat rounded-lg opacity-30" /> */}
          <Image 
      src={pic1}
      alt="Column 1" 
      layout="fill" 
      objectFit="cover" 
      className="absolute bg-cover bg-center bg-no-repeat inset-0 opacity-30" 
    />
        </div>
    </div>
    </div>
    </>
    
  );
};

export default LoadingScreen;