import React, { useState } from 'react';
import {
  Schedule,
} from 'grommet-icons';
import {
  Box,
  Button,
  Heading,
  Form,
  Text,
  TextArea,
  Grommet,
  Calendar,
  DropButton,
  MaskedInput,
  Keyboard,
  Select
} from 'grommet';
import './App.css';

const theme = {
  global: {
    colors: {
      brand: '#000000',
      focus: "#000000",
      active: "#000000",
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

const DropContent = ({ date: initialDate, time: initialTime, onClose }) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const close = () => {
    let parsedTime = time.split(":");
    let startHour = parseInt(parsedTime[0], 10);
    let endHour = startHour + 1;
    const endTime = `${endHour}:00`;

    console.log(endTime);
    console.log(date)
    console.log(time);
    onClose(date || initialDate, time || initialTime);
  };

  return (
    <Box align="center">
      <Calendar
        animate={false}
        date={date || initialDate}
        onSelect={setDate}
        showAdjacentDays={false}
        required
      />
      <Box flex={false} pad="medium" gap="small">
        <Keyboard
          required
          onEnter={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <MaskedInput
            mask={[
              {
                length: [1, 2],
                options: [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                ],
                regexp: /^1[1-2]$|^[0-9]$/,
                placeholder: "hh",
              },
              { fixed: ":" },
              {
                length: 2,
                options: ["00"],
                regexp: /^[0-5][0-9]$|^[0-9]$/,
                placeholder: "mm",
              },
            ]}
            value={time || initialTime}
            name="maskedInput"
            onChange={(event) => setTime(event.target.value)}
            required
          />
        </Keyboard>
        <Box flex={false}>
          <Button label="Done" onClick={close} color="#00739D" />
        </Box>
      </Box>
    </Box>
  );
};

const DateTimeDropButton = () => {
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);

  const onClose = (nextDate, nextTime) => {
    setDate(nextDate);
    setTime(nextTime);
    setOpen(false);
    setTimeout(() => setOpen(undefined), 1);
  };

  return (
    <Grommet theme={theme}>
      <Box align="center" pad="large">
        <DropButton
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          dropContent={<DropContent date={date} time={time} onClose={onClose} />}
        >
          <Box direction="row" gap="small" align="center" pad="small">
            <Text color={date ? undefined : "dark-5"}>
              {date
                ? `${new Date(date).toLocaleDateString()} ${time}`
                : "Select date & time"}
            </Text>
            <Schedule />
          </Box>
        </DropButton>
      </Box>
    </Grommet>
  );
};

const ConcernsTextArea = () => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
    theConcerns = event.target.value; // It's not clear where theConcerns comes from
  };

  return (
    <Grommet theme={theme}>
      <Box width="medium" height="xsmall">
        <TextArea
          placeholder="Enter your concerns..."
          value={value}
          onChange={onChange}
          fill
          required
        />
      </Box>
    </Grommet>
  );
};

const SymptomsTextArea = () => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
    theSymptoms = event.target.value;
  };

  return (
    <Grommet theme={theme}>
      <Box width="medium" height="xsmall">
        <TextArea
          placeholder="Enter your symptoms..."
          value={value}
          onChange={onChange}
          fill
          required
        />
      </Box>
    </Grommet>
  );
};

const DoctorsDropdown = () => {
  const [value, setValue] = useState();
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3001/docInfo");
      const data = await res.json();
      const arr = data.data.map(i => `${i.name} (${i.email})`);
      setDoctorsList(arr);
    };
    fetchData();
  }, []);

  const onChange = event => {
    setValue(event.value);
    const doc = event.value.match(/\((.*)\)/)[1];
    theDoc = doc;
  };

  return (
    <Select
      options={doctorsList}
      value={value}
      placeholder="Select Doctor"
      onChange={onChange}
      fill
      required
    />
  );
};
export { SymptomsTextArea, DoctorsDropdown };

function SchedulingAppt() {
  const [theTime, setTheTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [theDate, setTheDate] = useState('');
  const [theDoc, setTheDoc] = useState('');
  const [theConcerns, setTheConcerns] = useState('');
  const [theSymptoms, setTheSymptoms] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/userInSession')
      .then(res => res.json())
      .then(({ email }) => {
        fetch(`http://localhost:3001/checkIfApptExists?email=${email}&startTime=${theTime}&date=${theDate}&docEmail=${theDoc}`)
          .then(res => res.json())
          .then(({ data }) => {
            if (data[0]) {
              fetch('http://localhost:3001/genApptUID')
                .then(res => res.json())
                .then(({ id }) => {
                  fetch(`http://localhost:3001/schedule?time=${theTime}&endTime=${endTime}&date=${theDate}&concerns=${theConcerns}&symptoms=${theSymptoms}&id=${id}&doc=${theDoc}`)
                    .then(() => {
                      fetch(`http://localhost:3001/addToPatientSeeAppt?email=${email}&id=${id}&concerns=${theConcerns}&symptoms=${theSymptoms}`)
                        .then(() => {
                          window.alert('Appointment successfully scheduled!');
                        });
                    });
                });
            } else {
              window.alert('Appointment Clash! Try another doctor or date/time');
            }
          });
      });
  };

  return (
    <Grommet theme={theme} full>
      <AppBar>
        <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/">
          <Heading level='3' margin='none'>Hospital Management System</Heading>
        </a>
      </AppBar>
      <Box align="center" pad="small" gap="small">
        <Form onSubmit={handleSubmit}>
          <Box align="center" gap="small">
            <DoctorsDropdown onChange={setTheDoc} />
          </Box>
          <DateTimeDropButton
            onTimeChange={setTheTime}
            onEndTimeChange={setEndTime}
            onDateChange={setTheDate}
          />
          <ConcernsTextArea value={theConcerns} onChange={setTheConcerns} />
          <br />
          <SymptomsTextArea value={theSymptoms} onChange={setTheSymptoms} />
          <br />
          <Box align="center" pad="small" gap="small">
            <Button label="Attempt To Schedule" type="submit" primary />
          </Box>
        </Form>
      </Box>
    </Grommet>
  );
}

export default SchedulingAppt;
