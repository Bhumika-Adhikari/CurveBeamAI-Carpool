import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import CarpoolDashboard from '../../components/CarpoolDashboard';
import CarpoolLane from '../../components/CarpoolLane';

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
