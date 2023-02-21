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
            </Container>
        </Menu>
    )
}