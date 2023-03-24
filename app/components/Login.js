import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <div className="flex flex-col mx-auto lg:flex-row lg:items-center">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dgxuy04q8/image/upload/v1679655737/landing%20image.png"
          alt="Finance Tools"
          className="object-cover max-w-full max-h-full lg:max-w-none lg:max-h-none"
          style={{ maxWidth: '80vw' }}
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 lg:px-12 py-6 lg:py-0">
        <h1 className="text-4xl font-bold mb-4 text-center text-white">
          Welcome to <span className="text-blue-500">Expense Tracker</span>{' '}
          <span role="img" aria-label="waving hand" className="text-blue-500">
            👋
          </span>
        </h1>
        <p className="text-white text-center mb-6">
          A simple app to track your expenses and manage your finance
        </p>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          <FcGoogle />
          <span className="text-lg">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
