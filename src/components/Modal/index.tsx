import { ModalProps } from '../../interfaces/interface'
import './styles.scss'
import { useNavigate } from "react-router-dom";

const Modal: React.FC<ModalProps> = ({ item, toggleModal, getImagePath, deleteItem }) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    toggleModal();
    navigate("/cadastro", { state: { editData: item } });
  };

  return (
    <div className="modal">
      <div className="modal-content">

        <div className="img-content">
          <h2>Confira os detalhes da reserva</h2>
          <img src={getImagePath(item.acomodacao)} alt="" />
        </div>

        <div className="modal-container">
          <h2>{item.acomodacao}</h2>
          <p>ID: {item.id}</p>
          <p>Check-in: {item.checkIn}</p>
          <p>Check-out: {item.checkOut}</p>
          <p>Hóspedes: {item.hospedes}</p>
          <p>Nome: {item.nome}</p>
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={toggleModal}>Fechar</button>
          <button onClick={() => deleteItem(item.id)}>deletar</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
