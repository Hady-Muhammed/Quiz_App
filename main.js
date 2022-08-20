let count = document.getElementById("count"),
  spans = document.getElementById("spans"),
  numOfQuestions,
  question = document.querySelector(".quiz-area h2"),
  answer = document.querySelector(".answers-area"),
  currentIndex = 0,
  rightAnswer = 0,
  submitBtn = document.querySelector('.submit-button'),
  resultDiv = document.querySelector('.results'),
  minutes = document.querySelector('.minutes'),
  seconds = document.querySelector('.seconds');

fetch("./questions.json")
  .then((file) => file.json())
  .then((questions) => {
    numOfQuestions = questions.length;
    count.innerHTML = numOfQuestions;
    for (let i = 0; i < numOfQuestions; i++) {
      let span = document.createElement("span");
      if (i == 0) {
        span.classList.add("on");
      }
      spans.appendChild(span);
    }

    addQuestionData(questions[currentIndex], numOfQuestions);
    
    // Submiting Data

    submitBtn.onclick = () => {
        let rightAnswer =  questions[currentIndex].right_answer;

        
        //increase index
        currentIndex++;

        // Check Answer 
        checkAnswer(rightAnswer,numOfQuestions);

        question.innerHTML = '';
        answer.innerHTML = '';
        addQuestionData(questions[currentIndex], numOfQuestions);
        spans.innerHTML = '';
        for (let i = 0; i < numOfQuestions; i++) {
            let span = document.createElement("span");
            if (i <= currentIndex) {
              span.classList.add("on");
            }
            spans.appendChild(span);
          }
    }
  });

// Add Question Data
function addQuestionData(obj, count) {
    console.log(rightAnswer)
    if(currentIndex == numOfQuestions) {
        let span = document.createElement('span');
        let spanText;
        let score = document.createTextNode(`You Answered ${rightAnswer} from 9`);
        if(rightAnswer == 9) {
            spanText = document.createTextNode('Perfect!');
            span.classList.add('perfect')
        } else if(rightAnswer <= 8 && rightAnswer >= 5) {
            spanText = document.createTextNode('Good!');
            span.classList.add('good')
        } else if(rightAnswer < 5) {
            spanText = document.createTextNode('Bad!');
            span.classList.add('bad')
        }  
        span.style.marginRight = '.2em'
        span.appendChild(spanText);
        resultDiv.appendChild(span);
        resultDiv.appendChild(score);
        submitBtn.remove();
        seconds.innerHTML = '00';
        minutes.innerHTML = '00';
        clearInterval(time);
    }
  // Create Question
  question.textContent = obj.title;
  // Create Answers
  for (let i = 1; i <= 4; i++) {
    let mainDiv = document.createElement("div");
    mainDiv.className = "answer";
    let radioInput = document.createElement("input");
    // Add Type + Name + Id + Data-attrb
    radioInput.name = "question";
    radioInput.type = "radio";
    radioInput.id = `answer_${i}`;
    radioInput.dataset.answer = obj[`answer_${i}`];

    // label
    let theLabel = document.createElement('label');
    theLabel.htmlFor = `answer_${i}`;
    theLabel.textContent = obj[`answer_${i}`];

    answer.appendChild(mainDiv);
    mainDiv.append(radioInput ,theLabel);

  }
}

// Check Answer 
function checkAnswer(rAnswer , count) {
    let answers = document.getElementsByName('question');
    let theChoosenAnswer;

    for(let i = 0 ; i < answers.length ; i++) {
        if(answers[i].checked) {
            theChoosenAnswer = answers[i].dataset.answer;
        }
    }

    if(rAnswer === theChoosenAnswer) {
        rightAnswer++;
    }
}

// Timer Function 
let time;
function Timer() {
    time = setInterval(() => {
        if(seconds.innerHTML === '0' || seconds.innerHTML === '00') {
            minutes.innerHTML -= 1;
            seconds.innerHTML = '60';
        } 
        seconds.innerHTML -= 1;
        if(seconds.innerHTML === '0' && minutes.innerHTML === '0') {
            alert('TimeOut!');
            clearInterval(time);
            location.reload();
        }
    }, 1000);
}



Timer();

