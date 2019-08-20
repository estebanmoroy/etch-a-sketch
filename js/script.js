function createSketchPad(squaresPerSide) {
  const sketchPad = document.createElement("div");
  sketchPad.className = "sketch-pad";
  for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
    const square = document.createElement("div");
    square.className = "square";
    square.style.opacity = 1;
    square.style.backgroundColor = "white";
    sketchPad.appendChild(square);
    document.documentElement.style.setProperty(
      "--squares-per-side",
      squaresPerSide
    );
  }
  return sketchPad;
}

function appendNewSketchPad(sketchPad) {
  const sketchPadContainer = document.querySelector(".sketch-pad-container");
  sketchPadContainer.removeChild(document.querySelector(".sketch-pad"));
  sketchPadContainer.appendChild(sketchPad);
}

function clearSketchPad() {
  const squares = document.querySelectorAll(".square");
  squares.forEach(square => {
    square.style.background = "white";
  });
}

function blackBrush() {
  this.style.backgroundColor = "black";
}

function randomNumber() {
  return Math.round(Math.random() * 255);
}

function randomRGBValue() {
  return (
    "rgb(" + randomNumber() + "," + randomNumber() + "," + randomNumber() + ")"
  );
}

function colorfulBrush() {
  this.style.backgroundColor = randomRGBValue();
}

function shaderBrush() {
  let opacity = Number(this.style.opacity);
  if (this.style.backgroundColor !== "black") {
    this.style.opacity = 0.1;
    this.style.backgroundColor = "black";
  }
  if (opacity < 1) {
    this.style.opacity = opacity + 0.1;
  }
}

function changeBrush(brushType) {
  const squares = document.querySelectorAll(".square");
  squares.forEach(square => {
    square.removeEventListener("mouseover", blackBrush);
    square.removeEventListener("mouseover", colorfulBrush);
    square.removeEventListener("mouseover", shaderBrush);
    switch (brushType) {
      case 1:
        square.addEventListener("mouseover", blackBrush);
        break;
      case 2:
        square.addEventListener("mouseover", colorfulBrush);
        break;
      case 3:
        square.addEventListener("mouseover", shaderBrush);
        break;
      default:
        console.log("Not a valid bursh type");
        return;
        break;
    }
  });
}

appendNewSketchPad(createSketchPad(32));
changeBrush(1);

document.querySelector("#new-grid").addEventListener("click", () => {
  appendNewSketchPad(
    createSketchPad(prompt("How many squares per side do you want?", "64"))
  );
  changeBrush(1);
});
document.querySelector("#clear").addEventListener("click", clearSketchPad);
document.querySelector("#brush-black").addEventListener("click", () => {
  changeBrush(1);
});
document.querySelector("#brush-colorful").addEventListener("click", () => {
  changeBrush(2);
});
document.querySelector("#brush-shader").addEventListener("click", () => {
  changeBrush(3);
});
