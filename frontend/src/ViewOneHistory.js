import React, { useState, useEffect } from 'react';
import { Box, Heading, Grommet, Table, TableBody, TableCell, TableRow } from 'grommet';
import './App.css';

const theme = {
  global: {
    colors: {
      brand: '#000000',
      focus: '#000000'
    },
    font: {
      family: 'Lato',
    },
  },
};

function ViewOneHistory({ match }) {
  const [medhiststate, setMedhiststate] = useState([]);
  const [medhiststate2, setMedhiststate2] = useState([]);

  useEffect(() => {
    const { email } = match.params;
    allDiagnoses(email);
    getHistory(email);
  }, [match.params]);

  function getHistory(value) {
    let email = "'" + value + "'";
    fetch('http://localhost:3001/OneHistory?patientEmail=' + email)
      .then(res => res.json())
      .then(res => setMedhiststate(res.data));
  }

  function allDiagnoses(value) {
    let email = "'" + value + "'";
    fetch('http://localhost:3001/allDiagnoses?patientEmail=' + email)
      .then(res => res.json())
      .then(res => setMedhiststate2(res.data));
  }

  const Header = () => (
    <Box
      tag='header'
      background='brand'
      pad='small'
      elevation='small'
      justify='between'
      direction='row'
      align='center'
      flex={false}
    >
      <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/">
        <Heading level='3' margin='none'>Hospital Management System</Heading>
      </a>
    </Box>
  );

  const Body = () => (
    <div className="container">
      <div className="panel panel-default p50 uth-panel">
        {medhiststate.map(patient => (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell scope="row">
                  <strong>Name</strong>
                </TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell>{patient.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">
                  <strong>Gender</strong>
                </TableCell>
                <TableCell>
                  {patient.gender}
                </TableCell>
                <TableCell />
                <TableCell>
                  <strong>Address</strong>
                </TableCell>
                <TableCell>{patient.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Conditions</strong>
                </TableCell>
                <TableCell>{patient.conditions}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Surgeries</strong>
                </TableCell>
                <TableCell>{patient.surgeries}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Medications</strong>
                </TableCell>
                <TableCell>{patient.medication}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </div>
      <hr />
    </div>
  );

  const Body2 = ({ medhiststate2 }) => (
    <div className="container">
      <div className="panel panel-default p50 uth-panel">
        {medhiststate2.map((patient) => (
          <div key={patient.date}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell scope="row">
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell>{patient.date.split("T")[0]}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <strong>Doctor</strong>
                  </TableCell>
                  <TableCell>{patient.doctor}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row">
                    <strong>Concerns</strong>
                  </TableCell>
                  <TableCell>{patient.concerns}</TableCell>
                  <TableCell />
                  <TableCell>
                    <strong>Symptoms</strong>
                  </TableCell>
                  <TableCell>{patient.symptoms}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Diagnosis</strong>
                  </TableCell>
                  <TableCell>{patient.diagnosis}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Prescription</strong>
                  </TableCell>
                  <TableCell>{patient.prescription}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );

  const ViewOneHistory = () => {
    const [medhiststate2, setMedhiststate2] = useState([]);

    // some logic to set medhiststate2

    return (
      <Grommet full theme={theme}>
        <Box fill>
          <Header />
          <Body />
          <Body2 medhiststate2={medhiststate2} />
        </Box>
      </Grommet>
    );
  };

}
export default ViewOneHistory;