import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let counter: number = 0;
let growthRate: number = 0;
let latestTimeStamp: number = performance.now();

const gameName = "My amazing Website";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🦥";
app.append(button);

const purchaseButton = document.createElement("button");
purchaseButton.innerHTML = "Upgrade";
purchaseButton.disabled = true;
app.append(purchaseButton);

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} sloth naps`;
app.append(counterDisplay);

button.addEventListener("click", () => {
  counter++;
});

function updateCounterDisplay() {
    counterDisplay.innerHTML = `${Math.floor(counter)} sloth naps`;
    purchaseButton.disabled = counter < 10;
}

purchaseButton.addEventListener("click", () => {
    counter-=10;
    growthRate+=1;
    updateCounterDisplay();
});


function updateCounter() {
    const currTimeStamp = performance.now();
    const elapsed = currTimeStamp - latestTimeStamp;

    counter += (elapsed / 1000) * growthRate;

    updateCounterDisplay();

    latestTimeStamp = currTimeStamp;
    
    requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter); // initial call
