import './styles.scss'
import { BookingProps } from '../../interfaces/interface';
import { format } from 'date-fns';
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useState } from 'react'

import img1 from '../../assets/accommodations/Apartamento-01.jpg'
import img2 from '../../assets/accommodations/Casal-Premium.jpg'
import img3 from '../../assets/accommodations/Chale-Aconchego.jpg'
import img4 from '../../assets/accommodations/Duplo-Luxo.jpg'
import img5 from '../../assets/accommodations/Standard-Casal.jpg'

import Modal from '../Modal';

const accommodations: { [key: string]: string } = {
  'Apartamento': img1,
  'Casal Premium': img2,
  'Chalé Aconchego': img3,
  'Duplo Luxo': img4,
  'Standard Casal': img5,
};

const getImagePath = (acomodacao: string) => {
  return accommodations[acomodacao] || '';
};


const Booking: React.FC<BookingProps> = ({ item, deleteItem }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return '';

    const formattedDate = format(new Date(dateTime), 'dd/MM/yyyy');
    const formattedTime = format(new Date(dateTime), 'HH:mm');

    return `${formattedDate}\n${formattedTime}`;
  };

  return (
    <section className='booking'>
      <div className="booking-img">
        <img src={getImagePath(item.acomodacao)} alt="" />
        <div className="description">
          <button onClick={toggleModal}>{'#' + item.id}</button>
          <p>{item.acomodacao}</p>
        </div>
      </div>

      <div className="booking-item">
        <h4>{`${item.nome} ${item.sobrenome}`}</h4>
        <p>{item.hospedes}</p>
      </div>

      <div className="booking-item">
        <span>{formatDateTime(item.checkIn)}</span>
      </div>

      <div className="booking-item">
        <span>{formatDateTime(item.checkOut)}</span>
      </div>

      <button className='btn-modal' type='button' onClick={toggleModal}>
        <AiOutlineEllipsis />
      </button>

      {isModalOpen && (
        <Modal deleteItem={deleteItem} getImagePath={getImagePath} item={item} toggleModal={toggleModal} />
      )}
    </section>
  )
}
export default Booking
