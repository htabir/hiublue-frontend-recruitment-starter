# Hiublue Frontend Recruitment

![Next.js](https://img.shields.io/badge/Next.js-15.0.0-blue)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)

## Overview

This is a frontend recruitment project for Hiublue, built using Next.js and React. It incorporates Material UI, React Hook Form, and other modern web development tools.

## Features

- Built with **Next.js 15** and **React 19**
- UI components powered by **Material UI**
- Form handling with **React Hook Form** and validation via **Yup**
- Charts and data visualization using **ApexCharts**
- State management with **Lodash** and **Day.js** for date handling

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: v18+)
- [pnpm](https://pnpm.io/) (Package Manager)

## Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_LIVE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://dummy-1.hiublue.com
```

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/shakil-ahmed-billal/hiublue-frontend-recruitment-starter.git
cd hiublue-frontend-recruitment
pnpm install
```

## Running the Application

To start the development server:

```sh
pnpm dev
```

To build the application for production:

```sh
pnpm build
```

To start the production server:

```sh
pnpm start
```

## Linting

Run ESLint to check for code quality:

```sh
pnpm lint
```

## Testing

Currently, this project does not include tests, but you can set up Jest or Cypress as needed.

## Contribution

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your branch and create a PR

## License

This project is private and not licensed for public use.

