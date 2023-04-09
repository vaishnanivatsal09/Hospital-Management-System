-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2023 at 07:02 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hms`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `starttime` time NOT NULL,
  `endtime` time NOT NULL,
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `date`, `starttime`, `endtime`, `status`) VALUES
(1, '2019-01-15', '09:00:00', '10:00:00', 'Done'),
(2, '2019-01-16', '10:00:00', '11:00:00', 'Done'),
(3, '2019-01-18', '14:00:00', '15:00:00', 'Done'),
(4, '2023-04-11', '12:00:00', '13:00:00', 'NotDone'),
(5, '2023-04-19', '12:00:00', '13:00:00', 'NotDone'),
(6, '2023-04-19', '08:00:00', '09:00:00', 'Done'),
(8, '2023-04-25', '11:00:00', '12:00:00', 'NotDone'),
(9, '2023-04-18', '07:00:00', '08:00:00', 'NotDone'),
(10, '2023-04-25', '05:00:00', '06:00:00', 'NotDone');

-- --------------------------------------------------------

--
-- Table structure for table `diagnose`
--

CREATE TABLE `diagnose` (
  `appt` int(11) NOT NULL,
  `doctor` varchar(50) NOT NULL,
  `diagnosis` varchar(40) NOT NULL,
  `prescription` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diagnose`
--

INSERT INTO `diagnose` (`appt`, `doctor`, `diagnosis`, `prescription`) VALUES
(6, 'draxay@gmail.com', ' undefined', '  undefined'),
(8, 'draxay@gmail.com', 'Not Yet Diagnosed', 'Not Yet Diagnosed'),
(9, 'drtest@gmail.com', 'Not Yet Diagnosed', 'Not Yet Diagnosed'),
(10, 'drtest@gmail.com', 'Not Yet Diagnosed', 'Not Yet Diagnosed');

-- --------------------------------------------------------

--
-- Table structure for table `docshaveschedules`
--

CREATE TABLE `docshaveschedules` (
  `sched` int(11) NOT NULL,
  `doctor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `email` varchar(50) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`email`, `gender`, `password`, `name`) VALUES
('draxay@gmail.com', 'Male', 'draxay@1234', 'Dr. Axay Patel'),
('drtest@gmail.com', 'Male', 'drtest@1234', 'Dr. Test');

-- --------------------------------------------------------

--
-- Table structure for table `doctorviewshistory`
--

CREATE TABLE `doctorviewshistory` (
  `history` int(11) NOT NULL,
  `doctor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medicalhistory`
--

CREATE TABLE `medicalhistory` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `conditions` varchar(100) NOT NULL,
  `surgeries` varchar(100) NOT NULL,
  `medication` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicalhistory`
--

INSERT INTO `medicalhistory` (`id`, `date`, `conditions`, `surgeries`, `medication`) VALUES
(1, '2023-01-14', 'Pain in abdomen', 'Heart Surgery', 'Crocin'),
(2, '2023-01-14', 'Frequent Indigestion', 'none', 'none'),
(3, '2023-01-14', 'Body Pain', 'none', 'Iodex'),
(4, '2023-04-02', 'undefined', 'undefined', 'undefined'),
(5, '2023-04-08', 'undefined', 'undefined', 'undefined'),
(6, '2023-04-09', 'undefined', 'undefined', 'undefined'),
(7, '2023-04-09', 'undefined', 'undefined', 'undefined');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `email` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(60) NOT NULL,
  `gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`email`, `password`, `name`, `address`, `gender`) VALUES
('bandhan@gmail.com', 'bandhan@1234', 'Bandhan Kalkani', 'Amreli', 'Male'),
('kavin@gmail.com', 'kavin@1234', 'kavin pativala', 'patana', 'Male'),
('shahnawaz@gmail.com', 'shahnawaz@1234', 'Shahnawaz Karatela', 'Porbandar', 'Male'),
('vatsal@gmail.com', 'vatsal@1234', 'vatsal vaishnani', 'Rajkot', 'male');

-- --------------------------------------------------------

--
-- Table structure for table `patientsattendappointments`
--

CREATE TABLE `patientsattendappointments` (
  `patient` varchar(50) NOT NULL,
  `appt` int(11) NOT NULL,
  `concerns` varchar(40) NOT NULL,
  `symptoms` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patientsattendappointments`
--

INSERT INTO `patientsattendappointments` (`patient`, `appt`, `concerns`, `symptoms`) VALUES
('bandhan@gmail.com', 9, 'abc', 'xyz'),
('kavin@gmail.com', 8, 'Tav', 'sardi'),
('shahnawaz@gmail.com', 10, 'abc', 'xyz'),
('vatsal@gmail.com', 6, 'infection', 'fever');

-- --------------------------------------------------------

--
-- Table structure for table `patientsfillhistory`
--

CREATE TABLE `patientsfillhistory` (
  `patient` varchar(50) NOT NULL,
  `history` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patientsfillhistory`
--

INSERT INTO `patientsfillhistory` (`patient`, `history`) VALUES
('bandhan@gmail.com', 6),
('kavin@gmail.com', 5),
('shahnawaz@gmail.com', 7),
('vatsal@gmail.com', 4);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `starttime` time NOT NULL,
  `endtime` time NOT NULL,
  `breaktime` time NOT NULL,
  `day` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `starttime`, `endtime`, `breaktime`, `day`) VALUES
(1, '09:00:00', '17:00:00', '12:00:00', 'Friday'),
(1, '09:00:00', '17:00:00', '12:00:00', 'Saturday'),
(1, '09:00:00', '17:00:00', '12:00:00', 'Sunday'),
(1, '09:00:00', '17:00:00', '12:00:00', 'Tuesday'),
(2, '09:00:00', '17:00:00', '12:00:00', 'Friday'),
(2, '09:00:00', '17:00:00', '12:00:00', 'Wednesday');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `diagnose`
--
ALTER TABLE `diagnose`
  ADD PRIMARY KEY (`appt`,`doctor`),
  ADD KEY `doctor` (`doctor`);

--
-- Indexes for table `docshaveschedules`
--
ALTER TABLE `docshaveschedules`
  ADD PRIMARY KEY (`sched`,`doctor`),
  ADD KEY `doctor` (`doctor`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `doctorviewshistory`
--
ALTER TABLE `doctorviewshistory`
  ADD PRIMARY KEY (`history`,`doctor`),
  ADD KEY `doctor` (`doctor`);

--
-- Indexes for table `medicalhistory`
--
ALTER TABLE `medicalhistory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `patientsattendappointments`
--
ALTER TABLE `patientsattendappointments`
  ADD PRIMARY KEY (`patient`,`appt`),
  ADD KEY `appt` (`appt`);

--
-- Indexes for table `patientsfillhistory`
--
ALTER TABLE `patientsfillhistory`
  ADD PRIMARY KEY (`history`),
  ADD KEY `patient` (`patient`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`,`starttime`,`endtime`,`breaktime`,`day`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `diagnose`
--
ALTER TABLE `diagnose`
  ADD CONSTRAINT `diagnose_ibfk_1` FOREIGN KEY (`appt`) REFERENCES `appointment` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `diagnose_ibfk_2` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `docshaveschedules`
--
ALTER TABLE `docshaveschedules`
  ADD CONSTRAINT `docshaveschedules_ibfk_1` FOREIGN KEY (`sched`) REFERENCES `schedule` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `docshaveschedules_ibfk_2` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `doctorviewshistory`
--
ALTER TABLE `doctorviewshistory`
  ADD CONSTRAINT `doctorviewshistory_ibfk_1` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `doctorviewshistory_ibfk_2` FOREIGN KEY (`history`) REFERENCES `medicalhistory` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `patientsattendappointments`
--
ALTER TABLE `patientsattendappointments`
  ADD CONSTRAINT `patientsattendappointments_ibfk_1` FOREIGN KEY (`patient`) REFERENCES `patient` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `patientsattendappointments_ibfk_2` FOREIGN KEY (`appt`) REFERENCES `appointment` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `patientsfillhistory`
--
ALTER TABLE `patientsfillhistory`
  ADD CONSTRAINT `patientsfillhistory_ibfk_1` FOREIGN KEY (`patient`) REFERENCES `patient` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `patientsfillhistory_ibfk_2` FOREIGN KEY (`history`) REFERENCES `medicalhistory` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
