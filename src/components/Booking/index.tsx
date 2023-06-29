import './styles.scss'
import { BookingProps } from '../../interfaces/interface';
import { format } from 'date-fns';
import { AiOutlineEllipsis } from 'react-icons/ai'

import img1 from '../../assets/accommodations/Apartamento-01.jpg'
import img2 from '../../assets/accommodations/Casal-Premium.jpg'
import img3 from '../../assets/accommodations/Chale-Aconchego.jpg'
import img4 from '../../assets/accommodations/Duplo-Luxo.jpg'
import img5 from '../../assets/accommodations/Standard-Casal.jpg'

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

const Booking: React.FC<BookingProps> = ({ item }) => {
  const currentDate = format(new Date(), 'dd/MM/yyyy');
  return (

    <section className='booking'>
      <div className="booking-img">
        <img src={getImagePath(item.acomodacao)} alt="" />
        <div className="description">
          <p>{'#' + item.id}</p>
          <p>{item.acomodacao}</p>
        </div>
      </div>

      <div className="booking-item">
        <h4>{item.nome}</h4>
        <p>{item.hospedes}</p>
      </div>

      <div className="booking-item">
        <p>{currentDate}</p>
        <h4>{item.checkIn}</h4>
      </div>

      <div className="booking-item">
        <p>21/07/2023</p>
        <h4>{item.checkOut}</h4>
      </div>
      <button type='button'>
        <AiOutlineEllipsis />
      </button>

    </section>
  )
}
export default Booking
