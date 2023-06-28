import './styles.scss'
import { FiCommand, FiPlus, FiSettings } from 'react-icons/fi'



const Aside = () => {
  return (
    <div className="aside-container">
      <aside>

        <div className="btn-container">
          <FiCommand />
          <a href="#">Dashboard</a>
        </div>

        <div className="btn-container">
          <FiPlus />
          <a href="#">Nova reserva</a>
        </div>

        <div className="btn-container">
          <FiSettings />
          <a href="#">Configurações</a>
        </div>

      </aside>
    </div>
  )
}

export default Aside
