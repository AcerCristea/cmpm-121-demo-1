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

const gameName = "My amazing Website";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🦥";
app.append(button);

const purchaseButtonA = document.createElement("button");
purchaseButtonA.innerHTML = `A (-${priceA}, +0.1 naps/sec)`;
purchaseButtonA.disabled = true;
app.append(purchaseButtonA);

const purchaseButtonB = document.createElement("button");
purchaseButtonB.innerHTML = `B (-${priceB}, +2.0 naps/sec)`;
purchaseButtonB.disabled = true;
app.append(purchaseButtonB);

const purchaseButtonC = document.createElement("button");
purchaseButtonC.innerHTML = `C (-${priceC}, +50 naps/sec)`;
purchaseButtonC.disabled = true;
app.append(purchaseButtonC);

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} sloth naps`;
app.append(counterDisplay);

const growthDisplay = document.createElement("div");
growthDisplay.innerHTML = `${growthRate} cookies/sec`;
app.append(growthDisplay);

const purchaseCountDisplay = document.createElement("div");
purchaseCountDisplay.innerHTML = `A: ${countA} | B: ${countB} | C: ${countC}`;
app.append(purchaseCountDisplay);

button.addEventListener("click", () => {
  counter++;
  checkUpgradeAvailability();
});

function updateCounterDisplay() {
  counterDisplay.innerHTML = `${Math.floor(counter)} sloth naps`;
}

function checkUpgradeAvailability() {
  purchaseButtonA.disabled = counter < priceA;
  purchaseButtonB.disabled = counter < priceB;
  purchaseButtonC.disabled = counter < priceC;
}

function updateGrowthDisplay() {
  growthDisplay.innerHTML = `${Math.round(growthRate * 10) / 10} cookies/sec`;
}

function updatePurchaseCountDisplay() {
  purchaseCountDisplay.innerHTML = `A: ${countA} | B: ${countB} | C: ${countC}`;
}

purchaseButtonA.addEventListener("click", () => {
  if (counter >= priceA) {
    counter -= priceA;
    growthRate += 0.1;
    countA++;
    priceA = priceA * priceIncrease;
    purchaseButtonA.innerHTML = `A (-${Math.round(priceA * 100) / 100}, +0.1 naps/sec)`;
    updateCounterDisplay();
    updateGrowthDisplay();
    updatePurchaseCountDisplay();
  }
});

purchaseButtonB.addEventListener("click", () => {
  if (counter >= priceB) {
    counter -= priceB;
    growthRate += 2.0;
    countB++;
    priceB = priceB * priceIncrease;
    purchaseButtonB.innerHTML = `B (-${Math.round(priceB * 100) / 100}, +2.0 naps/sec)`;
    updateCounterDisplay();
    updateGrowthDisplay();
    updatePurchaseCountDisplay();
  }
});

purchaseButtonC.addEventListener("click", () => {
  if (counter >= priceC) {
    counter -= priceC;
    growthRate += 50.0;
    countC++;
    priceC = priceC * priceIncrease;
    purchaseButtonC.innerHTML = `C (-${Math.round(priceC * 100) / 100}, +50 naps/sec)`; // 2 decimals
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
