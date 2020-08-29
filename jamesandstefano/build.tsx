import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as fs from "fs";
import { Template } from "./template";
import fetch from "node-fetch";

const apiKey = "*****************";
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

  try {
    const { records } = (await response.json()) as { records: Record[] };
    console.log(records);

    for (const {
      fields: { Code, Email, Language, Name },
    } of records) {
      const html = ReactDOMServer.renderToString(<Template name={Name} />);
      console.log(`Building ./pages/${Code}.html...`);
      fs.writeFileSync(`./pages/${Code}.html`, `<!DOCTYPE html>\n${html}`);
    }
  } catch (err) {
    console.error(err);
  }
}

main();
