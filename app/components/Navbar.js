import Image from 'next/image';
import { useContext } from 'react';
import { ImStatsBars } from 'react-icons/im';

import { authContext } from '../lib/store/authContext';

const Navbar = () => {
  const { user, loading, logout } = useContext(authContext);

  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Info */}
        {user && loading && (
          <div className="flex items-center gap-2">
            {/* Profile img */}
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
              <Image
                src={user.photoURL || 'https://i.pravatar.cc/150?img=1'}
                referrerPolicy="no-referrer"
                alt="Image of user"
                className="w-full h-full object-cover"
                width={40}
                height={40}
                priority
              />
            </div>
            {/* Welcome user */}
            <small>Hi, {user.displayName || 'User'}</small>
          </div>
        )}

        {/* Nav */}
        {user && !loading && (
          <nav className="flex items-center gap-4">
            <div>
              <ImStatsBars className="text-2xl" />
            </div>
            <div>
              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
