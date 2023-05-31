let currentQuestionIndex = 0;
let currentTeam = "A";
let scoreA = 0;
let scoreB = 0;
let tiebreakerIndex = 0;
let inTiebreaker = false;

const questions = [
  "Dá um exemplo de causa de poluição do ar para o meio ambiente?",
  "A causa florestal para a poluição no ar?",
  "Uma consequência da poluição do ar para o ser humano?",
  "Uma consequência da poluição no ar para o meio ambiente?",
];

const tiebreakerQuestions = ["Qual animal que produz o gás metano?"];

function nextQuestion() {
  if (currentQuestionIndex < questions.length) {
    document.getElementById("question").innerHTML =
      "Equipa " + currentTeam + ": " + questions[currentQuestionIndex];
    currentQuestionIndex++;
    document.getElementById("currentQuestion").innerHTML =
      currentQuestionIndex + " / " + questions.length;
  } else {
    if (scoreA === scoreB) {
      inTiebreaker = true;
      nextTiebreakerQuestion();
    } else {
      if (scoreA > scoreB) {
        announceWinner("A");
      } else {
        announceWinner("B");
      }
      document.getElementById("correct").style.display = "none";
      document.getElementById("incorrect").style.display = "none";
      document.getElementById("teamA").style.display = "none";
      document.getElementById("teamB").style.display = "none";
    }
  }
}

function nextTiebreakerQuestion() {
  document.getElementById("correct").style.display = "none";
  document.getElementById("incorrect").style.display = "none";
  document.getElementById("teamA").style.display = "inline-block";
  document.getElementById("teamB").style.display = "inline-block";
  if (tiebreakerIndex < tiebreakerQuestions.length) {
    document.getElementById("question").innerHTML =
      "Desempate: " + tiebreakerQuestions[tiebreakerIndex];
    tiebreakerIndex++;
  } else {
    alert("O jogo terminou em empate!");
  }
}

function answerQuestion(correct) {
  if (correct) {
    playAudio("sounds/nice.mp4");
    if (currentTeam === "A") {
      scoreA++;
      document.getElementById("scoreA").innerHTML = scoreA;
    } else {
      scoreB++;
      document.getElementById("scoreB").innerHTML = scoreB;
    }
  } else {
    playAudio("sounds/nope.mp4");
  }
  currentTeam = currentTeam === "A" ? "B" : "A";
  nextQuestion();
}
function answerTiebreaker(team) {
  if (team === "A") {
    scoreA++;
    document.getElementById("scoreA").innerHTML = scoreA;
    if (scoreA > scoreB) {
      announceWinner("A");
      document.getElementById("teamB").style.display = "none";
    }
  } else {
    scoreB++;
    document.getElementById("scoreB").innerHTML = scoreB;
    if (scoreB > scoreA) {
      announceWinner("B");
      document.getElementById("teamA").style.display = "none";
    }
  }
  document.getElementById("teamA").style.display = "none";
  document.getElementById("teamB").style.display = "none";
}

function startGame() {
  document.getElementById("startButton").style.display = "none";
  document.getElementById("question").style.display = "block";
  document.getElementById("correct").style.display = "block";
  document.getElementById("incorrect").style.display = "block";
  document.getElementById("currentQuestion").innerHTML =
    "1 / " + questions.length;
  nextQuestion();
}

function announceWinner(winningTeam) {
  document.getElementById("scoreboard").style.display = "none";
  document.getElementById("question").style.display = "none";
  document.getElementById("correct").style.display = "none";
  document.getElementById("incorrect").style.display = "none";
  document.getElementById("teamA").style.display = "none";
  document.getElementById("teamB").style.display = "none";
  document.getElementById("startButton").style.display = "none";

  const teamName = winningTeam === "A" ? "Equipa A" : "Equipa B";
  const message = "Parabéns " + teamName;
  const trophyImagePath = "trophy.png";

  const winnerMessage = document.createElement("h1");
  winnerMessage.innerText = message;
  winnerMessage.classList.add("winner-message");

  const trophyImage = document.createElement("img");
  trophyImage.src = trophyImagePath;
  trophyImage.alt = "Troféu";
  trophyImage.style.width = "100px";
  trophyImage.style.display = "block";
  trophyImage.style.margin = "0 auto";
  trophyImage.classList.add("rubberBand-animation");

  const winnerContainer = document.getElementById("winnerContainer");
  winnerContainer.innerHTML = "";
  winnerContainer.appendChild(winnerMessage);
  winnerContainer.appendChild(trophyImage);

  party.confetti(document.getElementById("body"), {
    count: 200, // Number of confetti particles
    size: 2, // Size of confetti particles
    colors: ["#ff0000", "#00ff00", "#0000ff"], // Colors of confetti particles
    rotate: function () {
      return Math.random() * 90; // Set the rotation angle here (in degrees)
    },
    spread: 400, // Spread angle of confetti particles
  });

  playAudio("sounds/winner.mp4");
}

window.onload = function () {
  document.getElementById("startButton").style.display = "block";
  document.getElementById("question").style.display = "none";
  document.getElementById("correct").style.display = "none";
  document.getElementById("incorrect").style.display = "none";
  document.getElementById("teamA").style.display = "none";
  document.getElementById("teamB").style.display = "none";
};

function playAudio(audioFilePath) {
  const audio = new Audio(audioFilePath);
  audio.play();
}
