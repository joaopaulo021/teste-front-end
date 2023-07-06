import { ModalProps } from '../../interfaces/interface'
import './styles.scss'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'


const Modal: React.FC<ModalProps> = ({ checkOut, checkIn, item, toggleModal, getImagePath, deleteItem }) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    toggleModal();
    navigate("/cadastro", { state: { editData: item } });
  };

  const confirmDelete = (itemId: string) => {
    deleteItem(itemId);
    toast.success('Registro excluído com sucesso!');
  };

  const handleDelete = (itemId: string) => {
    toast.warning(
      <div>
        <p>Deseja realmente excluir este registro?</p>
        <button className='btn-confirm' onClick={() => confirmDelete(itemId)}>Confirmar</button>
        <button className='btn-confirm' onClick={() => toast.dismiss}>Cancelar</button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        closeButton: true,
        autoClose: false,
        draggable: false,
        closeOnClick: true,
      }
    );
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
          <div className="user-data">
            <h3>ID</h3>
            <p>{item.id}</p>

            <h3>Nome</h3>
            <p>{`${item.nome} ${item.sobrenome}`}</p>

            <h3>Check-in</h3>
            <p>{`${checkIn.date} | ${checkIn.time}`}</p>


            <h3>Check-out</h3>
            <p>{`${checkOut.date} | ${checkOut.time}`}</p>

            <h3>Hóspedes</h3>
            <p>{item.hospedes}</p>

          </div>
          <div className="btns-modal">
            <button onClick={handleEditClick}>Editar</button>
            <button onClick={toggleModal}>Fechar</button>
            <button onClick={() => handleDelete(item.id)}>Deletar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
