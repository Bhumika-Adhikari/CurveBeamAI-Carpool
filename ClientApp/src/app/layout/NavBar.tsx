import { Menu, Container, MenuItem } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem header>
          <i className="car icon" style={{ fontSize: 25 }}></i>
          Carpool
        </MenuItem>
      </Container>
    </Menu>
  );
}
