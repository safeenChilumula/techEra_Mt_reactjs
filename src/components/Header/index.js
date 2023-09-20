import {Link} from 'react-router-dom'
import './index.css'

const headerImage =
  'https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png'

const Header = () => (
  <div className="HeaderContainer">
    <Link to="/">
      <img className="HeaderImage" src={headerImage} alt="website logo" />
    </Link>
  </div>
)
export default Header
