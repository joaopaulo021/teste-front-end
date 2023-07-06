import Booking from '../Booking'
import './styles.scss'
import { BookingsProps, SortCriteria } from '../../interfaces/interface';
import { nanoid } from 'nanoid';
import SearchBooking from '../SearchBooking';

const Bookings: React.FC<BookingsProps> = ({ noResults, sortData, handleSearch, data, deleteItem }) => {

  return (

    <main className='bookings'>
      <SearchBooking handleSearch={handleSearch} />

      <div className="filter-btns">
        <button
          type="button"
          onClick={() => sortData(SortCriteria.Acomodacao)}
        >
          Ordenar por Acomodação
        </button>

        <button
          type="button"
          onClick={() => sortData(SortCriteria.Nome)}
        >
          Ordenar por Nome
        </button>

        <button
          type="button"
          onClick={() => sortData(SortCriteria.CheckIn)}
        >
          Ordenar por Check-In
        </button>

      </div>
      <section className='main-container'>
        <div className="booking-container">
          <div className="column">
            <h2>Acomodação</h2>
            <h2>Hospedes</h2>
            <h2>Check-In</h2>
            <h2>Check-out</h2>
          </div>
          <div className="items-container">
            {data.length === 0 && <h1>Nenhuma reserva encontrada!</h1>}
            {data.map((item) => {
              return <Booking data={data} key={nanoid()} deleteItem={deleteItem} item={item} />;
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
export default Bookings
