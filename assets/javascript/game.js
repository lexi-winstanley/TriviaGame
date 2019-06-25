class TriviaQuestion {
    constructor(question, questionImage, correctAnswer, incorrectAnswers) {
        this.question = question;
        this.questionImage = questionImage;
        this.correctAnswer = correctAnswer;
        this.incorrectAnswers = incorrectAnswers;
    }
    getPossibleAnswers() {
        let possibleAnswers = this.incorrectAnswers.concat(this.correctAnswer);
        return possibleAnswers;
    }

    randomizeAnswers() {
        let arr = this.getPossibleAnswers();
        let randomizedAnswers = [];
        while (arr.length > 0) {
            let randomIndex = Math.trunc(Math.random() * arr.length);
            randomizedAnswers.push(arr[randomIndex]);
            arr.splice(randomIndex, 1);
        }
        return randomizedAnswers;
    }
}

class TriviaQuestionImage {
    constructor(src, alt) {
        this.src = src;
        this.alt = alt;
    }
}


let possibleQuestions = [
    new TriviaQuestion('Which of the following is an American hardwood?', null, 'Cherry', ['Bubinga', 'Ipe', 'Rosewood']),
    new TriviaQuestion('When milling rough lumber which power tool would you use to create a flat face?', null, 'Jointer', ['Planer', 'Table Saw', 'Drum Sander']),
    new TriviaQuestion('In dovetail joinery the board pictured below would be called the ______.', new TriviaQuestionImage('../images/tailBoard.jpeg', 'Dovetail tail board'), 'Tail board', ['Pin board', 'Dove board', 'Angled board']),
    new TriviaQuestion('Cedar is considered a softwood.', null, 'True', ['False'])
];

let usedQuestions = [];
function pickRandomQuestion(arr) {
    let randomQuestionIndex = Math.trunc(Math.random() * arr.length);
    if (!usedQuestions.includes(randomQuestionIndex) && usedQuestions.length !== arr.length) {
        usedQuestions.push(randomQuestionIndex);
        return arr[randomQuestionIndex];
    } else if (usedQuestions.length === arr.length) {
        restartGame();
    } else if (usedQuestions.includes(randomQuestionIndex)) {
        return pickRandomQuestion(arr);
    }
}

function displayAnswers(arr, parent) {
    let possibleAnswersDisplay = document.createElement('div');
    possibleAnswersDisplay.setAttribute('id', 'possibleAnswers');
    possibleAnswersDisplay.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        let answerHolder = document.createElement('div');
        answerHolder.setAttribute('class', 'answer');
        answerHolder.onclick = evaluateUserAnswer;
        let answerRadio = document.createElement('input');
        answerRadio.setAttribute('type', 'radio');
        answerRadio.setAttribute('name', 'answerChoice');
        answerRadio.setAttribute('id', i.toString());
        answerRadio.setAttribute('value', i.toString());
        let answerLabel = document.createElement('label');
        answerLabel.setAttribute('for', arr[i]);
        answerLabel.innerText = arr[i];
        answerHolder.append(answerRadio);
        answerHolder.append(answerLabel);
        possibleAnswersDisplay.append(answerHolder);
    }
    parent.append(possibleAnswersDisplay);
}


function evaluateUserAnswer(event) {
    console.log(event)
    let clickedIndex = event.srcElement.parentElement.firstChild.value;
    if (currentRandomizedAnswers[clickedIndex] === currentQuestion.correctAnswer) {
        numberCorrect++;
        questionsRemaining--;
        document.getElementById('questionText').innerHTML = `<h2 class="center">Correct Answer!</h2><p>Questions Remaining: ${questionsRemaining}</p>`;
        document.getElementById('questionImageHolder').innerHTML = '';

        clearInterval(timeInterval);
        timeAllowed = 10;
        setTimeout(newQuestionToHtml, 2000);
    } else {
        numberWrong++;
        questionsRemaining--;
        document.getElementById('questionText').innerHTML = `<h2 class="center">Incorrect. <br> The correct answer was: ${currentQuestion.correctAnswer} </h2><p>Questions Remaining: ${questionsRemaining}</p>`

        document.getElementById('questionImageHolder').innerHTML = '';

        clearInterval(timeInterval);
        timeAllowed = 10;
        setTimeout(newQuestionToHtml, 2000);
    }
}

function restartGame() {
    console.log('restart game');
    numberCorrect = 0;
    numberWrong = 0;
    questionsRemaining = possibleQuestions.length;
}

function timeToAnswer() {
    timeInterval = setInterval(decrement, 1000);
    countdownStarted = true;
}

function decrement() {
    timeAllowed--;
    document.getElementById('showTime').innerText = 'Time Remaining: ' + timeAllowed;
    if (timeAllowed === 0) {
        timeUp();
    }
}

function timeUp() {
    clearInterval(timeInterval);
    timeAllowed = 10;
    countdownStarted = false;
    numberWrong++;
    questionsRemaining--;
    document.getElementById('questionText').innerHTML = `<h2 class="center">Time's Up. <br> The correct answer was: ${currentQuestion.correctAnswer} </h2><p>Questions Remaining: ${questionsRemaining}</p>`

    document.getElementById('questionImageHolder').innerHTML = '';
    setTimeout(newQuestionToHtml, 2000);
}


let countdownStarted = false;
let timeInterval;
let timeAllowed = 10;
let numberCorrect = 0;
let numberWrong = 0;
let questionsRemaining = possibleQuestions.length;


let currentQuestion;
let currentRandomizedAnswers;

function newQuestionToHtml() {
    currentQuestion = pickRandomQuestion(possibleQuestions);
    currentRandomizedAnswers = currentQuestion.randomizeAnswers();
    document.getElementById('questionText').innerHTML = '';
    document.getElementById('questionImageHolder').innerHTML = '';
    let timeRemaining = document.createElement('p');
    timeRemaining.setAttribute('id', 'showTime');
    timeRemaining.innerText = 'Time Remaining: ' + timeAllowed;
    let questionTitle = document.createElement('h2');
    questionTitle.innerText = currentQuestion.question;
    let questionText = document.getElementById('questionText');
    questionText.append(timeRemaining);
    questionText.append(questionTitle);
    displayAnswers(currentRandomizedAnswers, questionText);
    timeToAnswer();
}

newQuestionToHtml();



