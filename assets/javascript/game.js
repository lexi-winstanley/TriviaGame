class TriviaQuestion {
    constructor(question, questionImage, correctAnswer, incorrectAnswers) {
        this.question = question;
        this.questionImage = questionImage;
        this.correctAnswer = correctAnswer;
        this.incorrectAnswers = incorrectAnswers;
    }
    getQuestions() {
        let possibleAnswers = this.incorrectAnswers.push(this.correctAnswer);
    }

    randomizeAnswers(arr) {
        let randomizedAnswers = [];
        while (arr !== []) {
            let randomIndex = Math.trunc(Math.random() * (arr.length - 1))
            randomizedAnswers.push(arr[randomIndex]);
            possibleAnswers.splice(randomIndex, 1);
        }
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


function newQuestionToHtml(triviaQuestion) {
    let question = document.getElementById('questionTitle');
    question.innerText();
    let possibleAnswers = document.getElementById('possibleAnswers');

    for () {
        let answer = document.createElement('li');
        answer.innerText();
        document.appendChild(possibleAnswers);
    }
}

