import Modal from '../Modal';

const ViewExpenseModal = ({ show, onClose, expense }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
      </div>
    </Modal>
  );
};

export default ViewExpenseModal;
