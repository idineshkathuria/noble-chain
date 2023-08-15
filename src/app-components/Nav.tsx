import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  font-size: 25px;
  justify-content: space-between;
  padding: 0;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  &:hover {
    color: #ff914d;
  }
`;

export function Nav() {
  const location = useLocation();

  if (location.pathname.includes("/campaign/"))
    return (
      <NavLink to="/" style={{ fontSize: "40px" }}>
        &larr;
      </NavLink>
    );

  return (
    <NavBar>
      <NavLink
        to="/"
        className={`nav-link ${
          location.pathname === "/" ? "router-link-active" : ""
        }`}
      >
        View All Campaigns
      </NavLink>
      <NavLink
        to="/create"
        className={`nav-link ${
          location.pathname === "/create" ? "router-link-active" : ""
        }`}
      >
        Create Campaign
      </NavLink>
      <NavLink
        to="/funds"
        className={`nav-link ${
          location.pathname === "/funds" ? "router-link-active" : ""
        }`}
      >
        My Tokens
      </NavLink>
    </NavBar>
  );
}
