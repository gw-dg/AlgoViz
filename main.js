//GLOBAL VARIABLES

let height = [];
let width = 20;
let box = document.querySelector(".box");

let length = 50;
let speed = 55;

//BUFFER ARRAY
generate();

const valueSpeed = document.querySelector("#speedValue");
const valueSize = document.querySelector("#lengthValue");
const inputSpeed = document.querySelector("#sSlider");
const inputSize = document.querySelector("#lSlider");

valueSize.textContent = inputSize.value;
valueSpeed.textContent = inputSpeed.value;

inputSize.addEventListener("input", (event) => {
  valueSize.textContent = event.target.value;
  length = event.target.value;
  generate();
});
inputSpeed.addEventListener("input", (event) => {
  valueSpeed.textContent = event.target.value;
  speed = event.target.value;
});

// FUNCTION TO SHOW BARS
function showBars(ind) {
  box.innerHTML = "";
  for (let i = 0; i < length; i++) {
    let bar = document.createElement("div");
    bar.style.height = height[i] + "px";
    bar.style.width = width + "px";
    bar.style.borderRadius = 5 + "px";
    bar.style.backgroundColor = "#374259";
    if (ind && ind.includes(i)) bar.style.backgroundColor = "#d82f5a";
    box.prepend(bar);
  }
}

//FUNCTION TO GENERATE BARS
function generate() {
  height = [];
  for (let i = 0; i < length; i++) {
    let x = Math.floor(Math.random() * 200 + 1);
    height.push(x);
  }
  showBars();
}

// FUNCTION TO ENABLE/DISABLE BUTTONS
function toggleButtons(disabled) {
  document
    .querySelectorAll("button, select, input[type='range']")
    .forEach((element) => {
      element.disabled = disabled;
    });
}

//FUNCTION TO SWAP THE NODE STRUCTURE OF BOX DIV
// function swap(el1, el2) {
//   return new Promise((resolve) => {
//     // Get the initial heights of the elements
//     let height1 = el1.style.height;
//     let height2 = el2.style.height;

//     // Swap the heights using CSS transitions
//     el1.style.transition = "height 2s ease";
//     el2.style.transition = "height 2s ease";
//     el1.style.height = height2;
//     el2.style.height = height1;

//     // Resolve the Promise after the transition duration
//     setTimeout(() => {
//       // Reset transition properties
//       el1.style.transition = "";
//       el2.style.transition = "";

//       // Resolve the Promise to indicate completion
//       resolve();
//     }, 500); // 0.5s duration of transition
//   });
// }

//SORTING FUNCTION
function sort() {
  let type = document.getElementById("sortType").value;
  const copy = [...height]; // copy of height array we'll sort and apply animation on
  let swaps;
  if (type === "null") alert("Please Select Sorting Algorithm First");
  else if (type === "bubbleSort") {
    swaps = bubbleSort(copy);
    toggleButtons(true); // Disable buttons
    animate(swaps);
  } else if (type === "insertionSort") {
    swaps = insertionSort(copy);
    toggleButtons(true); // Disable buttons
    animate(swaps);
  } else alert("work in progress");
}

function animate(swaps) {
  if (swaps.length == 0) {
    showBars();
    toggleButtons(false);
    return;
  }

  let [i, j] = swaps.shift(); // Get the next swap pair

  // Swap the heights in the height array
  let temp = height[i];
  height[i] = height[j];
  height[j] = temp;

  // Show the updated bars
  showBars([i, j]);

  // Delay the next swap animation
  setTimeout(function () {
    animate(swaps);
  }, speed);
}

function bubbleSort(height) {
  let swaps = [];
  //  STORING THE INDICES WHICH ARE BEING SWAPPED
  // WHICH WILL HELP IN ANIMATING

  let box = document.querySelectorAll(".box > div");
  let length = box.length;

  for (let i = 0; i < length - 1; ++i) {
    for (let j = 0; j < length - i - 1; ++j) {
      // if (parseInt(box[j].style.height) > parseInt(box[j + 1].style.height)) {
      //   swap(box[j], box[j + 1]);
      // }
      if (height[j] > height[j + 1]) {
        let temp = height[j];
        height[j] = height[j + 1];
        height[j + 1] = temp;
        swaps.push([j, j + 1]);
      }
    }
  }
  showBars();
  return swaps;
}

function insertionSort(height) {
  let box = document.querySelectorAll(".box > div");
  let length = box.length;
  let swaps = [];
  for (let i = 1; i < length; i++) {
    let key = height[i];
    let j = i - 1;

    // Move elements of v[0..i-1], that are greater than key,
    // to one position ahead of their current position
    while (j >= 0 && height[j] > key) {
      swaps.push([j + 1, j]);
      height[j + 1] = height[j];
      j = j - 1;
    }
    height[j + 1] = key;
  }
  return swaps;
}

function mergeSort() {
  let box = document.querySelectorAll(".box > div");
  let length = box.length;
}

function heapSort() {
  let box = document.querySelectorAll(".box > div");
  let length = box.length;
}

function quickSort() {
  let box = document.querySelectorAll(".box > div");
  let length = box.length;
}
