import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let counter: number = 0;
let priceA: number = 10;
let priceB: number = 100;
let priceC: number = 1000;
let growthRate: number = 0;
const priceIncrease: number = 1.15;
let latestTimeStamp: number = performance.now();
let countA: number = 0;
let countB: number = 0;
let countC: number = 0;

const gameName = "Nap with Sloth";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const slothButton = document.createElement("button");
slothButton.style.backgroundImage =
  "url('https://static-00.iconduck.com/assets.00/sloth-emoji-2048x1926-nnlvwog5.png')";
slothButton.style.backgroundSize = "cover";
slothButton.style.width = "200px";
slothButton.style.height = "200px";
slothButton.style.cursor = "pointer";
slothButton.style.position = "relative";
slothButton.style.borderRadius = "50%";
slothButton.style.transform = "translateY(-150px)";
app.append(slothButton);

// Create a container for the buttons to be arranged horizontally
const buttonContainer = document.createElement("div");
buttonContainer.style.display = "inline-block"; // Use flexbox layout
app.append(buttonContainer);

const leafButton = document.createElement("button");
leafButton.style.backgroundImage =
  "url('https://www.bodybelize.com/uploads/3/3/8/8/3388250/s873496901458032811_p113_i7_w791.png')";
leafButton.style.backgroundSize = "cover";
leafButton.style.width = "100px";
leafButton.style.height = "100px";
leafButton.style.cursor = "pointer";
leafButton.style.position = "relative"; // To position text inside the button
leafButton.style.borderRadius = "50%"; // Round shape
leafButton.disabled = true;
app.append(leafButton);

// Create a container for the leaf button and its label
const leafContainer = document.createElement("div");
leafContainer.style.textAlign = "center"; // Center the text and button
buttonContainer.append(leafContainer);

// Add the leaf button inside the container
leafContainer.append(leafButton);

// Add text underneath the leaf button
const leafText = document.createElement("p");
leafText.innerHTML = `(-${Math.round(priceA * 100) / 100}, +0.1 naps/sec)`;
leafContainer.append(leafText);

const bedButton = document.createElement("button");
bedButton.style.backgroundImage =
  "url('https://img.freepik.com/premium-photo/cute-sloth-relaxing-hammock-made-vines_885831-89636.jpg')";
bedButton.style.backgroundSize = "cover";
bedButton.style.width = "100px";
bedButton.style.height = "100px";
bedButton.style.cursor = "pointer";
bedButton.style.position = "relative"; // To position text inside the button
bedButton.style.borderRadius = "50%"; // Round shape
bedButton.disabled = true;
app.append(bedButton);

// Create a container for the bed button and its label
const bedContainer = document.createElement("div");
bedContainer.style.textAlign = "center"; // Center the text and button
buttonContainer.append(bedContainer);

// Add the bed button inside the container
bedContainer.append(bedButton);

// Add text underneath the bed button
const bedText = document.createElement("p");
bedText.innerHTML = "(Unlock for 100 sloth naps)";
bedContainer.append(bedText);

const papayaButton = document.createElement("button");
papayaButton.style.backgroundImage =
  "url('https://attic.sh/6rqkfxjafet2nfcpel0p2lib9hs2')";
papayaButton.style.backgroundSize = "cover";
papayaButton.style.width = "100px";
papayaButton.style.height = "100px";
papayaButton.style.cursor = "pointer";
papayaButton.style.position = "relative"; // To position text inside the button
papayaButton.style.borderRadius = "50%"; // Round shape
papayaButton.disabled = true;
app.append(papayaButton);

// Create a container for the papaya button and its label
const papayaContainer = document.createElement("div");
papayaContainer.style.textAlign = "center"; // Center the text and button
buttonContainer.append(papayaContainer);

// Add the papaya button inside the container
papayaContainer.append(papayaButton);

// Add text underneath the papaya button
const papayaText = document.createElement("p");
papayaText.innerHTML = "Papaya (Unlock for 1000 sloth naps)";
papayaContainer.append(papayaText);

const style = document.createElement("style");
style.innerHTML = `
  button:disabled {
    opacity: 0.5;
    filter: grayscale(100%);
  }
`;
document.head.appendChild(style);

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} sloth naps`;
app.append(counterDisplay);

const growthDisplay = document.createElement("div");
growthDisplay.innerHTML = `${growthRate} cookies/sec`;
app.append(growthDisplay);

const purchaseCountDisplay = document.createElement("div");
purchaseCountDisplay.innerHTML = `A: ${countA} | B: ${countB} | C: ${countC}`;
app.append(purchaseCountDisplay);

slothButton.addEventListener("click", () => {
  counter++;
  checkUpgradeAvailability();
});

function updateCounterDisplay() {
  counterDisplay.innerHTML = `${Math.floor(counter)} sloth naps`;
}

function checkUpgradeAvailability() {
  leafButton.disabled = counter < priceA;
  bedButton.disabled = counter < priceB;
  papayaButton.disabled = counter < priceC;
}

function updateGrowthDisplay() {
  growthDisplay.innerHTML = `${Math.round(growthRate * 10) / 10} cookies/sec`;
}

function updatePurchaseCountDisplay() {
  purchaseCountDisplay.innerHTML = `A: ${countA} | B: ${countB} | C: ${countC}`;
}

leafButton.addEventListener("click", () => {
  if (counter >= priceA) {
    counter -= priceA;
    growthRate += 0.1;
    countA++;
    priceA = priceA * priceIncrease;
    leafText.innerHTML = `(-${Math.round(priceA * 100) / 100}, +0.1 naps/sec)`;
    updateCounterDisplay();
    updateGrowthDisplay();
    updatePurchaseCountDisplay();
  }
});

bedButton.addEventListener("click", () => {
  if (counter >= priceB) {
    counter -= priceB;
    growthRate += 2.0;
    countB++;
    priceB = priceB * priceIncrease;
    updateCounterDisplay();
    updateGrowthDisplay();
    updatePurchaseCountDisplay();
  }
});

papayaButton.addEventListener("click", () => {
  if (counter >= priceC) {
    counter -= priceC;
    growthRate += 50.0;
    countC++;
    priceC = priceC * priceIncrease;
    //    papayaButton.innerHTML = `C (-${Math.round(priceC * 100) / 100}, +50 naps/sec)`; // 2 decimals
    updateCounterDisplay();
    updateGrowthDisplay();
    updatePurchaseCountDisplay();
  }
});

function updateCounter() {
  const currTimeStamp = performance.now();
  const elapsed = currTimeStamp - latestTimeStamp;

  counter += (elapsed / 1000) * growthRate;

  updateCounterDisplay();

  updateGrowthDisplay();

  checkUpgradeAvailability();

  latestTimeStamp = currTimeStamp;

  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter); // initial call
