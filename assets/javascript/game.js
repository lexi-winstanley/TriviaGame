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
    new TriviaQuestion('In dovetail joinery this board would be called the: ', new TriviaQuestionImage('assets/images/tailBoard.jpg'), 'Tail board', ['Pin board', 'Dove board', 'Angled board']),
    new TriviaQuestion('Cedar is considered a softwood.', null, 'True', ['False']),
    new TriviaQuestion('Which grit sandpaper should you use first?', null, '120', ['220']),
    new TriviaQuestion('What is the grain pattern seen on this maple box called?', new TriviaQuestionImage('assets/images/birdsEye.jpg'), 'Birds\' Eye', ['Tiger', 'Spotty', 'Curly']),
    new TriviaQuestion('What type of joint is this blade most often used to cut?', new TriviaQuestionImage('assets/images/dado.jpg'), 'Dado', ['Rabbet', 'Mortise', 'Dovetail']),
    new TriviaQuestion('What type of joint is this?', new TriviaQuestionImage('assets/images/dadoJoint.jpg'), 'Dado', ['Rabbet', 'Through', 'Half-lap']),
    new TriviaQuestion('This part of a board is called the: ', new TriviaQuestionImage('assets/images/endGrain.jpg'), 'End Grain', ['Bottom', 'Face Grain', 'Cut Side']),
    new TriviaQuestion('What is this tool called?', new TriviaQuestionImage('assets/images/handPlane.jpg'), 'Hand Plane', ['Scraper', 'Flattener', 'Sliding Chisel']),
    new TriviaQuestion('What is this tool called?', new TriviaQuestionImage('assets/images/mortiser.jpg'), 'Hollow Chisel Mortiser', ['Drill Press', 'Tenon Cutter', 'Plunge Router']),
    new TriviaQuestion('In dovetail joinery this board would be called the: ', new TriviaQuestionImage('assets/images/pinBoard.jpg'), 'Pin board', ['Tail board', 'Dove board', 'Angled board']),
    new TriviaQuestion('What type of joint is being cut here?', new TriviaQuestionImage('assets/images/rabbet.jpg'), 'Rabbet', ['Dado', 'Groove', 'Slice']),
    new TriviaQuestion('Which of the following woods is the darkest in color?', null, 'Wenge', ['Maple', 'Mahogany', 'Walnut']),
    new TriviaQuestion('Which of the following tools is most notorious for producing dangerous kick back?', null, 'Table Saw', ['Band Saw', 'Planer', 'Router Table'])
];

let usedQuestions = [];
function pickRandomQuestion(arr) {
    let randomQuestionIndex = Math.trunc(Math.random() * arr.length);
    if (!usedQuestions.includes(randomQuestionIndex) && usedQuestions.length !== arr.length) {
        usedQuestions.push(randomQuestionIndex);
        return arr[randomQuestionIndex];
    } else if (usedQuestions.length === arr.length) {
        usedQuestions = [];
        gameOver();
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
    console.log(event);
    let clickedIndex = event.srcElement.parentElement.firstChild.value;
    if (currentRandomizedAnswers[clickedIndex] === currentQuestion.correctAnswer) {
        numberCorrect++;
        questionsRemaining--;
        document.getElementById('questionText').innerHTML = `<h2 class="center">Correct Answer!</h2><p class="center">Questions Remaining: ${questionsRemaining}</p>`;
        document.getElementById('questionImageHolder').innerHTML = '';
        document.getElementById('showTime').className = 'noDisplay';
        clearInterval(timeInterval);
        timeAllowed = 10;
        setTimeout(newQuestionToHtml, 2000);
    } else {
        numberWrong++;
        questionsRemaining--;
        document.getElementById('questionText').innerHTML = `<h2 class="center">Incorrect. <br> The correct answer was: ${currentQuestion.correctAnswer} </h2><p class="center">Questions Remaining: ${questionsRemaining}</p>`
        document.getElementById('questionImageHolder').innerHTML = '';
        document.getElementById('showTime').className = 'noDisplay';
        clearInterval(timeInterval);
        timeAllowed = 10;
        setTimeout(newQuestionToHtml, 2000);
    }
}

function gameOver() {
    document.getElementById('questionText').innerHTML = `<h2 class="center">Game Over</h2><p class="center">Questions Correct: ${numberCorrect}</p><p class="center">Questions Incorrect: ${numberWrong}</p>`
    document.getElementById('questionImageHolder').innerHTML = '';
    document.getElementById('showTime').setAttribute('class', 'noDisplay');
    let restartButton = document.createElement('button');
    restartButton.innerText = 'Play Again';
    document.getElementById('questionText').append(restartButton);
    restartButton.onclick = restartGame;
}

function restartGame(event) {
    console.log(event);
    numberCorrect = 0;
    numberWrong = 0;
    questionsRemaining = possibleQuestions.length;
    document.getElementById('questionText').innerHTML = '';
    document.getElementById('questionImageHolder').innerHTML = '';
    newQuestionToHtml();
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

    if (currentQuestion.questionImage !== null) {
        document.getElementById('questionImageHolder').innerHTML = `<img src="${currentQuestion.questionImage.src}" />`;
        timeAllowed = 15;
    }

    let timeRemaining = document.getElementById('showTime');
    timeRemaining.innerText = 'Time Remaining: ' + timeAllowed;
    document.getElementById('showTime').className = '';

    let questionTitle = document.createElement('h2');
    questionTitle.innerText = currentQuestion.question;

    let questionText = document.getElementById('questionText');
    questionText.append(questionTitle);
    displayAnswers(currentRandomizedAnswers, questionText);

    timeToAnswer();
}

document.getElementById('start').onclick = newQuestionToHtml;






