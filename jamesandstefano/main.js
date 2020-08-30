const flowers = [
  "images/1.png",
  "images/2.png",
  "images/3.png",
  "images/4.png",
  "images/5.png",
  "images/6.png",
  "images/7.png",
  "images/8.png",
  "images/9.png",
  "images/10.png",
];

const preloads = ["images/background.png", "images/sin.png"];

const scroller = document.getElementById("scroller");
const content = document.getElementById("scroller-content");
const canvasWidth = document.body.clientWidth;
const screenHeight = window.innerHeight;
const canvasHeight = content?.offsetHeight ?? document.body.clientHeight;

/**
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", () => resolve(img));
  });
}

/**
 *
 * @param {number} n
 * @param {number} ratio
 */
function jitter(n, ratio = 0.5) {
  return n + (Math.random() * (ratio * 2) - ratio);
}

const perspective = 100;
const slides = 12;

/**
 * @param {HTMLImageElement[]} images
 * @param {number} top
 * @param {number} bottom
 * @param {number} iterations
 */
function populate(images, top, bottom, iterations) {
  let z = 0;
  for (let iteration = 0; iteration < iterations; iteration++) {
    images.sort(() => (Math.random() > 0.5 ? 1 : -1));
    for (let i = 0; i < images.length; i++) {
      const { width, height, src } = images[i];
      const w = width / 2;
      const h = height / 2;
      const scale = (perspective - z) / perspective;
      const img = document.createElement("img");

      let left = Math.random() * canvasWidth - w / 2;
      if (/4\.png/.test(src)) {
        left = Math.random() < 0.5 ? 0 : canvasWidth - w / 2;
      }
      img.className = "flower";
      img.src = src;
      img.style.width = `${w}px`;
      img.style.height = `${h}px`;
      img.style.transform = `translate3d(${left}px, ${
        top + Math.random() * (bottom - top) - h / 2
      }px, ${jitter(z)}px) scale(${jitter(scale * 1.3)}) rotateZ(${
        left === 0 ? "180deg" : "0"
      })`;
      // img.style.filter = `blur(${scale * 2}px)`;
      content?.appendChild(img);
      z += 1;
    }
  }
}

const slideHeight = screenHeight * 1.5;

/**
 * @param {'Yes' | 'No'} response
 */
async function setResponse(response) {
  const yesCheck = document.getElementById("yes-checkbox");
  const noCheck = document.getElementById("no-checkbox");
  if (response === "Yes") {
    yesCheck && yesCheck.classList.add("checked");
    noCheck && noCheck.classList.remove("checked");
  } else {
    yesCheck && yesCheck.classList.remove("checked");
    noCheck && noCheck.classList.add("checked");
  }
  for (const el of Array.from(document.querySelectorAll(".yes"))) {
    if (response === "Yes") {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  }
  for (const el of Array.from(document.querySelectorAll(".no"))) {
    if (response === "No") {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  }
  scroller && scroller.scrollBy({ top: slideHeight, behavior: "smooth" });

  const idElement = document.getElementById("id");
  const id = idElement ? idElement.getAttribute("value") : null;
  if (id) {
    await fetch("/rsvp", {
      method: "POST",
      body: new URLSearchParams([
        ["id", id],
        ["response", response],
      ]),
    });
  }
}

async function main() {
  const yes = document.getElementById("yes");
  yes && yes.addEventListener("click", () => setResponse("Yes"));

  const no = document.getElementById("no");
  no && no.addEventListener("click", () => setResponse("No"));

  const form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const confirm = document.getElementById("confirm");
      if (confirm) {
        confirm.classList.remove("hidden");
      }

      const idElement = document.getElementById("id");
      const id = idElement ? idElement.getAttribute("value") : null;
      const { currentTarget } = event;
      if (id && currentTarget) {
        await fetch("/rsvp", {
          method: "POST",
          body: new FormData(/** @type {HTMLFormElement} */ currentTarget),
        });
      }

      scroller && scroller.scrollBy({ top: slideHeight, behavior: "smooth" });
    });
  }

  const [images] = await Promise.all([
    Promise.all(flowers.map(loadImage)),
    Promise.all(preloads.map(loadImage)),
  ]);

  const loading = document.getElementById("loading");
  if (loading) {
    loading.style.opacity = "0";
  }

  populate(images, 0, screenHeight * 0.25, 2);

  for (let slide = 0; slide < slides; slide++) {
    let middle = screenHeight * 1 + slide * slideHeight;
    let top = middle - screenHeight * 0.33;
    let bottom = middle + screenHeight * 0.33;
    populate(images, top, bottom, 4);
  }

  const sin = document.getElementById("sin");
  const sinScreen = 6;
  if (sin) {
    // content?.appendChild(sin);
    let middle = screenHeight + (sinScreen + 0.5) * slideHeight;
    let top = middle - screenHeight / 2;
    let bottom = middle + screenHeight / 2;
    populate(images, top, bottom, sinScreen);
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));
  const scroll = document.getElementById("scroll");
  scroll && (scroll.style.opacity = "1");
}

main();
