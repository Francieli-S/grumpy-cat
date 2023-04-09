window.addEventListener("load", () => {
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

  let isMovingRight = false;
  let isMovingLeft = false;

  let gameOver = false;
  let animatedId;
  let elemFromTop = [];

  class ElementFromTop {
    constructor(x) {
      this.xPos = x;
      this.yPos = -10;
      this.width = 15;
      this.height = 15;
    }

    move() {
      this.yPos += 1;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.rect(this.xPos, this.yPos, this.width, this.height);
      ctx.fill();
      ctx.closePath();
    }

    collision() {}
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
      elem.move();
      // is the elem still in the screen
      if (elem.yPos < canvas.height) {
        elemFromTopStilInScreen.push(elem);
      }
    });

    elemFromTop = elemFromTopStilInScreen;

    if (animatedId % 300 === 0) {
      // 300 is the height the obstacle falling atinge
      elemFromTop.push(new ElementFromTop(Math.random() * (canvas.width - 20)));
    }

    if (isMovingRight) {
      catX += 2;
    } else if (isMovingLeft) {
      catX -= 2;
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
    console.log(event);
    if (event.key === "ArrowRight") {
      isMovingRight = false;
    }
    if (event.key === "ArrowLeft") {
      isMovingLeft = false;
    }
  });
});
