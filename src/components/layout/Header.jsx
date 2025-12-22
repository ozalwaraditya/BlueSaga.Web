import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../../assets/BlueSaga.svg";

function Header() {
  const { currentUser, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const handleActivateNavigation = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header id="header">
      <div className="header-left">
        <div className="header-logo" onClick={() => navigate("/")}>
          <img
            src={Logo}
            alt="BlueSaga Logo"
            style={{ height: "45px", cursor: "pointer" }}
          />
        </div>

        <ul>
          <li>
            <NavLink to="/" className={handleActivateNavigation}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" className={handleActivateNavigation}>
              Product
            </NavLink>
          </li>
          <li className="dropdown">
            <span className="dropdown-title">Services ▾</span>

            <ul className="dropdown-menu">
              <li>
                <NavLink
                  to="/management/coupons"
                  className={handleActivateNavigation}
                >
                  Coupons
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/management/products"
                  className={handleActivateNavigation}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/management/inventory"
                  className={handleActivateNavigation}
                >
                  Inventory
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {/* Middle */}
      <div>Search</div>

      {/* Right-Side */}

      {isAuthenticated ? (
        <div className="header-right">
          <span className="welcome-text">
            👋 Welcome, <strong>{currentUser?.name}</strong>
          </span>

          <Link to="/profile" className="btn-secondary">
            Profile
          </Link>

          <button onClick={logout} className="btn-primary">
            Logout
          </button>
        </div>
      ) : (
        <div className="header-right">
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
          <Link to="/register" className="btn-primary">
            Register
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
