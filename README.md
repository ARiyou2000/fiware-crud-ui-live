## [Get Root Project](https://github.com/ARiyou2000/fiware-crud-expample/)
This project will run over FIWARE CRUD Exaple project. fist clone base project!
___

## Getting Started
1. Clone project:
```bash
git clone https://github.com/ARiyou2000/fiware-crud-ui-live
```

2. Install required dependencies:
```bash
npm  install
# or
yarn install
```
3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3011](http://localhost:3011) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

This project will use orion and `port:1026` for requests. if you are using scorpio, consider changing port at index.js: `getData` and `useSWR` methods
