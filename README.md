# Backend for Testy Kierowcy web application

You can view frontend repository for this project following this link: \
https://github.com/RafalM3211/testy-kierowcy-frontend

## Available Scripts

In the project directory, you can run:

### `npm run server`

Runs application backend

### `npm run convert-wmv`

Converts all .wmv videos to .mp4 in provided directory. This script is a batch file so it works only on windows. Migration to node script is planned in future.
All official driving license question medias are stored on [goverment driving license site](https://www.gov.pl/web/infrastruktura/prawo-jazdy) and all video files there have .wmv extension which is not supported in browsers.

### `npm run build-server`

Builds the app for production to the `build` folder
