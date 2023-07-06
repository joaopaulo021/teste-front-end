import { useEffect, useState } from 'react';
import './styles.scss'
import { FiCommand, FiPlus, FiSettings } from 'react-icons/fi'


const Aside: React.FC = () => {

  const [selectedLink, setSelectedLink] = useState('');
  const pathname = window.location.pathname;

  useEffect(() => {
    setSelectedLink(pathname);
  }, [pathname]);

  console.log(selectedLink)

  return (
    <div className="aside-container">
      <aside>

        <div className={`btn-container ${selectedLink === '/' ? 'selected' : ''}`}>
          <FiCommand />
          <a href="/">Dashboard</a>
        </div>

        <div className={`btn-container ${selectedLink === '/cadastro' ? 'selected' : ''}`}>
          <FiPlus />
          <a href="/cadastro">Nova reserva</a>
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
