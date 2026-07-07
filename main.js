"use strict";

const blockCounter = document.querySelector(".block-counter");
const blockInfo = document.querySelector(".block-info");
const btnShow = document.querySelector(".btn-show");
const btnNext = document.querySelector(".btn-next");

let currentIndex = 0;
let isHideAnswer = true;

if (localStorage.getItem("counter")) {
  currentIndex = Number(localStorage.getItem("counter"));
} else {
  localStorage.setItem("counter", currentIndex);
}

let cards = [];

const loadCards = async () => {
  const res = await fetch("./cards.json");
  cards = await res.json();

  init();
};

const init = () => {
  blockCounter.textContent = `${currentIndex + 1}/${cards.length}`;

  blockInfo.textContent = cards[currentIndex].question;

  const toggleOpacity = () => {
    return new Promise((resolve) => {
      blockInfo.classList.toggle("opacity-0");
      setTimeout(resolve, 500);
    });
  };

  btnShow.addEventListener("click", () => {
    if (isHideAnswer) {
      toggleOpacity().then(() => {
        blockInfo.textContent = cards[currentIndex].answer;
        btnShow.textContent = "Hide answer";
        isHideAnswer = false;
        toggleOpacity();
      });
    } else {
      toggleOpacity().then(() => {
        blockInfo.textContent = cards[currentIndex].question;
        btnShow.textContent = "Show answer";
        isHideAnswer = true;
        toggleOpacity();
      });
    }
  });

  btnNext.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }

    isHideAnswer = true;
    localStorage.setItem("counter", currentIndex);
    blockCounter.textContent = `${currentIndex + 1}/${cards.length}`;
    blockInfo.textContent = cards[currentIndex].question;
  });
};

loadCards();



