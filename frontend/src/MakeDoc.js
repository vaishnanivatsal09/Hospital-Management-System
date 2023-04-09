import React from 'react';
import {
    Box,
    Button,
    Heading,
    Grommet,
    FormField,
    Form,
    Text,
} from 'grommet';

import './App.css';

const theme = {
    global: {
        colors: {
            brand: '#000000',
            focus: '#000000',
            active: '#000000',
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
        {...props}
    />
);

function MakeDoc() {
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const value = Object.fromEntries(formData.entries());
        console.log('Submit', value);
        console.log(value.email);
        fetch(`http://localhost:3001/checkIfDocExists?email=${value.email}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data[0]);
                if (res.data[0]) {
                    window.alert('A doctor is already associated with that email.');
                    console.log('no user  found');
                } else {
                    fetch(`http://localhost:3001/makeDocAccount?name=${value.firstName}&lastname=${value.lastName}&email=${value.email}&password=${value.password}&gender=${value.gender}&schedule=${value.schedule}`);
                    window.location = '/DocHome';
                }
            });
    }

    return (
        <Grommet theme={theme} full>
            <AppBar>
                <a style={{ color: 'inherit', textDecoration: 'inherit' }} href='/'>
                    <Heading level='3' margin='none'>Hospital Management System</Heading>
                </a>
            </AppBar>
            <Box fill align='center' justify='top'>
                <Box width='medium'>
                    <Text color='#AAAAAA'>Doctor&apos;s registration form:</Text>
                    <Form onReset={(event) => console.log(event)} onSubmit={handleSubmit}>
                        <FormField
                            label='First Name'
                            name='firstName'
                            required
                            placeholder='Please enter your first name.'
                            validate={{ regexp: /^[a-z]/i }}
                        />
                        <FormField
                            label='Last Name'
                            name='lastName'
                            required
                            placeholder='Please enter your last name.'
                            validate={{ regexp: /^[a-z]/i }}
                        />
                        <FormField
                            label='Email'
                            name='email'
                            type='email'
                            placeholder='Please enter your email.'
                            required
                        />
                        <FormField
                            label='Schedule No'
                            name='schedule'
                            placeholder='Please enter schedule number'
                            required
                        />
                        <FormField
                            label='Gender'
                            name='gender'
                            placeholder='Female or Male'
                            required
                        />
                        <FormField
                            label='Password'
                            name='password'
                            required
                            placeholder='Please enter your password.'
                            validate={{ regexp: /^(?=.{8,})(?=.*[0-9]{2})/, message: '@ least 8 characters containing 2 digits' }}
                        />
                        <Box direction="row" align="center" >
                            <Button
                                style={{ textAlign: 'center' }}
                                label="Cancel"
                                fill="horizontal"
                                href="/" />
                            <Button
                                label="Sign Up"
                                fill="horizontal"
                                type="submit"
                                primary />
                        </Box>

                    </Form>
                </Box>
            </Box>

        </Grommet>
    );
}

export default MakeDoc;