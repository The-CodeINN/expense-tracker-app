import Image from 'next/image';

export default function Home() {
  return (
    <header>
      {/* User Info */}
      <div>
        {/* Profile img */}
        <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
          <Image
            src='https://thispersondoesnotexist.xyz/img/4125.jpg'
            alt='Image of user'
            className='object-cover w-full h-full'
            width={40}
            height={40}
          />
          {/* Welcome user */}
          <h3 className='text-white'>Welcome, John Doe</h3>
        </div>
      </div>
    </header>
  );
}
