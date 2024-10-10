import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing Website";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🦥";
app.append(button);

let counter: number = 0;

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} sloth naps`;
app.append(counterDisplay);

button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${counter} sloth naps`;
});
