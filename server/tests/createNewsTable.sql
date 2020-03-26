

CREATE TABLE `nyheter` (
  `id` int(2) NOT NULL,
  `overskrift` varchar(60) NOT NULL,
  `innhold` longtext NOT NULL,
  `tidspunkt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bilde` longtext NOT NULL,
  `kategori` varchar(30) NOT NULL,
  `viktighet` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;