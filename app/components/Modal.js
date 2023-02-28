const Modal = ({ show, onClose, children }) => {
  return (
    <div
      style={{
        transform: show ? 'translateX(0%)' : 'translateX(-200%)'
      }}
      className="absolute top-0 left-o w-full h-full z-10 transition-all duration-500 ease-in-out"
    >
      <div className="container max-w-2xl mx-auto h-[80vh] rounded-3xl bg-slate-800 py-6 px-4">
        <button
          onClick={() => onClose(false)}
          className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600 text-white"
        >
          X
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
