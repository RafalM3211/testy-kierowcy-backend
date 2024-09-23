import fs from "fs";
import path from "path";

const fileList = ["GM_W16(323).wmv"]; // put files here

const sourceDir = "C:\\path\\to\\your\\directory";
const destDir = "C:\\path\\to\\your\\directory";

function moveFile(fileName: any) {
  const sourcePath = path.join(sourceDir, fileName);
  const destPath = path.join(destDir, fileName);

  fs.rename(sourcePath, destPath, (err: any) => {
    if (err) {
      console.error(`Failed to move file ${fileName}:`, err);
    } else {
      console.log(`Successfully moved file ${fileName}`);
    }
  });
}

fileList.forEach(moveFile);
