import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as fs from "fs";
import { Template } from "./template";
import fetch from "node-fetch";

const apiKey = process.env.AIRTABLE_API_KEY;
const base = "appX8ncwIIqYiABo7";
const baseName = "Save the date";
const viewName = "Tier 1";

const url = `https://api.airtable.com/v0/${encodeURIComponent(
  base
)}/${encodeURIComponent(baseName)}?view=${encodeURIComponent(viewName)}`;

async function main() {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  type Record = {
    id: string;
    fields: {
      Code: string;
      Email: string;
      Language: "English" | "Italian";
      Tier: "Tier 1";
      Name: string;
    };
    createdTime: string;
  };

  const css = fs.readFileSync("./main.css");

  try {
    const { records } = (await response.json()) as { records: Record[] };
    console.log(records);

    for (const {
      id,
      fields: { Code, Name, Language },
    } of records) {
      const html = ReactDOMServer.renderToString(
        <Template
          id={id}
          name={Name}
          language={(en: string, it: string) =>
            Language === "English" ? en : it
          }
          css={css.toString()}
        />
      );
      console.log(`Building ./savethedate/${Code}.html...`);
      fs.writeFileSync(
        `./savethedate/${Code}.html`,
        `<!DOCTYPE html>\n${html}`
      );
    }
  } catch (err) {
    console.error(err);
  }
}

main();
