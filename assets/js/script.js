let log = new Log(document.querySelector(".log"));
let stage = null;

const selectionArea = document.getElementById("selectionArea");
const gameArea = document.getElementById("gameArea");
const knightButton = document.getElementById("knightButton");
const sorcererButton = document.getElementById("sorcererButton");

function startPVE(characterClass) {
    selectionArea.style.display = "none";
    gameArea.style.display = "flex";

    let char;
    if (characterClass === "knight") {
        char = new Knight("Guerreiro");
    } else {
        char = new Sorcerer("Mago");
    }

    const monsters = [new LittleMonster(), new BigMonster()];
    let monster = monsters[Math.floor(Math.random() * monsters.length)];

    stage = new Stage(
        char,
        monster,
        document.querySelector("#char"),
        document.querySelector("#monster"),
        log
    );

    stage.start();
}

// Adicionar listeners aos botões de seleção
knightButton.addEventListener("click", () => startPVE("knight"));
sorcererButton.addEventListener("click", () => startPVE("sorcerer"));