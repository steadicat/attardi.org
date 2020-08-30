import * as React from "react";

const SmallText = ({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div className={className} style={{ fontSize: "5vw", ...style }}>
    {children}
  </div>
);

const TinyText = ({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div className={className} style={{ fontSize: "2vw", ...style }}>
    {children}
  </div>
);

const Checkbox = ({ id }: { id: string }) => (
  <div id={id} className="checkbox">
    ❧
  </div>
);

const Select = ({
  children,
  name,
}: {
  children: JSX.Element[];
  name: string;
}) => (
  <select className="select" name={name}>
    {children}
  </select>
);

const Button = ({ children }: { children: string }) => (
  <button type="submit" className="button">
    {children}
  </button>
);

const Textarea = ({ name }: { name: string }) => (
  <textarea className="textarea" name={name} />
);

export const Template = ({
  id,
  name,
  language: _,
}: {
  id: string;
  name: string;
  language: (en: string, it: string) => string;
}) => (
  <html>
    <head>
      <title>James &amp; Stefano</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&amp;display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
      }
      html {
        background: #000;
        font: italic 8vw/1.2 "Playfair Display", serif;
      }
      #scroller {
        position: relative;
        width: 100%;
        height: 100%;
        perspective: 100px;
        perspective-origin: 50% 50%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
      #scroller-content {
        transform-style: preserve-3d;
        position: relative;
        overflow: hidden;
      }
      .background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: repeat-y url(images/background.png) left top;
        background-size: 100% auto;
      }
      .text {
        height: 150vh;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #eee;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        z-index: 1000;
      }
      .sin {
        height: 150vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .flower {
        position: absolute;
        top: 0;
        left: 0;
      }
      #loading {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        color: #ccc;
        background: #000;
        transition: opacity 500ms;
        pointer-events: none;
      }
      .button {
        font: inherit;
        line-height: 8vw;
        background: transparent;
        color: white;
        display: block;
        margin: 0 auto;
        border: none;
        outline: none;
        cursor: pointer;
      }
      .select {
        width: 12vw;
        line-height: 8vw;
        padding: 0 2vw;
        font: inherit;
        color: white;
        border: 2px solid white;
        background: transparent;
        display: inline-block;
        vertical-align: baseline;
        outline: none;
        margin-right: 1vw;
        margin-bottom: 1vw;
      }
      .textarea {
        line-height: 8vw;
        height: 20vh;
        width: 100%;
        box-sizing: border-box;
        font: inherit;
        color: white;
        border: 2px solid white;
        background: transparent;
        outline: none;
        margin-top: 2vh;
      }
      .hidden {
        display: none;
      }
      .checkbox {
        width: 5vw;
        height: 5vw;
        font-size: 6vw;
        line-height: 4.5vw;
        border: 2px solid white;
        display: inline-block;
        vertical-align: baseline;
        color: transparent;
        margin-right: 2vw;
        margin-bottom: 1vh;
      }
      .checkbox.checked {
        color: white;
      }
      .response {
        cursor: pointer;
      }
      `,
        }}
      />
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
          <div className="text" style={{ height: "100vh" }}>
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
              <TinyText>{_("Scroll", "Scorri")}</TinyText>
              <TinyText style={{ transform: "rotate(80deg)" }}>›</TinyText>
            </div>
          </div>
          <div className="text">
            <div>James Nguyen</div>
            <SmallText
              style={{
                marginTop: "6vh",
                paddingBottom: "6vh",
                marginBottom: "-2vh",
              }}
            >
              &amp;
            </SmallText>
            <div>Stefano Attardi</div>
          </div>
          <div className="text">
            <div>{_("kindly request", "richiedono cortesemente")}</div>
            <div>{_("your presence", "la vostra presenza")}</div>
          </div>
          <div className="text">
            <SmallText>{_("on the", "il")}</SmallText>
            <div>{_("29th of May, 2021", "29 Maggio 2021")}</div>
          </div>
          <div className="text">
            <SmallText>{_("in", "a")}</SmallText>
            <div>Arquà Petrarca,</div>
            <SmallText>{_("Italy", "PD")}</SmallText>
          </div>
          <div className="text">
            <div>{_("to celebrate", "per celebrare")}</div>
            <div>{_("their commitment", "la loro unione")}</div>
          </div>
          <div className="text">
            <div>{_("to a life of...", "e una vita di...")}</div>
          </div>
          <div id="sin" className="sin">
            <img
              src={_("images/sin.png", "images/vizi.png")}
              style={{ maxWidth: "80%" }}
            />
          </div>
          <div className="text">
            <div style={{ marginBottom: "4vh" }}>
              {_("Will you attend?", "Sarete presenti?")}
            </div>
            <SmallText style={{ display: "inline-block", textAlign: "left" }}>
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
            </SmallText>
          </div>
          <SmallText className="text yes hidden">
            <form
              id="form"
              style={{ display: "inline-block", textAlign: "left" }}
            >
              <input id="id" type="hidden" name="id" value={id} />
              <div>
                <Select name="adults">
                  <option>1</option>
                  <option>2</option>
                </Select>
                {_("Adults", "Adulti")}
              </div>

              <div>
                <Select name="kids">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Select>
                {_("Children", "Bambini")}
                <TinyText style={{ display: "inline" }}>
                  {_(" (12 or under)", " (fino a 12 anni)")}
                </TinyText>
              </div>
              <div style={{ marginTop: "4vh" }}>
                {_("Address:", "Indirizzo:")}
                <TinyText style={{ display: "inline" }}>
                  {_(" (for the invitation)", " (per l’invito)")}
                </TinyText>
              </div>
              <Textarea name="address" />
              <Button>{_("Confirm", "Conferma")}</Button>
            </form>
          </SmallText>
          <div className="text no hidden">
            <SmallText>{_("We are sorry to hear", "Sentiremo la")}</SmallText>
            <SmallText>
              {_("you will not be able to attend.", "vostra mancanza.")}
            </SmallText>
          </div>
          <div id="confirm" className="text hidden">
            <div style={{ marginBottom: "4vh" }}>
              {_("Thank you", "Grazie")}
            </div>
            <SmallText>
              {_("We look forward to", "Non vediamo l’ora")}
            </SmallText>
            <SmallText>{_("seeing you in Italy.", "di ricevervi.")}</SmallText>
          </div>
        </div>
      </div>
      <div id="loading">
        <div className="text" style={{ fontSize: "2vw", height: "100vh" }}>
          {_("Please wait...", "Aspetta...")}
        </div>
      </div>
      <script src="main.js" />
    </body>
  </html>
);
