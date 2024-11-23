let wrapper = document.getElementsByClassName("wrapper")[0];
let template = document.getElementsByTagName("template")[0];

let names = ["John", "Alex", "Ron"];
let colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#800000",
  "#8B0000", "#FFA500", "#FFD700", "#6B8E23", "#7CFC00", "#000080", "#8B008B",
  "#FF00FF", "#F4A460", "#FF3855", "#FD3A4A", "#FB4D46", "#FA5B3D", "#FFAA1D",
  "#FFF700", "#299617", "#A7F432", "#2243B6", "#5DADEC", "#5946B2", "#9C51B6",
];

let clickCounter = 0;
let counterDisplay = document.getElementById("counter");
counterDisplay.innerText = `Stickers Removed: ${clickCounter}`;

let sticker = function(name) {
    let div = template.content.querySelector("div");
    let nameOfStick = div.querySelector(".name");

    nameOfStick.innerHTML = name;
    div.style.background = colors[Math.floor(Math.random() * colors.length)];
    div.style.transform = "rotate(" + (Math.random() * 40 - 20) + "deg)";

    let node = document.importNode(div, true);

    node.addEventListener("click", () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: Math.random(), y: Math.random() },
        });
        node.style.transform = "scale(1.5) rotate(360deg)";
        setTimeout(() => {
            node.style.display = "none";
        }, 500);
        clickCounter++;
        counterDisplay.innerText = `Stickers Removed: ${clickCounter}`;
    });

    wrapper.appendChild(node);
};

document.getElementById("addSticker").addEventListener("click", () => {
    let name = document.getElementById("nameInput").value;
    if (name.trim()) {
        sticker(name);
        document.getElementById("nameInput").value = "";
    }
});

names.forEach(sticker);

function confetti(options) {
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti';
    document.body.appendChild(script);

    script.onload = () => {
        const fireConfetti = confetti.create(document.body, {
            resize: true,
            useWorker: true
        });
        fireConfetti(options);
    };
}
