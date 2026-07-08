import "./Navbar.css";

import Container from "../common/Container";

import { NAV_ITEMS } from "../../constants/routes";

function Navbar() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="navbar">
      <Container>
        <div className="nav-wrapper">
          <div className="logo">AK</div>

          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button onClick={() => scrollToSection(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;
