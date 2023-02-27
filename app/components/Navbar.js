import Image from 'next/image';
import { ImStatsBars } from 'react-icons/im';

const Navbar = () => {
  return (
    <header className='container max-w-2xl px-6 py-6 mx-auto'>
      <div className='flex items-center justify-between'>
        {/* User Info */}
        <div className='flex items-center gap-2'>
          {/* Profile img */}
          <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
            <Image
              src='https://thispersondoesnotexist.xyz/img/4125.jpg'
              alt='Image of user'
              className='w-full h-full object-cover'
              width={40}
              height={40}
              priority
            />
          </div>
          {/* Welcome user */}
          <small>Hi, User</small>
        </div>

        {/* Nav */}
        <nav className='flex items-center gap-2'>
          <div>
            <ImStatsBars className='text-2xl' />
          </div>
          <div>
            <button className='btn btn-danger'>Logout</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
