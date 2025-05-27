# Laboratorio de Seguridad Web: Login Vulnerable a SQLi

Este proyecto es una aplicación educativa diseñada para demostrar y mejorar la seguridad en un sistema de login vulnerable a inyección SQL (SQLi). El objetivo es implementar ciertas mejoras como ORM, validación de parámetros, entre otros.

## Estructura del Proyecto

- **backend/**: API REST construida con [NestJS](https://nestjs.com/), conectada a una base de datos MySQL.
- **frontend/cliente/**: Interfaz de usuario desarrollada en [React](https://react.dev/).

## Características

- Login de usuarios con validación básica.
- Listado y búsqueda de usuarios.
- Implementación de conexión a DB por medio de un ORM.
- Código preparado para implementar mejoras de seguridad.

## Instalación

### 1. Clona el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd lab-seguridad

```

### 2. Configurar el Backend

```bash
cd backend
npm install
# Configura las variables de entorno en .env (ver ejemplo en README del backend)
npm run start

```

### 3. Configurar el Frontend

```bash
cd ../frontend/cliente
npm install
npm start

```
