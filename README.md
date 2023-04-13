# Project - Grumpy Cat

# Description

Grumpy Cat is a game where the player has to move the cat positioned horizontally at the bottom and try to react to the items that come from the top. Catch treats increment the score, catch chocolates decrement the score, and catch cups also increment the score. However, if the cat does not manage to push the cups, the cat loses one of its seven lives.

# MVP (DOM - CANVAS)

- the game has a cat at the bottom that moves horizontally
- as soon he moves, things come from top to bottom
- these things are: treats, chocolates, and cups
- catch treats increment the score by 1
- catch chocolates decrement the score by -1
- push cups increment the score by 10
- hitting 100 points, leads to next level (to be developed)
- the game over when the cat loses its seven lives

# Backlog

- add multiple images to simulate the cat walking
- when pushing, make the cup change the direction not just disappear

# Data Structure

# index.js

class ElementFromTop { move(), draw(), collision() }
drawCat() {}
gameOverMessage() {}
winMessage() {}
animate() {}
startGame() {}
restartGame() {}

# States y States Transitions

isMovingRight = false;
isMovingLeft = false;
isPushingCup = false;
gameOver = false;
nextLevel = false;
elemFromTop = [];
score = 0;
lives = 7;

# Links

Project repo:
https://github.com/Francieli-S/grumpy-cat

Deploy link:
https://francieli-s.github.io/grumpy-cat/

Trello:
https://trello.com/b/oSK23WFq/grumpy-cat

Slides:
https://docs.google.com/presentation/d/1H1sRYyafvq2Ly1ANw8DhLmKCVDznX6OdbB3dUVCvgn4/edit?usp=sharing
