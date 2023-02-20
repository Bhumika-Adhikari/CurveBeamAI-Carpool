import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import CarpoolDashboard from '../../features/CarpoolDashboard';
import CarpoolLane from '../../features/CarpoolLane';

function App() {

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <>
        <CarpoolDashboard/>
        </>
      </Container>
    </>
  );
}

export default App;
