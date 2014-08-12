-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 15, 2014 at 05:30 PM
-- Server version: 5.1.37
-- PHP Version: 5.2.11

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `swaprojects`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `categories` varchar(240) NOT NULL,
  `location` varchar(80) NOT NULL,
  `map-ref` varchar(10) NOT NULL,
  `floor-area` smallint(8) NOT NULL,
  `co2` varchar(6) NOT NULL,
  `energy` varchar(6) NOT NULL,
  `completion` date NOT NULL,
  `awards` varchar(240) NOT NULL,
  `short-desctiption` varchar(240) NOT NULL,
  `long-description` varchar(1000) NOT NULL,
  `publications` varchar(240) NOT NULL,
  `meta-description` varchar(60) NOT NULL,
  `tags` varchar(400) NOT NULL,
  `rating` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` VALUES(1, 'the houl', '', 'Dalry, Castle Douglas, Scotland', '', 127, '-6', '-33', '2009-12-02', 'RIBA Award 2010, GIA Design Award 2010, Special Mention in the RIAS Andrew Doolan Best Building in Scotland Award 2011, Scottish Design Award 2011 commendation, Carbon Trust Awards 2012 nominee, Galvanizers Association Awards 2012 - Sustain', 'RIBA award winning, contemporary new build zero carbon home.', 'The house is sited in a natural concave area of hillside facing principally west along the contours to enjoy the spectacular landscape setting of the river Ken valley and the ridges of the Rhinns of Kells hills opposite. The intention was to create a contemporary single storey ?long house? which is recessive in the landscape, sustainable in its construction, very low in energy consumption, and aiming for zero net emissions of carbon dioxide for all energy use in the house.  T', 'Architects Journal, 22.09.11 & 16.06.11, Homes Interiors Scotland, april & october 2011, Wallpaper, Archdaily', '', 'interior design, natural materials, sustainability, self-sufficient, net zero carbon, microgeneration, renewable technology, comfort, innova', 1);
INSERT INTO `projects` VALUES(2, 'Darjeeling/Taigh Sonas', '', 'Kippford, Solway Coast', '', 127, '13', '73', '2013-06-14', 'GIA Design Award 2013', 'Demolition of existing single storey house and the erection of a replacement dwelling house with 2 storeys and a basement. ', 'This development comprises the demolition of the existing single storey house and the erection of a replacement dwelling house which will be two storeys with a basement. The existing house does not fulfil the client''s needs in terms of size, design and situation within the plot.  Whilst the new house will be larger than the existing house, it has been designed to be of an appropriate scale and form in relation to the surrounding properties. In terms of residential amenity, th', 'Homes Interiors Scotland January', '', 'interior design, living, detail construction, natural materials, sustainability, renewable technology, research, comfort, innovating, flexab', 1);
