const startBtn = document.getElementById("start");
const scoreText = document.getElementById("score");
const moles = document.querySelectorAll(".mole");
const timeText = document.getElementById("time");
const timeSection = document.getElementById("timeSection");

let prevMole;
let timeIsUp = false;
let score = 0;
scoreText.textContent = score;
let time = 15;
timeText.textContent = time;

const randomMole = () => {
  const order = Math.floor(Math.random() * moles.length);
  const selectedMole = moles[order];
  if (prevMole == selectedMole) {
    return randomMole();
  } else {
    prevMole = selectedMole;
  }
  return selectedMole;
};

const randomTime = (min, max) => {
  const time = Math.round(Math.random() * (max - min) + min);
  return time;
};

const up = () => {
  const mole = randomMole();
  const upTime = randomTime(650, 950);
  mole.classList.add("selected");
  setTimeout(() => {
    mole.classList.remove("selected");
    if (!timeIsUp) {
      up();
    }
  }, upTime);
};

const startTime = () => {
  if (!timeIsUp) {
    if (time < 4) {
      timeSection.classList.add("red");
      timeText.classList.add("scale");
    }
    time--;
    timeText.textContent = time;
  } else {
    timeText.textContent = "Time Is Up!";
    startBtn.disabled = false;
  }
};

const startGame = () => {
  time = 15;
  score = 0;
  timeIsUp = false;
  const interval = setInterval(() => {
    startTime();
    if (timeIsUp) clearInterval(interval);
  }, 1000);

  up();
  setTimeout(() => {
    timeIsUp = true;
  }, 15000);
};

const hit = (e) => {
  if (e.target.classList.contains("selected")) {
    document.body.classList.add("green");
    score++;
    goal();
    e.target.classList.remove("selected");
  }
  scoreText.textContent = score;
};

// goal funskiyasi --> ugurlu olanda background rengi deyis
const goal = () => {
  document.body.classList.add("green");
  setTimeout(() => {
    document.body.classList.remove("green");
  }, 150);
};

moles.forEach((mole) => {
  mole.addEventListener("click", hit);
});

startBtn.addEventListener("click", () => {
  startGame();
  scoreText.textContent = 0;
  startBtn.disabled = true;
});
