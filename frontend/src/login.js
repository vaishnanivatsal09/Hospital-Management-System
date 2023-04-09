import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    Heading,
    Grommet,
    FormField,
    Form,
    CheckBox,
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
        as='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        style={{ zIndex: '1' }}
        {...props}
    />
);

const LogIn = () => {
    const [isDoctor, setIsDoctor] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        const loginUrl = isDoctor
            ? `http://localhost:3001/checkDoclogin?email=${email}&password=${password}`
            : `http://localhost:3001/checklogin?email=${email}&password=${password}`;

        fetch(loginUrl)
            .then((res) => res.json())
            .then((res) => {
                if (res.data.length === 0) {
                    window.alert('Invalid Log In');
                } else {
                    const homeUrl = isDoctor ? 'DocHome' : '/Home';
                    history.push(homeUrl);
                    console.log(res.data);
                }
            });
    };

    return (
        <Grommet theme={theme} full>
            <AppBar>
                <a
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                    href='/'
                >
                    <Heading level='3' margin='none'>
                        Hospital Management System
                    </Heading>
                </a>
            </AppBar>

            <Box fill align='center' justify='top' pad='medium'>
                <Box width='medium' pad='medium'>
                    <Form onReset={(event) => console.log(event)} onSubmit={handleSubmit}>
                        <FormField
                            color='#00739D'
                            label='Email'
                            name='email'
                            type='email'
                            placeholder='Please enter your email.'
                            required
                        />
                        <FormField
                            color='#00739D'
                            type='password'
                            label='Password'
                            name='password'
                            placeholder='Please enter your password.'
                            required
                        />
                        <FormField
                            component={CheckBox}
                            checked={isDoctor}
                            margin='large'
                            label="I'm a doctor"
                            name='isDoc'
                            onChange={(event) => {
                                setIsDoctor(event.target.checked);
                            }}
                        />
                        <Box direction='column' align='center'>
                            <Button
                                style={{ textAlign: 'center', margin: '1rem' }}
                                type='submit'
                                label='Log In'
                                fill='horizontal'
                                primary
                            />
                            <Button
                                label='Create Account'
                                style={{ textAlign: 'center', margin: '0.5rem' }}
                                fill='horizontal'
                                href='/createAcc'
                            />
                        </Box>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    );
};

export default LogIn;
