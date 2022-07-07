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

//Yuvadan çıxma funksiyası, selected clası elave et (selected clasi köstəbəyi yuxarı qaldırmaq üçün)
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

//Zamanı başlat və 4 saniyədən az qaldıqda rəngi timmer rəngini qırmızı et
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

// Oyunu başlat
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

// Köstəbəyə vuranda
const hit = (e) => {
  if (e.target.classList.contains("selected")) {
    score++;
    goal();
    e.target.classList.remove("selected");
  }
  scoreText.textContent = score;
};

// goal funksiyası --> uğurlu olanda (hər dəfə xal artanda) background rəngini dəyiş
const goal = () => {
  document.body.classList.add("green");
  setTimeout(() => {
    document.body.classList.remove("green");
  }, 150);
};

// hər bir köstəbəyə "click" eventi olanda hit funksiyasını çağır
moles.forEach((mole) => {
  mole.addEventListener("click", hit);
});

startBtn.addEventListener("click", () => {
  startGame();
  scoreText.textContent = 0;
  startBtn.disabled = true;
});
