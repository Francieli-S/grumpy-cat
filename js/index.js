window.addEventListener("load", () => {
  const scoreGame = document.querySelector("#score span");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  // const audio = new Audio(<path to audio>)
  // audio.play()

  const bgImg = new Image();
  bgImg.src = "images/kitchen.png";

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

  // const catSleep = new Image();
  // catSleep.src = "";

  const treat = new Image();
  treat.src = "images/treat.png";

  const chocolate = new Image();
  chocolate.src = "images/chocolate.png";

  const cup = new Image();
  cup.src = "images/cup.png";

  const catHeight = 150;
  const catWidth = 200;
  let catX = canvas.width / 2 - catWidth / 2;
  const catY = canvas.height - catHeight - 10;
  const catSpeed = 3;

  let isMovingRight = false;
  let isMovingLeft = false;

  let gameOver = false;
  let animatedId;
  let elemFromTop = [];

  let score = 0;

  console.log(typeof score);
  console.log(score);

  class ElementFromTop {
    constructor(img, score) {
      this.img = img;
      this.score = score;
      this.xPos = Math.random() * (canvas.width - 20);
      this.yPos = Math.random() * -10;
      this.width = 50;
      this.height = 50;
    }

    move() {
      this.yPos += 1;
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

  const drawCat = () => {
    if (isMovingRight) {
      ctx.beginPath();
      ctx.drawImage(catWalksRigthOne, catX, catY, catWidth, catHeight);
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.drawImage(catWalksLeftOne, catX, catY, catWidth, catHeight);
      ctx.closePath();
    }
  };

  const animate = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    drawCat();

    const elemFromTopStilInScreen = [];

    elemFromTop.forEach((elem) => {
      elem.draw();
      if (elem.collision() && elem.img === cup) {
        gameOver = true;
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

    if (animatedId === 30 || animatedId % 150 === 0) {
      const arr = ["CHOC", "TRE", "TRE", "TRE", "CUP"];
      const random = Math.floor(Math.random() * arr.length);
      const nextType = arr[random];

      if (nextType === "CHOC") {
        // elemFromTop.push(new ElementFromTop(new Chocolate()));
        elemFromTop.push(new ElementFromTop(chocolate, -1));
      } else if (nextType === "TRE") {
        //elemFromTop.push(new ElementFromTop(new Treat()));
        elemFromTop.push(new ElementFromTop(treat, +1));
      } else if (nextType === "CUP") {
        //elemFromTop.push(new ElementFromTop(new Cup()));
        elemFromTop.push(new ElementFromTop(cup, 0));
      }
    }

    if (gameOver) {
      cancelAnimationFrame(animatedId);
    } else {
      animatedId = requestAnimationFrame(animate);
    }
  };

  const startGame = () => {
    animate();
  };

  document.querySelector("#start-button").addEventListener("click", () => {
    startGame();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      isMovingRight = true;
    }
    if (event.key === "ArrowLeft") {
      isMovingLeft = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") {
      isMovingRight = false;
    }
    if (event.key === "ArrowLeft") {
      isMovingLeft = false;
    }
  });
});
