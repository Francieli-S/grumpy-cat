window.addEventListener("load", () => {
  const scoreGame = document.querySelector("#score span");
  const livesGame = document.querySelector("#lives span");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  //const purr = new Audio("sounds/purr.mp3");
  //purr.play();

  const game = new Audio("sounds/game.mp3");
  game.play();

  const crunch = new Audio("sounds/crunch.mp3");
  crunch.play();

  const whoosh = new Audio("sounds/whoosh.mp3");
  whoosh.play();

  const scream = new Audio("sounds/scream.mp3");
  scream.play();

  const yuck = new Audio("sounds/yuck.mp3");
  yuck.play();

  const bgImg = new Image();
  bgImg.src = "images/kitchen.png";

  // in case I decide to use more images:
  // class Node {
  //   constructor(value) {
  //     (this.value = value), (this.next = null);
  //   }
  // }

  // class LinkedList {
  //   constructor(value) {
  //     this.head = {
  //       value: value,
  //       next: null,
  //     };
  //     this.tail = this.head;
  //     this.length = 1;
  //   }

  const catWalksRigthOne = new Image();
  catWalksRigthOne.src = "images/cat-right-one.png";

  const catWalksLeftOne = new Image();
  catWalksLeftOne.src = "images/cat-left-one.png";

  const catWalksRigthTwo = new Image();
  catWalksRigthTwo.src = "images/cat-right-one.png";

  const catWalksLeftTwo = new Image();
  catWalksLeftTwo.src = "images/cat-left-one.png";

  const catPushs = new Image();
  catPushs.src = "images/cat-pushing-right.png";

  // image before start the game
  // const catSleep = new Image();
  // catSleep.src = "";

  const treat = new Image();
  treat.src = "images/treat.png";

  const chocolate = new Image();
  chocolate.src = "images/chocolate.png";

  const cup = new Image();
  cup.src = "images/cup.png";

  let catHeight = 150;
  let catWidth = 200;
  let catX = canvas.width / 2 - catWidth / 2;
  const catY = canvas.height - catHeight - 10;
  const catSpeed = 3;

  let isMovingRight = false;
  let isMovingLeft = false;
  let isPushingCup = false;

  let gameOver = false;
  let nextLevel = false;
  let animatedId;
  let elemFromTop = [];

  let score = 0;
  let lives = 7;

  // add sounds as properties
  class ElementFromTop {
    constructor(img, score) {
      this.img = img;
      this.score = score;
      this.xPos = Math.random() * (canvas.width - 50);
      this.yPos = Math.random() * -10;
      this.width = 50;
      this.height = 50;
    }

    move() {
      this.yPos += 2;
    }

    draw() {
      ctx.beginPath();
      ctx.drawImage(this.img, this.xPos, this.yPos, this.width, this.height);
      ctx.closePath();
    }

    collision() {
      if (
        catX < this.xPos + this.width &&
        catX + catWidth > this.xPos &&
        catY < this.yPos + this.height &&
        catHeight + catY > this.yPos
      ) {
        return true;
      }
    }
  }

  // definitely, refactor it:
  const drawCat = () => {
    if (!isMovingRight && !isMovingLeft && !isPushingCup) {
      ctx.beginPath();
      ctx.drawImage(catWalksRigthOne, catX, catY, catWidth, catHeight);
      ctx.closePath();
    }
    if (isMovingRight) {
      isMovingLeft = false;
      ctx.beginPath();
      ctx.drawImage(catWalksRigthOne, catX, catY, catWidth, catHeight);
      ctx.closePath();
    }
    if (isMovingLeft) {
      isMovingRight = false;
      ctx.beginPath();
      ctx.drawImage(catWalksLeftOne, catX, catY, catWidth, catHeight);
      ctx.closePath();
    }
    if (isPushingCup) {
      isMovingRight = false;
      isMovingLeft = false;
      ctx.beginPath();
      ctx.drawImage(catPushs, catX, canvas.height - 160, 130, 150);
      ctx.closePath();
    }
  };

  const gameOverMessage = () => {
    ctx.font = "100px Source Sans Pro";
    ctx.fillStyle = "rgb(243, 60, 60)";
    ctx.fillText("GAME OVER", canvas.width / 2 - 240, canvas.height / 2 + 250);
  };

  const winMessage = () => {
    ctx.font = "70px Source Sans Pro";
    ctx.fillStyle = "rgb(2, 170, 170)";
    ctx.fillText(
      "YOU WON! CONGRATS!",
      canvas.width / 2 - 300,
      canvas.height / 2 + 250
    );
  };

  const animate = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    game.play();

    drawCat();

    const elemFromTopStilInScreen = [];

    // This part NEED to be refactored!!!
    elemFromTop.forEach((elem) => {
      elem.draw();
      if (score >= 100) {
        winMessage();
        nextLevel = true;
        scoreGame.innerText = "Go to next level";
      } else if (elem.collision() && elem.img === cup && !isPushingCup) {
        scream.play();
        lives -= 1;
        livesGame.innerText = lives;
        if (lives === 0) {
          scoreGame.innerText = "Game Over";
          gameOver = true;
        }
      } else if (elem.collision() && elem.img === cup && isPushingCup) {
        whoosh.play();
        score += elem.score;
        scoreGame.innerText = score;
      } else if (elem.collision() && elem.img === treat) {
        crunch.play();
        score += elem.score;
        scoreGame.innerText = score;
      } else if (elem.collision() && elem.img === chocolate) {
        yuck.play();
        score += elem.score;
        scoreGame.innerText = score;
      } else if (elem.collision()) {
        score += elem.score;
        scoreGame.innerText = score;
      } else if (!elem.collision() && elem.yPos < canvas.height) {
        elem.move();
        elemFromTopStilInScreen.push(elem);
      }
    });

    elemFromTop = elemFromTopStilInScreen;

    if (isMovingRight && catX < canvas.width - catWidth) {
      catX += catSpeed;
    } else if (isMovingLeft && catX > 0) {
      catX -= catSpeed;
    }

    if (animatedId === 30 || animatedId % 100 === 0) {
      const arr = ["CHOC", "CHOC", "TRE", "CUP", "CUP", "CUP"];
      const random = Math.floor(Math.random() * arr.length);
      const nextType = arr[random];

      // Pass sounds here when new instance
      if (nextType === "CHOC") {
        elemFromTop.push(new ElementFromTop(chocolate, -1));
      } else if (nextType === "TRE") {
        elemFromTop.push(new ElementFromTop(treat, +1));
      } else if (nextType === "CUP") {
        elemFromTop.push(new ElementFromTop(cup, 10));
      }
    }

    if (gameOver) {
      cancelAnimationFrame(animatedId);
      gameOverMessage();
    } else if (nextLevel) {
      cancelAnimationFrame(animatedId);
      winMessage();
    } else {
      animatedId = requestAnimationFrame(animate);
    }
  };

  const startGame = () => {
    drawCat();
    animate();
  };

  const restartGame = () => {
    isMovingRight = false;
    isMovingLeft = false;
    isPushingCup = false;

    gameOver = false;
    nextLevel = false;
    animatedId;
    elemFromTop = [];

    score = 0;
    scoreGame.innerText = score;

    lives = 7;
    livesGame.innerText = lives;

    drawCat();
    animate();
  };

  document.querySelector("#start-button").addEventListener("click", () => {
    startGame();
  });

  document.querySelector("#restart-button").addEventListener("click", () => {
    restartGame();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      isMovingRight = true;
    }
    if (event.key === "ArrowLeft") {
      isMovingLeft = true;
    }
    if (event.key === "ArrowUp") {
      isPushingCup = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") {
      isMovingRight = false;
    }
    if (event.key === "ArrowLeft") {
      isMovingLeft = false;
    }
    if (event.key === "ArrowUp") {
      isPushingCup = false;
    }
  });
});
