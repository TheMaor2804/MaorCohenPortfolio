const question = document.getElementById("question");
const answer = document.getElementById("answer");
const submit = document.getElementById("submit");
const currentScoreDisplay = document.getElementById("currentScore");
const highScoreDisplay = document.getElementById("highScore")

let highScoreData = localStorage.getItem("highScoreData") || 0;

currentScoreDisplay.textContent = 0;
highScoreDisplay.textContent = highScoreData;

let currentScore = 0

let answerObject;

const generateQuestion = () => {
    const operators = ['+', '-', '*', '/'];
    const max = 100;
    const min = 0;
    let number1 = Math.floor(Math.random() * (max - min + 1)) + min;
    let number2 = Math.floor(Math.random() * (max - min + 1)) + min;
    let randomOperatorIndex, randomOperator;
    let answer;

    if (number1 / number2 % 1 == 0 ||
        number1 / number2 % 1 == 0.5) {
        randomOperatorIndex = Math.floor(Math.random() * operators.length);
        randomOperator = operators[randomOperatorIndex];
    } else {
        randomOperatorIndex = Math.floor(Math.random() * (operators.length - 1));
        randomOperator = operators[randomOperatorIndex];
    }

    switch (randomOperator) {
        case '+':
            answer = number1 + number2;
            break;
        case '-':
            answer = number1 - number2;
            break;
        case '*':
            number1 = number1 > 10 ? Math.round(number1 / 10) : number1;
            number2 = number2 > 10 ? Math.round(number2 / 10) : number2;
            answer = number1 * number2;
            break;
        case '/':
            answer = number1 / number2;
            break;
    }

    return {
        number1: number1,
        number2: number2,
        operator: randomOperator,
        answer: answer
    };
}

const changeDom = (questionObject) => {
    question.textContent = `
${questionObject.number1}
${questionObject.operator}
${questionObject.number2} =
`;
}

const check = () => {
    if (Number(answer.value) === answerObject.answer) {
        correctAnswer();
        currentScore++;
        if (currentScore > highScoreData) {
            highScoreData = currentScore;
            localStorage.setItem("highScoreData", currentScore);
            highScoreDisplay.textContent = currentScore;
        }
    } else {
        wrongAnswer();
        currentScore = 0;
    }
    currentScoreDisplay.textContent = currentScore;
    answerObject = generateQuestion();
    changeDom(answerObject);
}

const correctAnswer = () => {
    answer.disabled = true;
    answer.value = "Correct Answer!";
    const prevBgc = answer.style.backgroundColor;
    answer.style.backgroundColor = "#58e65c";
    setTimeout(() => {
        answer.style.backgroundColor = prevBgc;
        answer.value = "";
        answer.disabled = false;
    }, 1500);
}
const wrongAnswer = () => {
    answer.disabled = true;
    answer.value = "Wrong Answer!";
    const prevBgc = answer.style.backgroundColor;
    const prevColor = answer.style.backgroundColor;
    answer.style.backgroundColor = "red";
    answer.style.color = "white";
    setTimeout(() => {
        answer.style.backgroundColor = prevBgc;
        answer.style.color = prevColor;
        answer.value = "";
        answer.disabled = false;
    }, 1500);
}

submit.addEventListener("click", () => {
    if (answer.value === "") {
        alert("Please enter your answer");
        answer.focus();
    } else if (isNaN(answer.value)) {
        alert("Answer must be a valid number!");
        answer.focus();
    } else {
        check();
    }
});


answer.value = "";
answerObject = generateQuestion();
changeDom(answerObject);

