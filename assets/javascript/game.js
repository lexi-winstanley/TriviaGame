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

function pickRandomQuestion(arr) {
    let usedQuestions = [];
    let randomQuestionIndex = Math.trunc(Math.random() * arr.length);
    if (!usedQuestions.includes(randomQuestionIndex) && usedQuestions.length !== arr.length) {
        usedQuestions.push(randomQuestionIndex);
        return arr[randomQuestionIndex];
    } else if (usedQuestions.length === arr.length) {
        usedQuestions = [];
        return pickRandomQuestion(arr);
    } else if (usedQuestions.includes(randomQuestionIndex)) {
        return pickRandomQuestion(arr);
    }
}

function displayAnswers(arr) {
    let possibleAnswersDisplay = document.getElementById('possibleAnswers');
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
}


function evaluateUserAnswer(event) {
    let clickedIndex = event.srcElement.value;
    if (currentRandomizedAnswers[clickedIndex] === currentQuestion.correctAnswer) {
        alert('you win!');
        newQuestionToHtml();
    } else {
        alert('you lose');
        newQuestionToHtml();
    }
}

let currentQuestion = pickRandomQuestion(possibleQuestions);
let currentRandomizedAnswers = currentQuestion.randomizeAnswers();

function newQuestionToHtml() {
    let questionDisplay = document.getElementById('questionTitle');
    questionDisplay.innerText = currentQuestion.question;
    displayAnswers(currentRandomizedAnswers);
}

newQuestionToHtml();



