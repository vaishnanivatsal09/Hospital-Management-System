import { useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Grommet,
    FormField,
    Form,
    Text
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

const CreateAccount = () => {
    const [value, setValue] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/checkIfPatientExists?email=${value.email}`);
            const data = await response.json();

            if (data?.data?.[0]) {
                window.alert("An account is already associated with that email.");
                console.log("no user found");
            } else {
                await fetch(`http://localhost:3001/makeAccount?name=${value.firstName}&lastname=${value.lastName}&email=${value.email}
        &password=${value.password}&address=${value.address}&gender=${value.gender}
        &conditions=${value.conditions}&medications=${value.medications}&surgeries=${value.surgeries}`);

                window.location = "/Home";
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grommet theme={theme} full>
            <AppBar>
                <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/">
                    <Heading level='3' margin='none'>Hospital Management System</Heading>
                </a>
            </AppBar>
            <Box fill align="center" justify="top">
                <Box width="medium">
                    <Text color="#AAAAAA">Patient's registration form:</Text>
                    <Form
                        onReset={event => console.log(event)}
                        onSubmit={handleSubmit}
                        value={value}
                        onChange={nextValue => setValue(nextValue)}
                    >
                        <FormField
                            label="First Name"
                            name="firstName"
                            placeholder="First name"
                            required
                            validate={{ regexp: /^[a-z]/i }}
                        />
                        <FormField
                            label="Last Name"
                            name="lastName"
                            required
                            placeholder="Last Name"
                            validate={{ regexp: /^[a-z]/i }}
                        />
                        <FormField
                            label="Gender"
                            name="gender"
                            placeholder="Female or Male"
                            required
                        />
                        <FormField
                            label="Medical History - Conditions"
                            name="conditions"
                            placeholder="Conditions"
                        />
                        <FormField
                            label="Medical History - Surgeries"
                            name="surgeries"
                            placeholder="Surgeries"
                        />
                        <FormField
                            label="Medical History - Medications"
                            name="medications"
                            placeholder="Medications"
                        />
                        <FormField
                            label="Address"
                            name="address"
                            placeholder="Address"
                            required
                        />
                        <FormField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                        />


                        <FormField
                            label="Password"
                            name="password"
                            placeholder="Password"
                            required
                            validate={{ regexp: /^(?=.{8,})(?=.*[0-9]{2})/, message: "@ least 8 characters containing 2 digits" }} />
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
                        <Box
                            align="center" pad="small">
                            <Text>Are you a doctor?</Text>
                            <Button
                                primary
                                label="I'm a doctor"
                                href="/MakeDoc" />
                        </Box>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    );
}

export default CreateAccount;