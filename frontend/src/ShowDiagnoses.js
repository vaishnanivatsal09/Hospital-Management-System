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

const ShowDiagnoses = ({ match }) => {
  const [diagnoses, setDiagnoses] = useState([]);
  const id = match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/showDiagnoses?id=${id}`);
        const data = await res.json();
        setDiagnoses(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

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
      <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/"><Heading level='3' margin='none'>Hospital Management System</Heading></a>
    </Box>
  );

  const Body = () => (
    <div className="container">
      <div className="panel panel-default p50 uth-panel">
        {diagnoses.map(diagnosis => (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell scope="row">
                  <strong>Appointment Id</strong>
                </TableCell>
                <TableCell>{diagnosis.appt}</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <br />
              <TableRow>
                <TableCell scope="row">
                  <strong>Doctor</strong>
                </TableCell>
                <TableCell>{diagnosis.doctor}</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <br />
              <TableRow>
                <TableCell scope="row">
                  <strong>Diagnosis</strong>
                </TableCell>
                <TableCell>{diagnosis.diagnosis}</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <br />
              <TableRow>
                <TableCell scope="row">
                  <strong>Prescription</strong>
                </TableCell>
                <TableCell>{diagnosis.prescription}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </div>
      <hr />
    </div>
  );

  return (
    <Grommet full={true} theme={theme}>
      <Box fill={true}>
        <Header />
        <Body />
      </Box>
    </Grommet>
  );
};

export default ShowDiagnoses;
