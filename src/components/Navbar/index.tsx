import { FiHelpCircle, FiMail, FiSettings, FiChevronDown } from 'react-icons/fi'
import logo from "../../assets/logo.png"
import './styles.scss'

const Navbar = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className="menu-container">
        <section className="icons">
          <FiHelpCircle />
          <FiMail />
          <FiSettings />
        </section>
        <section className="login">
          <p>Admin</p>
          <span>PF</span>
          <FiChevronDown />
        </section>
      </div>
    </header>
  )
}

export default Navbar