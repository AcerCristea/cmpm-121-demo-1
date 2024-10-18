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

const slothContainer = document.createElement("div");
app.append(slothContainer);

/*BUTTONS*************************************************************************************************/
const slothButton = document.createElement("button");
slothButton.style.backgroundImage =
  "url('https://static-00.iconduck.com/assets.00/sloth-emoji-2048x1926-nnlvwog5.png')";
slothButton.style.backgroundSize = "cover";
slothButton.style.width = "160px";
slothButton.style.height = "160px";
slothButton.style.cursor = "pointer";
slothButton.style.position = "relative";
slothButton.style.borderRadius = "50%";
slothContainer.append(slothButton);

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} sloth naps`;
slothContainer.append(counterDisplay);

const buttonContainer = document.createElement("div");
buttonContainer.style.display = "inline-block";
app.append(buttonContainer);

const leafButton = document.createElement("button");
leafButton.style.backgroundImage =
  "url('https://www.bodybelize.com/uploads/3/3/8/8/3388250/s873496901458032811_p113_i7_w791.png')";
leafButton.style.backgroundSize = "cover";
leafButton.style.width = "100px";
leafButton.style.height = "100px";
leafButton.style.cursor = "pointer";
leafButton.style.position = "relative";
leafButton.style.borderRadius = "50%";
leafButton.disabled = true;
app.append(leafButton);

const leafContainer = document.createElement("div");
buttonContainer.append(leafContainer);
leafContainer.append(leafButton);

const leafText = document.createElement("p");
leafText.innerHTML = `Cecropia Leaf (-${Math.round(priceA * 100) / 100}, +0.1 naps/sec)`;
leafContainer.append(leafText);

const bedButton = document.createElement("button");
bedButton.style.backgroundImage =
  "url('https://img.freepik.com/premium-photo/cute-sloth-relaxing-hammock-made-vines_885831-89636.jpg')";
bedButton.style.backgroundSize = "cover";
bedButton.style.width = "100px";
bedButton.style.height = "100px";
bedButton.style.cursor = "pointer";
bedButton.style.position = "relative";
bedButton.style.borderRadius = "50%";
bedButton.disabled = true;
app.append(bedButton);

const bedContainer = document.createElement("div");
bedContainer.style.textAlign = "center";
buttonContainer.append(bedContainer);
bedContainer.append(bedButton);

const bedText = document.createElement("p");
bedText.innerHTML = `Hammock (-${Math.round(priceB * 100) / 100}, +2 naps/sec)`;
bedContainer.append(bedText);

const papayaButton = document.createElement("button");
papayaButton.style.backgroundImage =
  "url('https://attic.sh/6rqkfxjafet2nfcpel0p2lib9hs2')";
papayaButton.style.backgroundSize = "cover";
papayaButton.style.width = "100px";
papayaButton.style.height = "100px";
papayaButton.style.cursor = "pointer";
papayaButton.style.position = "relative";
papayaButton.style.borderRadius = "50%";
papayaButton.disabled = true;
app.append(papayaButton);

const papayaContainer = document.createElement("div");
papayaContainer.style.textAlign = "center";
buttonContainer.append(papayaContainer);
papayaContainer.append(papayaButton);

const papayaText = document.createElement("p");
papayaText.innerHTML = `Papaya (-${Math.round(priceC * 100) / 100}, +50 naps/sec)`;
papayaContainer.append(papayaText);

const style = document.createElement("style");
style.innerHTML = `
  button:disabled {
    opacity: 0.5;
    filter: grayscale(100%);
  }
`;
document.head.appendChild(style);

/*BUTTONS************************************************************************************************/

const growthDisplay = document.createElement("div");
growthDisplay.innerHTML = `${growthRate} naps/sec`;
app.append(growthDisplay);

const purchaseCountDisplay = document.createElement("div");
purchaseCountDisplay.innerHTML = `Cecropia Leafs: ${countA} | Hammocks: ${countB} | Papayas: ${countC}`;
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
  growthDisplay.innerHTML = `${Math.round(growthRate * 10) / 10} naps/sec`;
}

function updatePurchaseCountDisplay() {
  purchaseCountDisplay.innerHTML = `Cecropia Leafs: ${countA} | Hammocks: ${countB} | Papayas: ${countC}`;
}

leafButton.addEventListener("click", () => {
  if (counter >= priceA) {
    counter -= priceA;
    growthRate += 0.1;
    countA++;
    priceA = priceA * priceIncrease;
    leafText.innerHTML = `Cecropia Leaf (-${Math.round(priceA * 100) / 100}, +0.1 naps/sec)`;
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
    bedText.innerHTML = `Hammock (-${Math.round(priceB * 100) / 100}, +2 naps/sec)`;
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
    papayaButton.innerHTML = `Papaya (-${Math.round(priceC * 100) / 100}, +50 naps/sec)`; // 2 decimals
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
