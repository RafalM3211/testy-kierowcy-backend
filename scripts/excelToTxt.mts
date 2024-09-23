import * as XLSX from "xlsx";
import * as fs from "fs";
import { getDirname } from "../src/server/helpers.mjs";
import { Readable } from "stream";
import type { RawQuestionRecord } from "../src/server/types.mjs";

interface UntranslatedQuestionRecord {
  "Numer pytania": number;
  Pytanie: string;
  "Odpowiedź A": string;
  "Odpowiedź B": string;
  "Odpowiedź C": string;
  "Poprawna odp": string;
  Media: string;
  "Zakres struktury": "PODSTAWOWY" | "SPECJALISTYCZNY";
  "Liczba punktów": 1 | 2 | 3;
  Kategorie: string;
}

interface FullUntranslatedQuestionRecord extends UntranslatedQuestionRecord {
  Lp: number;
  [key: string]: string | number;
}

XLSX.set_fs(fs);
XLSX.stream.set_readable(Readable);

//const dirName = getDirname(import.meta.url);

const args = process.argv;
if (!args[2]) {
  throw new Error("you need to specify calc file path");
}
const excelPath = args[2];
const excelDir = excelPath.slice(0, excelPath.lastIndexOf("\\"));

const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const questionsSheet = workbook.Sheets[sheetName];
const rawQuestions = XLSX.utils.sheet_to_json(
  questionsSheet
) as FullUntranslatedQuestionRecord[];

let questionsCsvContent = "";
let categoriesCsvContent = "";

rawQuestions.forEach((question, index) => {
  try {
    const extracredFields = extractQuestionFields(question);
    const preparedQuestion = translateQuestionFieldsAndValues(extracredFields);

    console.log(preparedQuestion);

    questionsCsvContent += createCsvQuestionRecord(preparedQuestion);

    const categories = question["Kategorie"].split(",");
    categoriesCsvContent += createCsvCategoryRecords(
      preparedQuestion.id,
      categories
    );
  } catch (err: any) {
    const msg =
      `An error occured when processing question with id: ${question["Numer pytania"]} and index: ${index}: \n` +
      err;
    throw new Error(msg);
  }
});

try {
  const questionsCsvPath = excelDir + "\\questions.txt";
  fs.writeFileSync(questionsCsvPath, questionsCsvContent);
  console.log(`Written questions successfully to ${questionsCsvPath}`);

  const categoriesCsvPath = excelDir + "\\questions_categories.txt";
  fs.writeFileSync(categoriesCsvPath, categoriesCsvContent);
  console.log(
    `Written questions-categories successfully to ${categoriesCsvPath}`
  );
} catch (err) {
  console.error(err);
}

function extractQuestionFields(
  fullUntranslatedQuestionRecord: FullUntranslatedQuestionRecord
) {
  const untranslatedQuestionRecord = {
    "Numer pytania": fullUntranslatedQuestionRecord["Numer pytania"],
    Pytanie: fullUntranslatedQuestionRecord["Pytanie"],
    "Odpowiedź A": fullUntranslatedQuestionRecord["Odpowiedź A"],
    "Odpowiedź B": fullUntranslatedQuestionRecord["Odpowiedź B"],
    "Odpowiedź C": fullUntranslatedQuestionRecord["Odpowiedź C"],
    "Poprawna odp": fullUntranslatedQuestionRecord["Poprawna odp"],
    Media: fullUntranslatedQuestionRecord["Media"],
    "Zakres struktury": fullUntranslatedQuestionRecord["Zakres struktury"],
    "Liczba punktów": fullUntranslatedQuestionRecord["Liczba punktów"],
    Kategorie: fullUntranslatedQuestionRecord["Kategorie"],
  } satisfies UntranslatedQuestionRecord;

  Object.keys(untranslatedQuestionRecord).forEach((key, index) => {
    const isValueNotRequired = [
      "Media",
      "Odpowiedź A",
      "Odpowiedź B",
      "Odpowiedź C",
    ].includes(key);
    if (
      !isValueNotRequired &&
      !untranslatedQuestionRecord[key as keyof UntranslatedQuestionRecord]
    ) {
      throw `
        Question record doesn't include following required value:
        ${key}
        `;
    }
  });

  return untranslatedQuestionRecord;
}

function translateCorrectAnswer(
  untranslated: UntranslatedQuestionRecord["Poprawna odp"]
): RawQuestionRecord["correctAnswer"] {
  if (untranslated === "T") {
    return "1";
  } else if (untranslated === "N") {
    return "0";
  } else if (["A", "B", "C"].includes(untranslated)) {
    return untranslated as "A" | "B" | "C";
  } else {
    throw "Wrong correct answer type. Should be T, N, A, B or C";
  }
}

function translateType(
  untranslated: UntranslatedQuestionRecord["Zakres struktury"]
): RawQuestionRecord["type"] {
  return untranslated === "PODSTAWOWY" ? "basic" : "specialized";
}

function translateMedia(untranslated: UntranslatedQuestionRecord["Media"]) {
  const lastDotIndex = untranslated.lastIndexOf(".");
  const withoutExtension = untranslated.slice(0, lastDotIndex);
  const originalExtension = untranslated.slice(lastDotIndex + 1);

  const extension = originalExtension === "wmv" ? "mp4" : originalExtension;

  return untranslated && withoutExtension + "." + extension;
}

function translateQuestionFieldsAndValues(
  untranslatedQuestionRecord: UntranslatedQuestionRecord
): RawQuestionRecord {
  const translatedCorrectAnswer = translateCorrectAnswer(
    untranslatedQuestionRecord["Poprawna odp"]
  );

  const translatedType = translateType(
    untranslatedQuestionRecord["Zakres struktury"]
  );

  const translatedMedia = translateMedia(untranslatedQuestionRecord["Media"]);

  const translatedQuestionRecord = {
    id: untranslatedQuestionRecord["Numer pytania"],
    content: untranslatedQuestionRecord["Pytanie"],
    correctAnswer: translatedCorrectAnswer,
    type: translatedType,
    value: untranslatedQuestionRecord["Liczba punktów"],
    media: translatedMedia,
    A: untranslatedQuestionRecord["Odpowiedź A"],
    B: untranslatedQuestionRecord["Odpowiedź B"],
    C: untranslatedQuestionRecord["Odpowiedź C"],
  } satisfies RawQuestionRecord;

  return translatedQuestionRecord;
}

function createCsvQuestionRecord(question: RawQuestionRecord) {
  let record = "";

  for (const [_, value] of Object.entries(question)) {
    const valueOrNull = value || (value === "" ? "\\N" : value);
    record += valueOrNull + "|";
  }
  record = record.replace("\n", " ");
  record = record.slice(0, -1);

  return record + "\n";
}

function createCsvCategoryRecords(id: number, categories: string[]) {
  let records = "";
  const allowedCategories = [
    "AM",
    "A1",
    "A2",
    "A",
    "B1",
    "B",
    "B+E",
    "C",
    "C+E",
    "C1",
    "C1+E",
    "D",
    "D+E",
    "D1",
    "D1+E",
    "T",
    "PT",
  ];

  categories.forEach((category) => {
    if (!allowedCategories.includes(category)) {
      throw `Question includes category not specified in allowed categories: ${category}`;
    }

    records += `${id}|${category}\n`;
  });

  console.log(records);
  return records;
}
