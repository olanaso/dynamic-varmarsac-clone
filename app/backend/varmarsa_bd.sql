-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 28-05-2026 a las 23:47:43
-- Versión del servidor: 11.4.10-MariaDB-cll-lve
-- Versión de PHP: 8.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `varmarsa_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones_vehiculares`
--

CREATE TABLE `asignaciones_vehiculares` (
  `id` int(11) NOT NULL,
  `conductor_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_limite` date NOT NULL,
  `estado` enum('activa','cancelada') NOT NULL DEFAULT 'activa',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `asignaciones_vehiculares`
--

INSERT INTO `asignaciones_vehiculares` (`id`, `conductor_id`, `vehicle_id`, `fecha_inicio`, `fecha_limite`, `estado`, `createdAt`, `updatedAt`) VALUES
(1, 1, 3, '2026-05-07', '2026-05-21', 'activa', '2026-05-26 01:18:27', '2026-05-26 01:18:27'),
(6, 3, 5, '2026-05-26', '2026-05-28', 'activa', '2026-05-26 02:21:08', '2026-05-26 02:21:08'),
(7, 2, 1, '2026-05-25', '2026-05-25', 'activa', '2026-05-26 03:02:58', '2026-05-26 03:02:58'),
(9, 1, 1, '2026-05-27', '2026-05-27', 'activa', '2026-05-27 04:25:35', '2026-05-27 04:25:35'),
(12, 1, 18, '2026-05-28', '2026-05-29', 'activa', '2026-05-28 16:28:25', '2026-05-28 16:28:25'),
(13, 2, 18, '2026-05-28', '2026-05-30', 'activa', '2026-05-28 16:28:45', '2026-05-28 16:28:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `is_active`, `createdAt`, `updatedAt`) VALUES
(1, 'Sedan', 'Compact and mid-size sedans', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(2, 'Pickup Truck', 'Light and heavy duty trucks', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(3, 'SUV', 'Sport utility vehicles', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(5, 'Motorcycle', 'Sport and touring motorcycles', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(6, 'Electric', 'Fully electric and plug-in hybrid vehicles', 1, '2026-05-23 16:52:04', '2026-05-26 04:10:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductores`
--

CREATE TABLE `conductores` (
  `id` int(11) NOT NULL,
  `nombre_completo` varchar(200) NOT NULL,
  `numero_documento` varchar(30) NOT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `conductores`
--

INSERT INTO `conductores` (`id`, `nombre_completo`, `numero_documento`, `celular`, `createdAt`, `updatedAt`) VALUES
(1, 'Erick', 'S70021899', '978868159', '2026-05-23 17:00:41', '2026-05-23 17:00:41'),
(2, 'Jose', 'S700218992', '978868159', '2026-05-26 02:11:36', '2026-05-27 05:00:47'),
(3, 'Juan', '123456789', '123', '2026-05-26 02:13:08', '2026-05-27 05:00:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_types`
--

CREATE TABLE `service_types` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `service_types`
--

INSERT INTO `service_types` (`id`, `name`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Transporte de Pasajeros', 1, '2026-05-23 16:52:04', '2026-05-26 01:19:40'),
(2, 'Carga y Logística', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(3, 'Turismo y Recreación', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(4, 'Ejecutivo Empresarial', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(5, 'Transporte Escolar', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(6, 'Mudanzas', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(7, 'Aeropuerto', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(8, 'Mensajería', 1, '2026-05-23 16:52:04', '2026-05-23 16:52:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT 1,
  `nombre_completo` varchar(200) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `numero_documento` varchar(30) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `is_active`, `nombre_completo`, `celular`, `numero_documento`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@barmar.com', '$2a$12$IM.WFgxW.GsfqDQPp.2WC.el496jbSoHumGNcUJGgchwbnkoBlYVm', 'admin', 1, NULL, NULL, NULL, '2026-05-23 16:52:03', '2026-05-23 16:52:03'),
(2, 'jorge@barmar.com', '$2a$12$.ZifG6b7oKoKUI9NEBIjLO/BtUt01vDdCGLdnUiky7ac7O37QWScS', 'user', 1, NULL, NULL, NULL, '2026-05-23 16:52:04', '2026-05-23 16:52:04'),
(5, 'admin@gmail.com', '$2a$12$l8RIdI.ckU2Co1PtYhAAiOsIX/8.e0ASUhPWKL4hIjtmcQqSZEPEK', 'admin', 1, 'admin', '123456789', '123456798', '2026-05-26 01:42:46', '2026-05-27 04:58:05'),
(6, 'ericksescalanteolano@gmail.com', '$2a$12$fin6u8nOScaf5iJdPfTY6Odarw6Va32iDhNwTChyb6prZEbBhkwfy', 'admin', 1, 'JOSE', '94566565', '12345677', '2026-05-28 01:25:30', '2026-05-28 01:25:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `make` varchar(100) NOT NULL,
  `registration_number` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL,
  `year` smallint(5) UNSIGNED NOT NULL,
  `daily_rate` decimal(10,2) NOT NULL,
  `precio_mensual` decimal(10,2) NOT NULL,
  `cantidad_pasajeros` smallint(5) UNSIGNED NOT NULL,
  `tipo_transmision` enum('MANUAL','AUTOMATICA') NOT NULL,
  `tipo_combustible` enum('GASOLINA','DIESEL','ELECTRICO','HIBRIDO','GNV','GLP') NOT NULL,
  `tipo_traccion` enum('DELANTERA','TRASERA','AWD','4X4','4X2') NOT NULL,
  `current_mileage` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `kilometraje_mantenimiento` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('AVAILABLE','RENTED','MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE',
  `is_approved` tinyint(1) DEFAULT 0,
  `homologado` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `equipamiento` longtext NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `make`, `registration_number`, `category_id`, `year`, `daily_rate`, `precio_mensual`, `cantidad_pasajeros`, `tipo_transmision`, `tipo_combustible`, `tipo_traccion`, `current_mileage`, `kilometraje_mantenimiento`, `status`, `is_approved`, `homologado`, `image`, `description`, `equipamiento`, `createdAt`, `updatedAt`) VALUES
(1, 'Civic Sport', 'Honda', 'DEF-5678', 1, 2022, 45.00, 1125.00, 5, 'AUTOMATICA', 'GASOLINA', 'DELANTERA', 28000, NULL, 'AVAILABLE', 1, 0, '2a9f739a367ceccae53f781b.webp', 'Turbo 1.5, sunroof, apple carplay', '[]', '2026-05-23 16:52:04', '2026-05-26 03:39:16'),
(2, 'Fortuner 2.8 Adventure D-LUX 4X4 AT', 'Toyota', 'JKL-3456', 2, 2021, 40.00, 1000.00, 5, 'AUTOMATICA', 'GASOLINA', '4X4', 42000, 42002, 'AVAILABLE', 1, 0, '9dfa049451a02658e192121a.jpg', 'Automatic, backup camera, lane assist', '[\"tolva\"]', '2026-05-23 16:52:04', '2026-05-26 03:40:26'),
(3, 'Hiace', 'Toyota', 'MNO-7890', 1, 2023, 38.00, 950.00, 14, 'MANUAL', 'GASOLINA', '4X2', 11000, NULL, 'RENTED', 1, 0, 'cb48434f8a27459b4fd618ec.jpg', 'Sporty trim, apple carplay, android auto', '[]', '2026-05-23 16:52:04', '2026-05-24 02:31:38'),
(4, 'HILUX 4X4 D/C 1GD SR', 'Toyota', 'ABC-1234', 2, 2023, 85.00, 2125.00, 5, 'MANUAL', 'GASOLINA', '4X4', 12400, NULL, 'AVAILABLE', 1, 0, '46897c2964b0dc05f07da70e.png', 'Full option, leather seats, 4x4', '[]', '2026-05-23 16:52:04', '2026-05-26 03:35:00'),
(5, 'MITSUBISHI L200', 'MITSUBICHI', 'PQR-1122', 2, 2023, 95.00, 2375.00, 5, 'MANUAL', 'GASOLINA', '4X4', 8500, NULL, 'AVAILABLE', 1, 0, 'f263961601bc53cfa524c2c0.webp', '4x4, off-road package, tow package', '[]', '2026-05-23 16:52:04', '2026-05-24 02:36:13'),
(6, 'Toyota Yaris', 'Toyota', 'STU-3344', 1, 2022, 70.00, 600.00, 5, 'AUTOMATICA', 'GASOLINA', '4X4', 31000, NULL, 'MAINTENANCE', 1, 0, '38e98b7646667bbe95ef5fe1.jpg', 'Diesel 4x4, currently in scheduled maintenance', '[]', '2026-05-23 16:52:04', '2026-05-24 02:33:53'),
(7, 'RUSH 1.5', 'Toyota', 'GHI-9012', 3, 2025, 180.00, 4500.00, 7, 'AUTOMATICA', 'GASOLINA', 'DELANTERA', 3200, NULL, 'RENTED', 1, 0, 'fbd7da7d0334c8b847144fa2.webp', 'Pending approval – dealer submission', '[]', '2026-05-23 16:52:04', '2026-05-26 03:33:31'),
(8, 'RAV-4  2.8L', 'Toyota', 'VWX-5566', 3, 2022, 75.00, 1875.00, 5, 'AUTOMATICA', 'GASOLINA', '4X2', 24000, NULL, 'AVAILABLE', 1, 0, '605ba8790c612c2f60cbddd1.jpg', 'AWD, panoramic roof, JBL audio', '[]', '2026-05-23 16:52:04', '2026-05-24 02:29:40'),
(9, 'Tucson N-Line', 'Hyundai', 'YZA-7788', 3, 2023, 68.00, 1700.00, 5, 'AUTOMATICA', 'GASOLINA', 'DELANTERA', 17500, NULL, 'AVAILABLE', 1, 0, '1481e6e22ad77cbd4dd2b323.png', 'Turbo hybrid, sport design package', '[]', '2026-05-23 16:52:04', '2026-05-24 02:41:50'),
(18, 'Electric', 'Fuso', 'ABC-132', 6, 2016, 50.00, 6000.00, 5, 'MANUAL', 'GASOLINA', '4X2', 0, 500, 'RENTED', 1, 0, NULL, '', '[\"WIFI\"]', '2026-05-28 16:14:35', '2026-05-28 16:14:51'),
(21, 'Electric', 'Fuso', '123ASDV', 6, 2015, 10.00, 5000.00, 6, 'MANUAL', 'DIESEL', '4X4', 0, 2000, 'AVAILABLE', 1, 0, NULL, '', '[]', '2026-05-28 16:33:00', '2026-05-28 16:33:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicle_service_types`
--

CREATE TABLE `vehicle_service_types` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `vehicle_service_types`
--

INSERT INTO `vehicle_service_types` (`createdAt`, `updatedAt`, `vehicle_id`, `service_type_id`) VALUES
('2026-05-26 03:39:16', '2026-05-26 03:39:16', 1, 3),
('2026-05-26 03:39:16', '2026-05-26 03:39:16', 1, 4),
('2026-05-26 03:39:16', '2026-05-26 03:39:16', 1, 5),
('2026-05-23 18:01:40', '2026-05-23 18:01:40', 1, 7),
('2026-05-26 03:40:26', '2026-05-26 03:40:26', 2, 1),
('2026-05-26 03:40:26', '2026-05-26 03:40:26', 2, 2),
('2026-05-26 03:40:26', '2026-05-26 03:40:26', 2, 4),
('2026-05-26 03:40:26', '2026-05-26 03:40:26', 2, 5),
('2026-05-24 02:25:33', '2026-05-24 02:25:33', 4, 1),
('2026-05-24 02:29:40', '2026-05-24 02:29:40', 8, 7),
('2026-05-28 16:14:35', '2026-05-28 16:14:35', 18, 7),
('2026-05-28 16:14:35', '2026-05-28 16:14:35', 18, 8);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignaciones_vehiculares`
--
ALTER TABLE `asignaciones_vehiculares`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conductor_id` (`conductor_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `name_3` (`name`),
  ADD UNIQUE KEY `name_4` (`name`),
  ADD UNIQUE KEY `name_5` (`name`);

--
-- Indices de la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_documento` (`numero_documento`),
  ADD UNIQUE KEY `numero_documento_2` (`numero_documento`),
  ADD UNIQUE KEY `numero_documento_3` (`numero_documento`),
  ADD UNIQUE KEY `numero_documento_4` (`numero_documento`);

--
-- Indices de la tabla `service_types`
--
ALTER TABLE `service_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `name_3` (`name`),
  ADD UNIQUE KEY `name_4` (`name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`);

--
-- Indices de la tabla `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `registration_number` (`registration_number`),
  ADD UNIQUE KEY `registration_number_2` (`registration_number`),
  ADD UNIQUE KEY `registration_number_3` (`registration_number`),
  ADD UNIQUE KEY `registration_number_4` (`registration_number`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `vehicle_service_types`
--
ALTER TABLE `vehicle_service_types`
  ADD PRIMARY KEY (`vehicle_id`,`service_type_id`),
  ADD KEY `service_type_id` (`service_type_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignaciones_vehiculares`
--
ALTER TABLE `asignaciones_vehiculares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `conductores`
--
ALTER TABLE `conductores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `service_types`
--
ALTER TABLE `service_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignaciones_vehiculares`
--
ALTER TABLE `asignaciones_vehiculares`
  ADD CONSTRAINT `asignaciones_vehiculares_ibfk_7` FOREIGN KEY (`conductor_id`) REFERENCES `conductores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asignaciones_vehiculares_ibfk_8` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehicle_service_types`
--
ALTER TABLE `vehicle_service_types`
  ADD CONSTRAINT `vehicle_service_types_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicle_service_types_ibfk_2` FOREIGN KEY (`service_type_id`) REFERENCES `service_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
