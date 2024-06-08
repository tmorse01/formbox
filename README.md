# Formbox

Formbox is a comprehensive solution for creating, sending, and assessing online surveys with real-time results. It is built using React and TypeScript.

## Features

- Completely customizable forms for creating surveys that can be saved
- Sharable links to collect responses
- Auth for tracking responses to your surveys
- Refresh token system to automatically keep you logged in with a short expiration on the JWT access token

## Project Structure

- `src/`: This is where the main application code resides.
- `public/`: This directory contains static files that are not processed by Webpack.
- `build/`: This directory is generated when you run `npm run build`. It contains the production-ready version of the application.

## Running the Application

- Development mode: Run `npm start` to start the development server and open the application in your default web browser.
- Production mode: Run `npm run build` to create an optimized build.

## Live website

This website is live at https://formboxapp.com/

## Third-Party Libraries

The project uses a number of third-party libraries, including `@emotion/react`, `@emotion/styled`, `@mui/material`, `@mui/icons-material`, `react-hook-form`, `react-router-dom`, `redux`, `uuid`, and `vanilla-jsoneditor`.
