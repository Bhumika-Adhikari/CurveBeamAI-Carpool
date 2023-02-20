import react from 'react';
import { Menu, Container,MenuItem,Icon, IconGroup } from 'semantic-ui-react';

export default function NavBar(){
    return(

        <Menu  inverted fixed='top'>
            <Container>
                <MenuItem header>
                <i className="car icon" style={{fontSize:25}}></i>
                    Carpool
                </MenuItem>
                <MenuItem name="Home">
                </MenuItem>
                <MenuItem name="Classes">
                </MenuItem>
            </Container>
        </Menu>
    )
}