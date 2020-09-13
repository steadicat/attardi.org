import * as React from "react";

const Checkbox = ({ id }: { id: string }) => (
  <div id={id} className="checkbox">
    ❧
  </div>
);

export const Template = ({
  id,
  name,
  css,
  language: _,
}: {
  id: string;
  name: string;
  css: string;
  language: (en: string, it: string) => string;
}) => (
  <html>
    <head>
      <title>James &amp; Stefano</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&amp;display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <link rel="apple-touch-icon" href="/savethedate/images/7.png" />
      <link rel="icon" href="/savethedate/images/7.png" />
    </head>
    <body>
      <div id="scroller">
        <div id="scroller-content">
          <div
            className="background"
            style={{
              transform: "translate3d(0, 0, -50px) scale(1.5) rotateZ(180deg)",
              opacity: 0.5,
            }}
          ></div>
          <div
            className="background"
            style={{
              transform: "translate3d(0, 0, -25px) scale(1.25)",
              opacity: 1,
            }}
          ></div>
          <div
            className="background"
            style={{ background: "#000", opacity: 0.7 }}
          ></div>
          <div className="short-slide text" style={{ height: "100vh" }}>
            <div>
              {_("Dear", "")} {name},
            </div>
            <div
              id="scroll"
              style={{
                opacity: 0,
                transition: "opacity 3s",
                marginTop: "8vh",
                marginBottom: "-8vh",
              }}
            >
              <div className="tiny-text">{_("Scroll", "Scorri")}</div>
              <div className="tiny-text" style={{ transform: "rotate(80deg)" }}>
                ›
              </div>
            </div>
          </div>
          <div className="slide text">
            <div>James Nguyen</div>
            <div
              className="small-text"
              style={{
                marginTop: "6vh",
                paddingBottom: "6vh",
                marginBottom: "-2vh",
              }}
            >
              &amp;
            </div>
            <div>Stefano Attardi</div>
          </div>
          <div className="slide text">
            <div>{_("kindly request", "richiedono cortesemente")}</div>
            <div>{_("your presence", "la vostra presenza")}</div>
          </div>
          <div className="slide text">
            <div className="small-text">{_("on the", "il")}</div>
            <div>{_("29th of May, 2021", "29 Maggio 2021")}</div>
          </div>
          <div className="slide text">
            <div className="small-text">{_("in", "a")}</div>
            <div>Arquà Petrarca,</div>
            <div className="small-text">{_("Italy", "PD")}</div>
          </div>
          <div className="slide text">
            <div>{_("to celebrate", "per celebrare")}</div>
            <div>{_("their commitment", "la loro unione")}</div>
          </div>
          <div className="slide text">
            <div>{_("to a life of...", "e una vita piena di...")}</div>
          </div>
          <div id="sin" className="long-slide sin">
            <div className="sinImage short-slide">
              <img
                src={_("images/sin.png", "images/vizi.png")}
                style={{ maxWidth: "80%" }}
              />
            </div>
          </div>
          <div className="slide text">
            <div style={{ marginBottom: "4vh" }}>
              {_("Do you hope to attend?", "Sarete presenti?")}
            </div>
            <div
              className="small-text"
              style={{ display: "inline-block", textAlign: "left" }}
            >
              <div
                id="yes"
                className="response"
                style={{ marginBottom: "4vh" }}
              >
                <Checkbox id="yes-checkbox" />
                {_("Yes, with pleasure", "Sì, con piacere")}
              </div>
              <div id="no" className="response">
                <Checkbox id="no-checkbox" />
                {_("No, with regret", "No, con duolo")}
              </div>
            </div>
          </div>
          <div className="slide text yes small-text">
            <form
              id="form"
              style={{
                display: "inline-block",
                textAlign: "left",
                visibility: "hidden",
              }}
            >
              <input id="id" type="hidden" name="id" value={id} />
              <div>
                <select name="adults" className="select">
                  <option>1</option>
                  <option>2</option>
                </select>
                {_("Adults", "Adulti")}
              </div>

              <div>
                <select name="kids" className="select">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
                {_("Children", "Bambini")}
                <span className="tiny-text">
                  {_(" (12 or under)", " (fino a 12 anni)")}
                </span>
              </div>
              <div style={{ marginTop: "4vh" }}>
                {_("Address:", "Indirizzo:")}
                <span className="tiny-text">
                  {_(" (for the invitation)", " (per l’invito)")}
                </span>
              </div>
              <textarea name="address" className="textarea" />
              <button type="submit" className="button">
                {_("Confirm", "Conferma")}
              </button>
            </form>
          </div>
          <div className="slide text no hidden">
            <div className="small-text">
              {_("Thank you for your response.", "Grazie per la risposta.")}
            </div>
            <div className="small-text">
              {_("You will be missed.", "Sentiremo la vostra mancanza.")}
            </div>
          </div>
          <div id="confirm" className="slide text">
            <div style={{ marginBottom: "4vh" }}>
              {_("Thank you", "Grazie")}
            </div>
            <div className="small-text">
              {_("We look forward to", "Non vediamo l’ora")}
            </div>
            <div className="small-text">
              {_("seeing you in Italy!", "di ricevervi!")}
            </div>
          </div>
        </div>
      </div>
      <div id="loading">
        <div
          className="short-slide text"
          style={{ fontSize: "2vw", height: "100vh" }}
        >
          {_("Please wait...", "Aspetta...")}
        </div>
      </div>
      <script src="main.js" />
    </body>
  </html>
);
