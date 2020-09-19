import fetch from "node-fetch";
import * as fs from "fs";

type Body = {
  From: string;
  To: string;
  Cc?: string;
  Bcc?: string;
  TemplateId: number;
  TemplateModel: {
    url: string;
    background?: string;
  };
  Tag?: string;
  ReplyTo?: string;
  Headers?: { Name: string; Value: string }[];
  TrackOpens?: boolean;
  TrackLinks?: "None" | "HtmlAndText" | "HtmlOnly" | "TextOnly";
  Attachments?: {
    Name: string;
    ContentId: string;
    Content: string;
    ContentType: "image/jpeg";
  }[];
  Metadata?: {};
  MessageStream?: "outbound";
};

async function main() {
  if (!process.env.POSTMARK_SERVER_TOKEN) {
    console.log("Missing Postmark token");
    return;
  }

  const [, , To, code] = process.argv;
  console.log(To, code);

  // const background = fs.readFileSync("./images/email.jpg");

  const body: Body = {
    To,
    From: "James & Stefano savethedate@jamesandstefano.com",
    TemplateId: 20223324,
    TemplateModel: {
      url: `https://jamesandstefano.com/savethedate/${code}`,
      // background: `data:image/jpeg;base64,${background.toString("base64")}`,
    },
  };

  console.log(body);

  const response = await fetch(
    "https://api.postmarkapp.com/email/withTemplate",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN,
      },
      body: JSON.stringify(body),
    }
  );

  const content = await response.json();
  console.log(content);
}

main();
