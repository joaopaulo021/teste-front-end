import { useState } from 'react'
import './styles.scss'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { SearchProps } from '../../interfaces/interface'

const SearchBooking: React.FC<SearchProps> = ({ handleSearch }) => {

  const [searchItem, setSearchItem] = useState('')


  return (
    <section className="search-container">
      <div className="link-search-container">
        <span>
          <a href="/">Todas as reservas</a>
          <a href="#">Carrinho</a>
        </span>

        <div className="search">
          <input
            placeholder='Pesquisar'
            onChange={(e) => setSearchItem(e.target.value)}
            type="text" />
          <button onClick={() => handleSearch(searchItem)} type='button'><FiSearch /></button>
        </div>

        <button type='button'>
          <FiPlus />
          <p>Nova reserva</p>
        </button>
      </div>
    </section>
  )
}

export default SearchBooking
