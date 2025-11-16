class Character {
  _life = 1;
  maxLife = 1;
  attack = 0;
  defense = 0;
  _attacked = false;
  color = null;

  constructor(name) {
    this.name = name;
  }

  get attacked() {
    return this._attacked;
  }

  set attacked(status) {
    this._attacked = status;
  }
  get life() {
    return this._life;
  }

  set life(newLife) {
    this._life = newLife < 0 ? 0 : newLife;
  }
}

class Knight extends Character {
  constructor(name) {
    super(name);
    this.life = 100;
    this.attack = 10;
    this.defense = 8;
    this.color = "green";
    this.image = "https://static.vecteezy.com/ti/vetor-gratis/p1/16469069-ilustracao-de-cavaleiro-medieval-com-espada-gratis-vetor.jpg";
    this.maxLife = this.life;
  }
}

class Sorcerer extends Character {
  constructor(name) {
    super(name);
    this.life = 80;
    this.attack = 15;
    this.defense = 3;
    this.color = "blue";
    this.image = "https://cdn.studioloot.com/studioloot/sorcerer-thumbnail.jpg";
    this.maxLife = this.life;
  }
}


class LittleMonster extends Character {
  constructor() {
    super("Little Monster");
    this.life = 40;
    this.attack = 4;
    this.defense = 4;
    this.maxLife = this.life;
    this.color = "red";
    this.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3djLtHvJbI-7L3zVzgEbjwulTfeFOyXLQsA&s";
  }
}

class BigMonster extends Character {
  constructor() {
    super("Big Monster");
    this.life = 120;
    this.attack = 16;
    this.defense = 6;
    this.color = "orange";
    this.image = "https://static.wikia.nocookie.net/tsrd/images/d/d8/Orc.jpg/revision/latest/scale-to-width-down/258?cb=20160206123228&path-prefix=pt-br";
    this.maxLife = this.life;
  }
}


class Stage {

  constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
    this.fighter1El = fighter1El;
    this.fighter2El = fighter2El;
    this.log = logObject;
  }

  start() {
    this.update()

    this.fighter1El.querySelector(".attackButton").addEventListener("click", () => {
      this.doAttack(this.fighter1, this.fighter2);
    });

    this.fighter2El.querySelector(".attackButton").addEventListener("click", () => {
      this.doAttack(this.fighter2, this.fighter1);
    });
  }


  update() {
    //fighter 1
    this.fighter1El.querySelector(".name").innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
    this.fighter1El.querySelector(".character-image").src = this.fighter1.image;
    let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
    this.fighter1El.querySelector(".bar").style.width = `${f1Pct}%`;
    
    //fighter 2
    this.fighter2El.querySelector(".name").innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
    this.fighter2El.querySelector(".character-image").src = this.fighter2.image;
    let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
    this.fighter2El.querySelector(".bar").style.width = `${f2Pct}%`;
  }


  getColor(character = Character) {
    switch(character.color) {
      case "blue":
        return "rgb(66, 133, 244)";
      case "red":
        return "rgb(219, 68, 55)";
      default:
        return "rgb(52, 168, 83)";
    }
  }

  doAttack(attacking = Character, attacked = Character) {
    //verificacao basica
    if (attacking.life <= 0) {
      this.log.addMessage(`${attacking.name} tá tentando levantar das cinzas e levar vantagem!`, this.getColor());
      return;
    }

    if (attacked.life <= 0) {
      this.log.addMessage(`${attacking.name} tá atacando só o puro osso!`, this.getColor());
      return;
    }

    if(attacking.attacked) {
      this.log.addMessage(`${attacking.name} ja atacou esse turno!`, this.getColor());
      return;
    }    
    const min_heal = 0
    const max_heal = 10

    let attackFactor = (Math.random() * 2).toFixed(2);
    let defenseFactor = (Math.random() * 2).toFixed(2);
    let healFactor = Math.round(Math.random() * (max_heal - min_heal) + min_heal);

    let actualAttack = attacking.attack * attackFactor;
    let actualDefense = attacked.defense * defenseFactor;
    let actualHeal = healFactor;

    if(actualAttack > actualDefense) {
      attacked.life -= actualAttack;
      if(attacked.attacked) attacked.attacked = false;
      if(actualAttack > 1) attacking.attacked = true;
      this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`, this.getColor(attacking));
    } else {
      attacked.life = Math.min(attacked.life + actualHeal, attacked.maxLife);
      attacking.attacked = false;
      this.log.addMessage(`${attacked.name} conseguiu defender o ataque de ${attacking.name} e se curou em ${actualHeal}`, this.getColor(attacked));
    }

    this.update();
  }
}


class Log {
  list = [];

  constructor(listEl = document.getElementById()) {
    this.listEl = listEl;
  }

  addMessage(msg, color = "rgb(52, 168, 83)") {
    this.list.push({ message: msg, color: color });
    this.render();
  }

  render() {
    this.listEl.innerHTML = "";
    for(let i in this.list) {
      this.listEl.innerHTML += `<li style="color: ${this.list[i].color}">${this.list[i].message}</li>`;
    }
  }

}