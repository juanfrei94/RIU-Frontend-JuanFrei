# RiuFrontendJuanfrei

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.3.

Make sure you have this versions before according to https://angular.dev/reference/versions
Angular	  Node.js	                          TypeScript	      RxJS
20.0.x	^20.19.0 || ^22.12.0 || ^24.0.0	    >=5.8.0 <5.9.0	  ^6.5.3 || ^7.4.0

## Development server

To start a local development server, run:

```
npm run backend
ng serve -o
```

This SPA uses a fake backend with json-server to serve the APIs

## Test
Application tested with Karma/Jasmine

```
"test": "ng test",
"test:coverage": "ng test --watch=false --browsers=ChromeHeadless --code-coverage"
```

<img width="513" height="131" alt="image" src="https://github.com/user-attachments/assets/b3c6bfdc-b196-4cab-aef7-42e9ab3c4d15" />

## Docker

1 - Clone the repository and move to the project root directory.
2 - Run the following command to build the images and deploy the services:
```
docker-compose up --build
```

### What this docker has:

Service 	              URL	                    Description
Frontend (Angular)	    http://localhost:4200	  Web interface via NGINX
Backend (JSON Server)	  http://localhost:3000	  fake API simluted in db.json

### To stop container:
```
docker-compose down
```
