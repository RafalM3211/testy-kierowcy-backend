import { createReadStream, statSync, existsSync } from "fs";
import type { EndpointHandler, Res } from "../types";

export const allowedMediaExtensions = ["jpg", "mp4"];

export const streamVideo: EndpointHandler = function (req, res) {
  const { fileName } = req.params;
  const rangee = req.headers.range;
  if (rangee === undefined) {
    console.error("Range header is not provided");
    /* res.status(400).send("Range header is not provided"); */
  } else {
    const filePath = buildFilePath(fileName);
    if (!existsSync(filePath)) {
      sendFileNotFoundError(res, fileName);
    }
    const range = rangee || "0";
    const fileSize = statSync(filePath).size;
    const chunkSize = 10 ** 6; //1Mb
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, fileSize - 1);
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Content-Length": end - start + 1,
      "Accept-Ranges": "bytes",
      "Content-Type": "video/mp4",
    });
    const stream = createReadStream(filePath, { start, end });
    stream.pipe(res);
  }
};

export const sendImage: EndpointHandler = function (req, res) {
  const { fileName } = req.params;
  const filePath = buildFilePath(fileName);
  if (!existsSync(filePath)) {
    sendFileNotFoundError(res, fileName);
  }
  const fileSize = statSync(filePath).size;
  res.writeHead(200, {
    "Content-Length": fileSize,
    "Content-Type": "image/jpg",
  });
  const stream = createReadStream(filePath);
  stream.pipe(res);
};

function sendFileNotFoundError(res: Res, fileName: string) {
  const errorMessage = `file ${fileName} not found in database`;
  console.error(errorMessage);
  res.status(404).send(errorMessage);
}

function buildFilePath(fileName: string) {
  const currentDir = __dirname;
  const buildDir = "build";
  const projectDir = currentDir.slice(0, currentDir.lastIndexOf(buildDir));

  return projectDir + "src/assets/question-media/" + fileName;
}
