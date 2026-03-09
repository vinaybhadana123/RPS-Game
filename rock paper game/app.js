// track scores for user and computer
let userScore = 0;
let compScore = 0;

// cached DOM elements
const choices = document.querySelectorAll(".choice");
const msgpara = document.querySelector("#msg");
const userScoreSpan = document.getElementById("user-score");
const compScoreSpan = document.getElementById("comp-score");
const restartButton = document.getElementById("restart");

// helper to pick a random option for the computer
const gencompchoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomidx = Math.floor(Math.random() * options.length);
    return options[randomidx];
};

// display result and update scores
const showwinner = (userwin, compchoice) => {
    if (userwin) {
        userScore++;
        userScoreSpan.innerText = userScore;
        msgpara.innerText = `You chose ${lastUserChoice}, computer chose ${compchoice}. You win!`;
    } else {
        compScore++;
        compScoreSpan.innerText = compScore;
        msgpara.innerText = `You chose ${lastUserChoice}, computer chose ${compchoice}. You lose.`;
    }
};

const drawgame = (choice) => {
    msgpara.innerText = `Both chose ${choice}. It's a draw!`;
};

let lastUserChoice = null;

const playgame = (Userchoice) => {
    lastUserChoice = Userchoice;

    // highlight the user's picked circle briefly
    // clear any previous highlights
    choices.forEach((c) => c.classList.remove("active", "comp-active"));
    const el = document.getElementById(Userchoice);
    if (el) el.classList.add("active");
    setTimeout(() => el && el.classList.remove("active"), 500);

    const compchoice = gencompchoice();

    // briefly highlight the computer's pick too
    const compEl = document.getElementById(compchoice);
    if (compEl) {
        compEl.classList.add("comp-active");
        setTimeout(() => compEl.classList.remove("comp-active"), 500);
    }

    if (Userchoice === compchoice) {
        drawgame(Userchoice);
    } else {
        let userwin = true;
        if (Userchoice === "rock") {
            //scissor, paper
            userwin = compchoice === "paper" ? false : true;
        } else if (Userchoice === "paper") {
            // rock, scissor
            userwin = compchoice === "scissor" ? false : true;
        } else {
            //rock, paper
            userwin = compchoice === "rock" ? false : true;
        }
        showwinner(userwin, compchoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const Userchoice = choice.getAttribute("id");
        playgame(Userchoice);
    });
});

// reset scores when restart clicked
if (restartButton) {
    restartButton.addEventListener("click", () => {
        userScore = 0;
        compScore = 0;
        userScoreSpan.innerText = userScore;
        compScoreSpan.innerText = compScore;
        msgpara.innerText = "Scores reset. Play your move.";
    });
}


