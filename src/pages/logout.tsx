import { LogoutProps } from "../interfaces/interface"
import { useEffect } from "react"

import '../pages/styles.scss'

const Logout: React.FC<LogoutProps> = ({ handleLogout }) => {
  useEffect(() => {
    handleLogout()
  }, [handleLogout])

  return (
    <section className="logout-container">
      <h2>Você foi desconectado!</h2>
    </section>
  )
}

export default Logout
