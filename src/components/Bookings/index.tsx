import Booking from '../Booking'
import './styles.scss'
import { MainProps } from '../../interfaces/interface';
import { nanoid } from 'nanoid';

const Bookings: React.FC<MainProps> = ({ data }) => {

  return (
    <section className='bookings'>
      <div className="column">
        <h2>Acomodação</h2>
        <h2>Hospedes</h2>
        <h2>Check-In</h2>
        <h2>Check-out</h2>
      </div>
      <div className="booking-container">
        {data.map((item) => {
          return <Booking item={item} key={nanoid()} />
        })}
      </div>
    </section>
  )
}
export default Bookings
