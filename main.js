"use strict";

const cards = [
  {
    question: "What is JavaScript?",
    answer: "A programming language used to make websites interactive.",
  },
  {
    question: "What is a string?",
    answer: 'A piece of text, written inside quotes, like "hello".',
  },
  {
    question: "What is a number in JavaScript?",
    answer: "A data type used to store numeric values, like 5 or 3.14.",
  },
  {
    question: "What is a boolean?",
    answer: "A data type with only two values: true or false.",
  },
  {
    question: "How do you create a variable?",
    answer: "By using let, const, or var, followed by a name.",
  },
  {
    question: "What does console.log() do?",
    answer: "It prints a message or value to the browser console.",
  },
  {
    question: "What is an if statement used for?",
    answer: "To run code only when a certain condition is true.",
  },
  {
    question: "What is a loop?",
    answer: "A way to repeat a block of code multiple times.",
  },
  {
    question: "What symbol is used for comments in JavaScript?",
    answer: "Two slashes, like this: // this is a comment.",
  },
  {
    question: "What file extension do JavaScript files have?",
    answer: "The .js extension.",
  },
];

const blockCounter = document.querySelector(".block-counter");
const blockInfo = document.querySelector(".block-info");
const btnShow = document.querySelector(".btn-show");
const btnNext = document.querySelector(".btn-next");

let currentIndex = 0;
let isHideAnswer = true;

if(localStorage.getItem("counter")) {
	currentIndex = Number(localStorage.getItem("counter"));
} else {
	localStorage.setItem("counter", currentIndex);
}

blockCounter.textContent = `${currentIndex + 1}/${cards.length}`;

blockInfo.textContent = cards[currentIndex].question;

const toggleOpacity = () => {
	return new Promise((resolve) => {
		blockInfo.classList.toggle("opacity-0");
		setTimeout(resolve, 500);
	})
}

btnShow.addEventListener("click", () => {
	if(isHideAnswer) {
		toggleOpacity().then( () => {
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
	if(currentIndex < cards.length - 1) {
		currentIndex++;
	} else {
		currentIndex = 0;
	}

	isHideAnswer = true;
	localStorage.setItem("counter", currentIndex);
	blockCounter.textContent = `${currentIndex + 1}/${cards.length}`;
  blockInfo.textContent = cards[currentIndex].question;
})