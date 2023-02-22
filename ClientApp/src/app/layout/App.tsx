import React, { useState } from 'react';
import "./styles.css";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import CarpoolDashboard from "../../components/CarpoolDashboard";

function App() {
  
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <>
          <CarpoolDashboard />
        </>
      </Container>
    </>
  );
}

export default App;
