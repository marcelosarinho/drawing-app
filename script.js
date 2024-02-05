const drawingColor = document.querySelector("input[type='color']");
const drawingSize = document.querySelector("input[type='range']");
const drawingPencil = document.querySelector("#drawing-pencil");
const drawingCircle = document.querySelector("#drawing-circle");
const drawingRect = document.querySelector("#drawing-rect");
const drawingTriangle = document.querySelector("#drawing-triangle");
const drawingDownload = document.querySelector("#download");
const drawingClear = document.querySelector("#clear-canvas");
const drawingEraser = document.querySelector("#drawing-eraser");

let canvas;
let graphic;
let isPencil;
let isCircle;
let isRect;
let isTriangle;
let isEraser;
let circleStart = null;
let rectStart = null;
let triangleStart = null;

document.addEventListener("DOMContentLoaded", () => {
  drawingPencil.classList.add("selected");
  isPencil = true;
  isCircle = false;
  isRect = false;
  isTriangle = false;
  isEraser = false;
});

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  graphic = createGraphics(window.innerWidth, window.innerHeight);
  graphic.background(255);
}

const paths = [];
let currentPath = [];

function draw() {
  background(255);
  image(graphic, 0, 0);

  if (isPencil || isEraser) preview();

  if (mouseIsPressed) {
    drawOnCanvas();
  }

  paths.forEach((path) => {
    beginShape();
    path.forEach((point) => {
      stroke(point.color);
      strokeWeight(point.size);
      vertex(point.x, point.y);
    });
    endShape();
  });
}

function mousePressed() {
  currentPath = [];

  paths.push(currentPath);
}

drawingClear.addEventListener("click", () => {
  paths.splice(0);
  graphic.background(255);
});

drawingDownload.addEventListener("click", () => {
  saveCanvas(canvas);
});

drawingPencil.addEventListener("click", () => {
  isPencil = true;
  isCircle = false;
  isRect = false;
  isTriangle = false;
  isEraser = false;
  drawingPencil.classList.add("selected");
  drawingCircle.classList.remove("selected");
  drawingRect.classList.remove("selected");
  drawingTriangle.classList.remove("selected");
  drawingEraser.classList.remove("selected");
});

drawingCircle.addEventListener("click", () => {
  isCircle = true;
  isPencil = false;
  isRect = false;
  isTriangle = false;
  isEraser = false;
  drawingCircle.classList.add("selected");
  drawingPencil.classList.remove("selected");
  drawingRect.classList.remove("selected");
  drawingTriangle.classList.remove("selected");
  drawingEraser.classList.remove("selected");
});

drawingRect.addEventListener("click", () => {
  isRect = true;
  isPencil = false;
  isCircle = false;
  isTriangle = false;
  isEraser = false;
  drawingRect.classList.add("selected");
  drawingPencil.classList.remove("selected");
  drawingCircle.classList.remove("selected");
  drawingTriangle.classList.remove("selected");
  drawingEraser.classList.remove("selected");
});

drawingTriangle.addEventListener("click", () => {
  isTriangle = true;
  isPencil = false;
  isCircle = false;
  isRect = false;
  isEraser = false;
  drawingTriangle.classList.add("selected");
  drawingPencil.classList.remove("selected");
  drawingCircle.classList.remove("selected");
  drawingRect.classList.remove("selected");
  drawingEraser.classList.remove("selected");
});

drawingEraser.addEventListener("click", () => {
  isEraser = true;
  isTriangle = false;
  isPencil = false;
  isCircle = false;
  isRect = false;
  drawingEraser.classList.add("selected");
  drawingPencil.classList.remove("selected");
  drawingCircle.classList.remove("selected");
  drawingRect.classList.remove("selected");
  drawingTriangle.classList.remove("selected");
});

function preview() {
  noFill();
  stroke(200);
  strokeWeight(1);
  ellipse(mouseX, mouseY, drawingSize.value, drawingSize.value);
}

function drawOnCanvas() {
  if (isPencil || isEraser) {
    noFill();

    const point = {
      x: mouseX,
      y: mouseY,
      color: isEraser ? 255 : drawingColor.value,
      size: drawingSize.value,
    };
    currentPath.push(point);
  }

  if (isCircle) {
    if (circleStart === null) circleStart = [mouseX, mouseY];
    let d = createVector(
      mouseX - circleStart[0],
      mouseY - circleStart[1]
    ).mag();
    graphic.fill(drawingColor.value);
    graphic.noStroke();
    graphic.ellipse(circleStart[0], circleStart[1], d, d);
  }

  if (isRect) {
    if (rectStart === null) rectStart = [mouseX, mouseY];
    let p = createVector(mouseX - rectStart[0], mouseY - rectStart[1]);
    graphic.fill(drawingColor.value);
    graphic.noStroke();
    graphic.rect(rectStart[0], rectStart[1], p.x, p.y);
  }

  if (isTriangle) {
    if (triangleStart === null) triangleStart = [mouseX, mouseY];
    fill(drawingColor.value);
    noStroke();
    triangle(
      triangleStart[0],
      triangleStart[1],
      mouseX - 100,
      mouseY,
      mouseX + 100,
      mouseY
    );
  }
}

function mouseReleased() {
  if (circleStart !== null) circleStart = null;

  if (rectStart !== null) rectStart = null;

  if (triangleStart !== null) {
    graphic.fill(drawingColor.value);
    graphic.noStroke();
    graphic.triangle(
      triangleStart[0],
      triangleStart[1],
      mouseX - 100,
      mouseY,
      mouseX + 100,
      mouseY
    );

    triangleStart = null;
  }
}
