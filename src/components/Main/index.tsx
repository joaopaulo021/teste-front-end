import SearchBooking from '../SearchBooking'
import Bookings from '../Bookings'
import './styles.scss'
import { FiPlus } from 'react-icons/fi'
import { MainProps } from '../../interfaces/interface';

const Main: React.FC<MainProps> = ({ data }) => {

  return (
    <section className='main-container'>
      <div className="link-search-container">

        <span>
          <a href="/">Todas as reservas</a>
          <a href="#">Carrinho</a>
        </span>
        <SearchBooking />

        <button type='button'>
          <FiPlus />
          <p>Nova reserva</p>
        </button>
      </div>

      <div className="bookings-container">
        <Bookings data={data} />
      </div>
    </section>
  )
}
export default Main
