import { useState, useEffect } from 'react'
import './styles.scss'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { SearchProps } from '../../interfaces/interface'

const SearchBooking: React.FC<SearchProps> = ({ handleSearch }) => {

  const [searchItem, setSearchItem] = useState('')
  const [selectedLink, setSelectedLink] = useState('');

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
    localStorage.setItem('selectedLink', link);
  };

  useEffect(() => {
    const storedLink = localStorage.getItem('selectedLink');
    if (storedLink) {
      setSelectedLink(storedLink);
    }
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchItem);
    }
  }

  return (
    <section className="search-container">
      <div className="link-search-container">
        <span>
          <a
            href="/"
            className={selectedLink === 'reservas' ? 'selected' : ''}
            onClick={() => handleLinkClick('reservas')}
          >
            Todas as reservas
          </a>
          <a
            href="#"
            className={selectedLink === 'carrinho' ? 'selected' : ''}
            onClick={() => handleLinkClick('carrinho')}
          >
            Carrinho
          </a>
        </span>
        <div className="search">
          <input
            onKeyDown={handleKeyPress}
            placeholder='Pesquisar'
            onChange={(e) => setSearchItem(e.target.value)}
            type="text" />
          <button onClick={() => handleSearch(searchItem)} type='button'><FiSearch /></button>
        </div>

        <div className="new-booking">
          <a href="/cadastro">
            <button type='button'>
              <FiPlus />
              <p>Nova reserva</p>
            </button>
          </a>
        </div>
      </div>
    </section >
  )
}

export default SearchBooking
