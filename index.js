let playerScore = 0;
let computerScore = 0;
let isGameOver = false;

function checkGameOver() {
  if (playerScore >= 5 || computerScore >= 5) {
    isGameOver = true;
    console.log(isGameOver);
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

let playerChoice;

const pokemonDivs = document.querySelector(".buttons");

function checkClick(e) {
  if (pokemonDivs.contains(e.target)) {
    let pokemon = e.target.classList[e.target.classList.length - 1];
    let allPokemon = document.querySelectorAll(".pokemon");
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
  }
}

document.body.addEventListener("click", checkClick);

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

const pokeball = document.querySelector(".computer-pokeball");

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
  const result = document.querySelector(".result");
  result.textContent = `You chose ${playerChoice} and the computer chose ${computerChoice}.`;
  const winner = document.querySelector(".winner");
  winner.textContent = winState;
}

function newRound() {
  pokeball.classList.add("shake");
  pokeball.classList.remove("grow");
  pokeball.src = "pokeball.png";
  document.body.addEventListener("click", checkClick);
  const anotherRound = document.querySelector(".try-again");
  anotherRound.removeChild(document.querySelector("button"));
  document.querySelector(".result").innerText = "";
  document.querySelector(".winner").innerText = "";
  document.querySelectorAll(".pokemon").forEach((div) => {
    div.style.display = "block";
  });
}

function game() {
  playRPS(computerChoose);
  document.body.removeEventListener("click", checkClick);
  checkGameOver();
  if (!isGameOver) {
    const anotherRound = document.querySelector(".try-again");
    const tryAgain = document.createElement("button");
    tryAgain.classList.add("try-again-btn");
    tryAgain.innerText = "Play again?";
    tryAgain.addEventListener("click", () => newRound());
    anotherRound.appendChild(tryAgain);
  } else {
    const p = document.createElement("p");
    p.classList.add("winner");
    p.innerText = "GAME OVER!";
    const resultContainer = document.querySelector(".result-container");
    resultContainer.appendChild(p);
    const button = document.createElement("button");
    button.innerText = "Reset";
    button.addEventListener("click", () => {
      playerScore = 0;
      computerScore = 0;
      isGameOver = false;
    });
    resultContainer.appendChild(button);
  }
}
