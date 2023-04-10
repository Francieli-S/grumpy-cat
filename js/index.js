window.addEventListener("load", () => {
  const scoreGame = document.querySelector("#score");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  const bgImg = new Image();
  bgImg.src = "../images/kitchen.png";
  //bgImg.style.opacity = "50"; ?

  const catRigth = new Image();
  catRigth.src = "";

  const catLeft = new Image();
  catLeft.src = "";

  const catSleep = new Image();
  catSleep.src = "";

  const catHeight = 60;
  const catWidth = 80;
  let catX = canvas.width / 2 - catWidth / 2;
  const catY = canvas.height - catHeight - 10;
  const catSpeed = 2;

  let isMovingRight = false;
  let isMovingLeft = false;

  let gameOver = false;
  let animatedId;
  let elemFromTop = [];

  let score = 0;
  scoreGame.innerText = score;

  class Type {
    constructor(color, score) {
      this.color = color;
      this.score = score;
    }
  }

  class Treat extends Type {
    constructor() {
      super("green", 1);
    }
  }

  class Chocolate extends Type {
    constructor() {
      super("red", -1);
    }
  }

  class Cup extends Type {
    constructor() {
      super("blue", 0);
    }
  }

  class ElementFromTop {
    constructor(type) {
      this.type = type;
      this.xPos = Math.random() * (canvas.width - 20);
      this.yPos = Math.random() * -10;
      this.width = 15;
      this.height = 15;
    }

    move() {
      this.yPos += 1;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.type.color;
      ctx.rect(this.xPos, this.yPos, this.width, this.height);
      ctx.fill();
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
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.rect(catX, catY, catWidth, catHeight);
    ctx.fill();
    ctx.closePath();
  };

  const animate = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    drawCat();

    const elemFromTopStilInScreen = [];

    elemFromTop.forEach((elem) => {
      elem.draw();
      console.log(elem.type);
      if (elem.collision() && elem.type === "Cup") {
        gameOver = true;
        console.log(gameOver);
      } else if (elem.collision()) {
        score += elem.type.score;
        console.log(score);
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

    if (animatedId === 30 || animatedId % 300 === 0) {
      const arr = ["CHOC", "TRE", "TRE", "CUP"];
      const random = Math.floor(Math.random() * arr.length);
      const nextType = arr[random];

      if (nextType === "CHOC") {
        elemFromTop.push(new ElementFromTop(new Chocolate()));
      } else if (nextType === "TRE") {
        elemFromTop.push(new ElementFromTop(new Treat()));
      } else if (nextType === "CUP") {
        elemFromTop.push(new ElementFromTop(new Cup()));
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
