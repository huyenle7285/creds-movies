## System requirements

Node version >= 19.8.1

## Getting Started

Run project local:
Install dependencies:

```bash
yarn
```

Start application:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Run Unit test

```bash
yarn test -u
```

## Projects structure

```bash
component: reused components
```

```bash
services: service to call api
```

```bash
store: implementation of redux store
```

```bash
types: declare models which is used in project
```

```bash
utils: utility functions and constants
```

## Projects routes

```bash
/: home page
```

```bash
/detail?id={movie_id}: movie detail page
```

```bash
/type?type={movie_type}: list of movies by type
```
