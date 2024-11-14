import Router from "express-promise-router";
import { sendImage, streamVideo, allowedMediaExtensions } from "./media";

const router = Router();

router.get("/:fileName", (req, res) => {
  const { fileName } = req.params;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  if (allowedMediaExtensions.includes(fileExtension)) {
    if (fileExtension === "jpg") {
      sendImage(req, res);
    } else {
      streamVideo(req, res);
    }
  } else {
    const errorMessage =
      "wrong media extension. Supported extensions are: " +
      allowedMediaExtensions.join(", ");
    console.error(errorMessage);
    res.status(400).send(errorMessage);
  }
});

export default router;
