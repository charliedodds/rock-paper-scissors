let playerScore = 0;
let computerScore = 0;
let isGameOver = false;
let playerChoice;

const pokemonDivs = document.querySelector(".buttons");
const allPokemon = document.querySelectorAll(".pokemon");
const body = document.body;
const pokeball = document.querySelector(".computer-pokeball");
const result = document.querySelector(".result");
const winner = document.querySelector(".winner");
const anotherRound = document.querySelector(".try-again");
const resultContainer = document.querySelector(".result-container");
const button = document.querySelector("button");
const newButton = document.createElement("button");
const score = document.querySelector("#score");
const peas = document.querySelectorAll("p");
const p = document.createElement("p");

body.addEventListener("click", checkClick);

function checkGameOver() {
  if (playerScore >= 5 || computerScore >= 5) {
    isGameOver = true;
  }
}

function computerChoose() {
  const random3 = Math.floor(Math.random() * 3) + 1;
  switch (random3) {
    case 1:
      return "Bulbasaur";
      break;
    case 2:
      return "Charmander";
      break;
    case 3:
      return "Squirtle";
      break;
    default:
      console.log("Something went wrong");
  }
}

function checkClick(e) {
  if (pokemonDivs.contains(e.target)) {
    let pokemon = e.target.classList[e.target.classList.length - 1];
    allPokemon.forEach((div) => {
      if (div.classList[div.classList.length - 1] !== pokemon) {
        div.style.display = "none";
      }
    });
    pokemon = pokemon.split("");
    pokemon[0] = pokemon[0].toUpperCase();
    pokemon = pokemon.join("");
    playerChoice = pokemon;
    game();
    setScore();
  }
}

function decideWinner(playerChoice, computerChoice) {
  const PLAYER_WINS = "You win!";
  const COMP_WINS = "The Computer wins!";
  const TIE = "It's a tie! Try again.";

  if (playerChoice === computerChoice) {
    return TIE;
  } else if (playerChoice === "Bulbasaur") {
    if (computerChoice === "Squirtle") {
      playerScore++;
      return PLAYER_WINS;
    } else {
      computerScore++;
      return COMP_WINS;
    }
  } else if (playerChoice === "Charmander") {
    if (computerChoice === "Bulbasaur") {
      playerScore++;
      return PLAYER_WINS;
    } else {
      computerScore++;
      return COMP_WINS;
    }
  } else if (playerChoice === "Squirtle") {
    if (computerChoice === "Charmander") {
      playerScore++;
      return PLAYER_WINS;
    } else {
      computerScore++;
      return COMP_WINS;
    }
  }
}

function playRPS(computerChoiceFunc) {
  const computerChoice = computerChoiceFunc();
  switch (computerChoice) {
    case "Bulbasaur":
      pokeball.src = "bulbasaur.png";
      break;
    case "Charmander":
      pokeball.src = "charmander.png";
      break;
    case "Squirtle":
      pokeball.src = "squirtle.png";
      break;
  }

  pokeball.classList.remove("shake");
  pokeball.classList.add("grow");

  let winState = decideWinner(playerChoice, computerChoice);

  result.textContent = `You chose ${playerChoice} and the computer chose ${computerChoice}.`;

  winner.textContent = winState;
}

function newRound() {
  resetBoard();
  body.addEventListener("click", checkClick);
  resultContainer.removeChild(document.querySelector("button"));
}

function game() {
  playRPS(computerChoose);
  body.removeEventListener("click", checkClick);
  checkGameOver();
  if (!isGameOver) {
    newButton.classList.add("try-again-btn");
    newButton.innerText = "Play again?";
    newButton.addEventListener("click", newRound);
    resultContainer.appendChild(newButton);
  } else {
    p.classList.add("winner");
    p.innerText = "GAME OVER!";
    resultContainer.appendChild(p);
    newButton.innerText = "Reset";
    newButton.addEventListener("click", reset);
    resultContainer.appendChild(newButton);
  }
}

function reset() {
  playerScore = 0;
  computerScore = 0;
  isGameOver = false;
  resetBoard();
  resultContainer.childNodes.forEach((p) => (p.innerText = ""));
  score.innerText = "";
}

function setScore() {
  score.innerText = `Player: ${playerScore} - Computer: ${computerScore}`;
}

function resetBoard() {
  pokeball.classList.add("shake");
  pokeball.classList.remove("grow");
  pokeball.src = "pokeball.png";
  allPokemon.forEach((div) => {
    div.style.display = "block";
  });
  resultContainer.childNodes.forEach((p) => (p.innerText = ""));
  body.addEventListener("click", checkClick);
}
