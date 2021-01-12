function computerChoose() {
  const random3 = Math.floor(Math.random() * 3) + 1;
  switch (random3) {
    case 1:
      return "Bulbasaur";
      break;
    case 2:
      return "Squirtle";
      break;
    case 3:
      return "Charmander";
      break;
    default:
      console.log("Something went wrong");
  }
}

let playerChoice;

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    playerChoice = e.target.innerText;
    game();
  });
});

function decideWinner(playerChoice, computerChoice) {
  const PLAYER_WINS = "You win!";
  const COMP_WINS = "The Computer wins!";
  const TIE = "It's a tie! Try again.";

  if (playerChoice === computerChoice) {
    return TIE;
  } else if (playerChoice === "Bulbasaur") {
    return computerChoice === "Squirtle" ? PLAYER_WINS : COMP_WINS;
  } else if (playerChoice === "Squirtle") {
    return computerChoice === "Charmander" ? PLAYER_WINS : COMP_WINS;
  } else if (playerChoice === "Charmander") {
    return computerChoice === "Bulbasaur" ? PLAYER_WINS : COMP_WINS;
  }
}

function playRPS(computerChoiceFunc) {
  const computerChoice = computerChoiceFunc();

  let winState = decideWinner(playerChoice, computerChoice);
  const p = document.querySelector(".result");
  p.textContent = `You chose ${playerChoice} and the computer chose ${computerChoice}. ${winState}`;
}

function game() {
  playRPS(computerChoose);
}

// for (let i = 0; i < 5; i++) {
//   game();
// }
