import { FiHelpCircle, FiMail, FiSettings, FiChevronDown } from 'react-icons/fi'
import logo from "../../assets/logo.png"
import './styles.scss'
import { useState } from 'react'

const Navbar: React.FC = () => {

  const [showMenu, setIsShowMenu] = useState(false)

  return (
    <header>
      <span>
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </span>

      <div className="icons-container">
        <section className="icons">
          <FiHelpCircle />
          <FiMail />
          <FiSettings />
        </section>
      </div>
      <div className="menu-container">
        <section className="login">
          <p>Admin</p>
          <span>JP</span>
          <FiChevronDown onClick={() => setIsShowMenu(!showMenu)} className='login-btn' />
        </section>
        {showMenu &&
          <div className='menu'>
            <a href="/logout">Logout</a>
            <p>Trocar user</p>
          </div>
        }

      </div>
    </header>
  )
}

export default Navbar