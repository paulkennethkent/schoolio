# Schoolio

A simple CRUD application for schools using React + Rust.

## Stack

### Frontend

- Vite
- Typescript
- React Query
- React Router
- Tailwind
- DaisyUI

### Backend

- Axum
- In-memory DB

## Getting started

### Backend

To start the server:

```
cd ./backend
cargo run
```

This will start the server on port `8000`.

Note: A cors policy has been added to allow a frontend to make request from port `5173`.

### Frontend

First install the node packages

```
cd ./frontend
npm install
```

Then run

```
npm run dev
```

You will then be able to access the frontend on `http://localhost:5173/`

## Testing

### Backend

A small set of tests have been added using axum-test-helper

```
cd ./backend
cargo test
```

### Frontend

TODO
