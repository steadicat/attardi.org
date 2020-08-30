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
  <div className={className} style={{ fontSize: "60px", ...style }}>
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
  <div className={className} style={{ fontSize: "24px", ...style }}>
    {children}
  </div>
);

const Checkbox = ({ id }: { id: string }) => (
  <div id={id} className="checkbox">
    ❧
  </div>
);

const Select = ({ children }: { children: JSX.Element[] }) => (
  <select className="select">{children}</select>
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
        font: italic 100px/1.2 "Playfair Display", serif;
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
        font: italic 100px/1.2 "Playfair Display", serif;
        color: #ccc;
        background: #000;
        transition: opacity 500ms;
        pointer-events: none;
      }
      .button {
        font: inherit;
        line-height: 60px;
        background: transparent;
        color: white;
        display: block;
        margin: 0 auto;
        border: none;
        outline: none;
        cursor: pointer;
      }
      .select {
        width: 120px;
        line-height: 60px;
        padding: 0 20px;
        font: inherit;
        color: white;
        border: 2px solid white;
        background: transparent;
        display: inline-block;
        vertical-align: baseline;
        outline: none;
        margin-right: 10px;
        margin-bottom: 10px;
      }
      .textarea {
        line-height: 60px;
        height: 180px;
        font: inherit;
        color: white;
        border: 2px solid white;
        background: transparent;
        outline: none;
        margin-top: 10px;
      }
      .hidden {
        display: none;
      }
      .checkbox {
        width: 60px;
        height: 60px;
        font-size: 70px;
        line-height: 50px;
        border: 2px solid white;
        display: inline-block;
        vertical-align: baseline;
        color: transparent;
        margin-right: 20px;
        margin-bottom: 10px;
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
                marginTop: "10vh",
                marginBottom: "-10vh",
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
                marginTop: "10vh",
                paddingBottom: "10vh",
                marginBottom: "-20px",
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
            <div>{_("to a life of...", "e una vita vissuta nel...")}</div>
          </div>
          <div id="sin" className="sin">
            <img
              src={_("images/sin.png", "images/vizio.png")}
              style={{ maxWidth: "60%" }}
            />
          </div>
          <div className="text">
            <div style={{ marginBottom: "20px" }}>Will you attend?</div>
            <SmallText style={{ display: "inline-block", textAlign: "left" }}>
              <div id="yes" className="response">
                <Checkbox id="yes-checkbox" />
                Yes, with pleasure
              </div>
              <div id="no" className="response">
                <Checkbox id="no-checkbox" />
                No, with regret
              </div>
            </SmallText>
          </div>
          <SmallText className="text yes hidden">
            <form
              id="form"
              style={{ display: "inline-block", textAlign: "left" }}
            >
              <input id="id" type="hidden" value={id} />
              <div>
                <Select>
                  <option>1</option>
                  <option>2</option>
                </Select>
                Adults
              </div>

              <div>
                <Select>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Select>
                Children (12 or under)
              </div>
              <div>Address (for the invitation):</div>
              <Textarea name="address" />
              <Button>Confirm</Button>
            </form>
          </SmallText>
          <div className="text no hidden">
            <SmallText>We are sorry to hear</SmallText>
            <SmallText>you will not be able to attend.</SmallText>
          </div>
          <div id="confirm" className="text hidden">
            <div>Thank you</div>
            <SmallText>We look forward to</SmallText>
            <SmallText>seeing you in Italy.</SmallText>
          </div>
        </div>
      </div>
      <div id="loading">
        <div className="text" style={{ fontSize: "24px", height: "100vh" }}>
          {_("Please wait...", "Aspetta...")}
        </div>
      </div>
      <script src="main.js" />
    </body>
  </html>
);
