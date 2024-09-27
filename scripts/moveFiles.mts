import fs from "fs";
import path from "path";

const fileList = [
  "D16_01_org.wmv",
  "D16_01_org.wmv",
  "MM_D14_09_org.wmv",
  "AK_D18_07org.wmv",
  "513_D27KW_org.wmv",
  "514_D27KW_org.wmv",
  "KW_D22_419_org.wmv",
  "IMG_9751org.jpg",
  "D17PWCz_1org.wmv",
  "D29WCzorg.wmv",
  "526D21org.jpg",
  "1005D15org.jpg",
  "511_D27KW_org.wmv",
  "518_D27KW_org.wmv",
  "D26_144org.jpg",
  "D42_5org.wmv",
  "WC_D17_33org.wmv",
  "WC_D17_36org.wmv",
  "WC_D17_38org.wmv",
  "MD_D5_10_ff_loorg_2.wmv",
  "R_101org.jpg",
  "R_110org.jpg",
  "R_132.jpg",
  "R_105org.jpg",
  "D10_12JSorg.wmv",
  "002TRAM2org.jpg",
  "003TRAM2org.jpg",
  "008TRAM1org.jpg",
  "013TRAM2org.wmv",
  "015TRAM1org.wmv",
  "016TRAM3org.wmv",
  "019TRAM1org.jpg",
  "021TRAM1org.jpg",
  "022TRAM1Porg.wmv",
  "022TRAM1Porg.wmv",
  "027TRAM3org.wmv",
  "028TRAM3org.wmv",
  "043TRAM3org.wmv",
  "043TRAM3org.wmv",
  "043TRAM3org.wmv",
  "046TRAM3org.jpg",
  "D26_120org.jpg",
  "D26_015org.jpg",
  "AK_D08-01_14_org_2.wmv",
  "AK_D10_37_org_2.wmv",
  "4363D15orgbm.jpg",
  "D15b_02-1_org.wmv",
  "IMG_9152orgbm.jpg",
  "AK_D19_27org.wmv",
  "WC_D17_03org2.wmv",
  "3914D15_aorgbm.jpg",
  "4122D15_aorgbm.jpg",
  "2716D14MM_aorgbm.jpg",
  "1433D14MMorgbm.jpg",
  "2C256.jpg",
  "2C259.jpg",
  "3C210.jpg",
  "3C253.jpg",
  "3C254.jpg",
  "3C256.jpg",
  "3C257.jpg",
  "3C261.jpg",
  "3C262.jpg",
  "4A116.jpg",
  "4A117.jpg",
  "4A118.jpg",
  "4A201.jpg",
  "4B101.jpg",
  "4B102.jpg",
  "4B104.jpg",
  "4B105.jpg",
  "4B302.jpg",
  "4B306.jpg",
  "4C203.jpg",
  "5C209.jpg",
  "5C225.jpg",
  "6C205.jpg",
  "3C212.jpg",
  "W12(174).wmv",
  "30040.jpg",
  "W11 korytarz z 005.jpg",
  "W11 korytarz z 003n.jpg",
  "W11 korytarz z 001.jpg",
  "W11 korytarz z 002n.jpg",
  "mgla3-ztPIC.jpg",
  "sniegidroga1-ztPIC.jpg",
  "sniegidroga2-ztPIC.jpg",
  "sniegidroga1-ztPIC.jpg",
  "sniegidroga2-ztPIC.jpg",
  "sniegidroga3-ztPIC.jpg",
  "TF19_2ujecie.wmv",
];

const args = process.argv;

if (!args[2]) {
  throw new Error("you need to specify source directory path");
}

if (!args[3]) {
  throw new Error("you need to specify destination directory path");
}

const [_, __, sourceDir, destDir] = args;

function moveFile(fileName: any) {
  const sourcePath = path.join(sourceDir, fileName);
  const destPath = path.join(destDir, fileName);

  fs.copyFile(sourcePath, destPath, (err: any) => {
    if (err) {
      console.error(`Failed to move file ${fileName}:`, err);
    } else {
      console.log(`Successfully moved file ${fileName}`);
    }
  });
}

fileList.forEach(moveFile);
