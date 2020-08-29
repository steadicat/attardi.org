import * as React from "react";

export const Template = ({ name }: { name: string }) => (
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
      }`,
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
          <div className="text" style={{ fontSize: "120px", height: "100vh" }}>
            <div>Dear {name},</div>
            <div id="scroll" style={{ opacity: 0, transition: "opacity 3s" }}>
              <div style={{ fontSize: "24px", marginTop: "10vh" }}>Scroll</div>
              <div style={{ fontSize: "24px", transform: "rotate(80deg)" }}>
                ›
              </div>
            </div>
          </div>
          <div className="text">
            <div>James Nguyen</div>
            <div style={{ fontSize: "60px", marginBottom: "-20px" }}>&amp;</div>
            <div>Stefano Attardi</div>
          </div>
          <div className="text">
            <div>kindly request</div>
            <div>your presence</div>
          </div>
          <div className="text">
            <div style={{ fontSize: "60px" }}>on the</div>
            <div>29th of May, 2021</div>
          </div>
          <div className="text">
            <div style={{ fontSize: "60px" }}>in</div>
            <div>Arquà Petrarca,</div>
            <div style={{ fontSize: "60px" }}>Italy</div>
          </div>
          <div className="text">
            <div>to celebrate</div>
            <div>their commitment</div>
          </div>
          <div className="text">
            <div>to a life of...</div>
          </div>
          <div id="sin" className="sin">
            <img src="images/sin.png" style={{ maxWidth: "60%" }} />
          </div>
        </div>
      </div>
      <div id="loading">
        <div className="text" style={{ fontSize: "24px", height: "100vh" }}>
          Please wait...
        </div>
      </div>
      <script src="main.js"></script>
    </body>
  </html>
);
