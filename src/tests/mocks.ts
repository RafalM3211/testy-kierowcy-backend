import * as path from "path";
import * as fs from "fs";
import { rest } from "msw";
import { basic } from "./dummyQuestion/dummyQuestions";

const originalLocation = window.location;

declare const window: {
  location?: Location;
};

export const mockWindowLocation = () => {
  delete window.location;

  window.location = Object.defineProperties(originalLocation, {
    ...Object.getOwnPropertyDescriptors(originalLocation),
  });
};

export const restoreWindowLocation = () => {
  window.location = originalLocation;
};

const apiUrl = process.env.REACT_APP_SERVER_URL;

//todo: wywal wideo z media endpointu bo i tak trzeba mockowac video.

export const handlers = [
  rest.get(apiUrl + "question", (req, res, ctx) => {
    console.log("mocked!");
    return res(ctx.json(basic), ctx.delay(0), ctx.status(200));
  }),
  rest.get(apiUrl + "resetEgzamSession", (req, res, ctx) => {
    console.log("mocked session reset!");
    return res(ctx.delay(0), ctx.status(200));
  }),
  rest.get(apiUrl + "media/:fileName", (req, res, ctx) => {
    console.log("mock media");
    const { fileName } = req.params;

    const imageBuffer = fs.readFileSync(
      path.resolve(__dirname, "../fixtures/image.jpg")
    );

    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/jpeg"),
      ctx.body(imageBuffer)
    );
  }),
];
