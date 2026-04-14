# Backend for Testy Kierowcy web application

You can view frontend repository for this project following this link: \
https://github.com/RafalM3211/testy-kierowcy-frontend

## Running the backend

Install packages
`npm i`

Run docker containers
`docker compose up`

Download question videos and images from [here](https://mega.nz/file/KwRxCS7b#I6PoBCHd47O26Ot2m8zJ-Smp_5FmPU5CyioiPpI7pWs). If you don't want to download assets, you don't have to - the app can still run without these.

Unpack assets and move them to src/assets/question-media

Run backend server
`npm start`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs application backend

### `npm run build`

Builds the app for production to the `build` folder

### `npm run convert-wmv`

Converts all .wmv videos to .mp4 in provided directory. This script is a batch file so it works only on windows. Migration to node script is planned in future.
All official driving license question medias are stored on [goverment driving license site](https://www.gov.pl/web/infrastruktura/prawo-jazdy) and all video files there have .wmv extension which is not supported in browsers.


