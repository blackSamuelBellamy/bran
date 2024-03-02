const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

hackedText = async () => {
  let iteration = 0;
  let pass = 0;
  const target = document.querySelector("h2");
  clearInterval(interval);

  const targetLength = target.dataset.value.length;
  const originalText = target.dataset.value;
  target.innerText = `_`;
  target.classList.add("blinking-cursor");
  await sleep(2000);
  target.classList.remove("blinking-cursor");
  target.innerHTML = "";

  const randomLetter = () => letters[Math.floor(Math.random() * 26)];
  interval = setInterval(() => {
    if (pass == 0) {
      // Writeout
      target.innerText =
        target.innerText.split("").map(randomLetter).join("") + randomLetter();
      iteration += 1;
    }
    if (pass == 1) {
      // Descramble
      target.innerText = target.innerText
        .split("")
        .map((letter, index) => {
          if (index <= iteration) {
            return target.dataset.value[index];
          }

          return randomLetter();
        })
        .join("");
      iteration += 1 / 3;
    } else if (pass == 2) {
      // Finish
      clearInterval(interval);
    }

    if (iteration == targetLength) {
      pass += 1;
      iteration = 0;
    }
  }, 30);
};

window.addEventListener("load", hackedText);

document.querySelector("#restart").addEventListener("click", (event) => {
  console.log("RESTART");
  hackedText();
  return false;
});
