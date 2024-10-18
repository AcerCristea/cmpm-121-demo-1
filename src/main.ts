import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let counter: number = 0;
let growthRate: number = 0;
const priceIncrease: number = 1.15;
let latestTimeStamp: number = performance.now();
const purchaseCounts: number[] = [0, 0, 0, 0, 0];

interface Item {
  name: string;
  cost: number;
  rate: number;
  imageUrl: string;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Cecropia Leafs",
    cost: 10,
    rate: 0.1,
    imageUrl:
      "https://www.bodybelize.com/uploads/3/3/8/8/3388250/s873496901458032811_p113_i7_w791.png",
    description: "Perfect for lazy snacking, grants you 0.1 naps/sec",
  },
  {
    name: "Hammocks",
    cost: 100,
    rate: 2.0,
    imageUrl:
      "https://img.freepik.com/premium-photo/cute-sloth-relaxing-hammock-made-vines_885831-89636.jpg",
    description: "A cozy hammock to sway gently, grants you 2 naps/sec",
  },
  {
    name: "Papayas",
    cost: 1000,
    rate: 50.0,
    imageUrl: "https://attic.sh/6rqkfxjafet2nfcpel0p2lib9hs2",
    description: "Juicy papayas for a refreshing snack, grants you 50 naps/sec",
  },
  {
    name: "Sloth Plushies",
    cost: 5000,
    rate: 200.0,
    imageUrl: "https://www.royers.com/images/1546.png",
    description:
      "Cuddly plushies that make napping even more delightful, grants you 200 naps/sec",
  },
  {
    name: "Sleepy Tea",
    cost: 20000,
    rate: 800.0,
    imageUrl:
      "https://cdni.iconscout.com/illustration/premium/thumb/sloth-on-coffee-cup-11385380-9178594.png?f=webp",
    description:
      "A warm cup of tea to drift into dreamland, grants you 800 naps/sec",
  },
];

const gameName = "Nap with Sloth";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const slothContainer = document.createElement("div");
app.append(slothContainer);

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

const style = document.createElement("style"); // Couldn't get hover description to work
style.innerHTML = `
  button:disabled {
    opacity: 0.5;
    filter: grayscale(100%);
  }
`;
document.head.appendChild(style);

availableItems.forEach((item, index) => {
  const itemContainer = document.createElement("div");
  const itemButton = document.createElement("button");
  itemButton.style.backgroundImage = `url('${item.imageUrl}')`;
  itemButton.style.backgroundSize = "cover";
  itemButton.style.width = "100px";
  itemButton.style.height = "100px";
  itemButton.style.cursor = "pointer";
  itemButton.style.position = "relative";
  itemButton.style.borderRadius = "50%";
  itemButton.disabled = true;
  itemContainer.append(itemButton);

  const itemText = document.createElement("p");
  itemText.innerHTML = `${item.name} (-${Math.round(item.cost * 100) / 100}, +${item.rate} naps/sec)`;
  itemContainer.append(itemText);

  const itemDescription = document.createElement("p");
  itemDescription.innerHTML = item.description;
  itemDescription.className = "item-description";
  itemContainer.append(itemDescription);

  buttonContainer.append(itemContainer);

  itemButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      purchaseCounts[index]++;
      item.cost *= priceIncrease;
      itemText.innerHTML = `${item.name} (-${Math.round(item.cost * 100) / 100}, +${item.rate} naps/sec)`;
      updateCounterDisplay();
      updateGrowthDisplay();
      updatePurchaseCountDisplay();
    }
  });
});

const growthDisplay = document.createElement("div");
growthDisplay.innerHTML = `${growthRate} naps/sec`;
app.append(growthDisplay);

const purchaseCountDisplay = document.createElement("div");
let purchaseCountsText = "";
for (let i = 0; i < availableItems.length; i++) {
  if (i > 0) purchaseCountsText += " | ";
  purchaseCountsText += `${availableItems[i].name}: ${purchaseCounts[i]}`;
}
purchaseCountDisplay.innerHTML = purchaseCountsText;
app.append(purchaseCountDisplay);

slothButton.addEventListener("click", () => {
  counter++;
  checkUpgradeAvailability();
});

function updateCounterDisplay() {
  counterDisplay.innerHTML = `${Math.floor(counter)} sloth naps`;
}

function checkUpgradeAvailability() {
  availableItems.forEach((item, index) => {
    buttonContainer.children[index].querySelector("button")!.disabled =
      counter < item.cost;
  });
}

function updateGrowthDisplay() {
  growthDisplay.innerHTML = `${Math.round(growthRate * 10) / 10} naps/sec`;
}

function updatePurchaseCountDisplay() {
  let purchaseCountsText = "";
  for (let i = 0; i < availableItems.length; i++) {
    if (i > 0) purchaseCountsText += " | ";
    purchaseCountsText += `${availableItems[i].name}: ${purchaseCounts[i]}`;
  }
  purchaseCountDisplay.innerHTML = purchaseCountsText;
}

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
