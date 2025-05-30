const container = document.querySelector("#container");
const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];
const sizeBtn = document.querySelector("#size-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const clearBtn = document.querySelector("#clear-btn");
// const btn = document.querySelector("button");

let isErasing = false;

createGrid(16);

function createGrid(size) {
    container.innerHTML = "";
    const boxSize = 960 / size;

    // Create size^2 grids
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-box");
        div.style.width = `${boxSize}px`;
        div.style.height = `${boxSize}px`;
        container.appendChild(div);
    }
    // Apply hover effect to grid
    gridColor();
}

function gridColor() {
    const boxes = document.querySelectorAll(".grid-box");

    boxes.forEach(box => {
        box.addEventListener("mouseover", function (e) {
            if (isErasing) {
                e.target.style.background = "";
            } else if (!e.target.style.background) {
                const randomIndex = Math.floor(Math.random() * colors.length);
                const randomColor = colors[randomIndex];
                e.target.style.background = randomColor;
            }
        });
    });
}

function toggleEraser() {
    isErasing = !isErasing;
    eraserBtn.classList.toggle("active");
}

function clearGrid() {
    const boxes = document.querySelectorAll(".grid-box");
    boxes.forEach(box => {
        box.style.background = "";
    });
}

function alertButton() {
    let input = parseInt(prompt("How many squares per side? Max 100"));

    if (input < 1) {
        alert("Input too low");
        return;
    } else if (input > 100) {
        alert("Input is too high");
        return;
    }

    createGrid(input);
}

// You can call the function here using this, or add gridColor() in the HTML file
sizeBtn.addEventListener("click", alertButton);
eraserBtn.addEventListener("click", toggleEraser);
clearBtn.addEventListener("click", clearGrid);