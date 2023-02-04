import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.css']
})
export class SlotMachineComponent implements OnInit {
 
  symbols = [
    { name: "siete", image: "assets/siete.png" },
    { name: "bar", image: "assets/bar.png" },
    { name: "sandia", image: "assets/sandia.png" },
    { name: "cherry", image: "assets/cherry.png" },
    { name: "herradura", image: "assets/herradura.png" }
  ];
  weights = [0.1, 0.12, 0.15, 0.1, 0.15];

  winningCombinations = {
    "siete siete siete": 20,
    "bar bar bar": 30,
    "sandia sandia sandia": 25,
    "cherry cherry cherry": 10,
    "herradura herradura herradura": 15
  };

  reels: { name: string, image: string }[][] = [[], [], []];
  isWinner = false;
  winnings = 0;
  rodillo1 = [];
  rodillo2= [];
  rodillo3= [];

  isSpinning = false;
  
  spot= 0;

  showImage = false;

  constructor() { }

  ngOnInit(): void {
    this.iniciarSlots();
  }

  girar(){
  location.reload()
  }

  randomSymbol() {
    const totalWeight = this.weights.reduce((acc, cur) => acc + cur, 0);
    const rand = Math.random() * totalWeight;
    let symbol;
    let weightSum = 0;
    for (let i = 0; i < this.symbols.length; i++) {
      weightSum += this.weights[i];
      if (rand <= weightSum) {
        symbol = this.symbols[i];
        break;
      }
    }
    return symbol;
  }

  
  spin() {
    this.showImage = false;
    this.isSpinning = true;
    const spinButton = document.getElementById("spin-button");
    spinButton.setAttribute("disabled", "true");
    const symbols = document.querySelectorAll(".spin");
    symbols.forEach(symbol => symbol.classList.add("spin-animation"));

    // Genera los simbolos aleatorios para cada reel
    this.rodillo1 = this.randomSymbol();
    this.rodillo2 = this.randomSymbol();
    this.rodillo3 = this.randomSymbol();

    setTimeout(() => {
      symbols.forEach(symbol => symbol.classList.remove("spin-animation"));
      this.isSpinning = false;
      spinButton.removeAttribute("disabled");
      this.showImage = true;
      // Chequea si hay una combinacion ganadora
      this.checkWinningCombination();
      
      
    }, 3000);
    
  }

  spinx2() {
    this.showImage = false;
    this.isSpinning = true;
    const spinButton = document.getElementById("spin-button");
    spinButton.setAttribute("disabled", "true");
    const symbols = document.querySelectorAll(".spin");
    symbols.forEach(symbol => symbol.classList.add("spin-animation"));

    // Genera los simbolos aleatorios para cada reel
    this.rodillo1 = this.randomSymbol();
    this.rodillo2 = this.randomSymbol();
    this.rodillo3 = this.randomSymbol();

    setTimeout(() => {
      symbols.forEach(symbol => symbol.classList.remove("spin-animation"));
      this.isSpinning = false;
      spinButton.removeAttribute("disabled");
      this.showImage = true;
      // Chequea si hay una combinacion ganadora
      this.checkWinningCombinationx2();
      
    }, 3000);
    
  }

  checkWinningCombination() {
    // Toma los nombres de los símbolos en cada uno de los carretes
    const reel1 = this.rodillo1['name'];
    const reel2 = this.rodillo2['name'];
    const reel3 = this.rodillo3['name'];
    // Concatena los nombres de los símbolos para formar la combinación
    const combination = reel1 + ' ' + reel2 + ' ' + reel3;

    // Comprueba si la combinación es una ganadora
    if (this.winningCombinations[combination]) {
      this.isWinner = true;
      this.winnings = this.winningCombinations[combination];
      this.spot = this.spot + this.winnings;
    } else {
      this.isWinner = false;
      this.winnings = 0;
      this.spot = this.spot -1 ;
      
    }
    console.log(combination);
  }

  checkWinningCombinationx2() {
    // Toma los nombres de los símbolos en cada uno de los carretes
    const reel1 = this.rodillo1['name'];
    const reel2 = this.rodillo2['name'];
    const reel3 = this.rodillo3['name'];
    // Concatena los nombres de los símbolos para formar la combinación
    const combination = reel1 + ' ' + reel2 + ' ' + reel3;

    // Comprueba si la combinación es una ganadora
    if (this.winningCombinations[combination]) {
      this.isWinner = true;
      this.winnings = this.winningCombinations[combination];
      this.spot = this.spot + (this.winnings * 2);
    } else {
      this.isWinner = false;
      this.winnings = 0;
      this.spot = this.spot -2 ;
      
    }
    console.log(combination);
  }
  
  cargarCreditos(){
    var cargador = (document.getElementById('cargador') as HTMLInputElement)!.value;
    this.spot = this.spot + parseInt(cargador);
  }

  iniciarSlots(){
    this.rodillo1 = Symbol[0];
    this.rodillo2 = Symbol[1];
    this.rodillo3 = Symbol[2];
  }
  
}