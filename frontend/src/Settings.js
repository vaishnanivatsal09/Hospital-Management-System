import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Grommet,
  FormField,
  Form,
} from 'grommet';

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

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    style={{ zIndex: '1' }}
    {...props} />
);

function Settings() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let email_in_use = "";
    console.log(formData);
    fetch("http://localhost:3001/userInSession")
      .then(res => res.json())
      .then(res => {
        var string_json = JSON.stringify(res);
        var email_json = JSON.parse(string_json);
        email_in_use = email_json.email;
        console.log(email_in_use);
        console.log("eg");
        fetch("http://localhost:3001/resetPasswordPatient?email=" +
          email_in_use + "&oldPassword=" + formData.oldPassword + "&newPassword=" +
          formData.newPassword, { method: 'POST' })
          .then(res => res.json())
          .then(res => {
            let didUpdate = res.data.affectedRows;
            if (didUpdate === 0) {
              window.alert("Entered your old password incorrectly");
            } else {
              window.alert("Password Reset Successful");
            }
          });
      });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Grommet theme={theme} full>
      <Box >
        <AppBar>
          <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/">
            <Heading level='3' margin='none'>Hospital Management System</Heading>
          </a>
        </AppBar>
        <Box pad="small">
          <Form onSubmit={handleSubmit}>
            <h3>Password Change</h3>
            <FormField
              type='password'
              label="Old password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleFormChange}
              required
            />
            <br />
            <FormField
              label="New password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleFormChange}
              required
            />
            <br />
            <Button
              type="submit"
              label="Change Password"
              primary
            />
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
}

export default Settings;
