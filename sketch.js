let font;
let img;
let hammer;

let cursorX;
let cursorY;
//flappyBird
//home
let currentPage = "home";
let currentButton = "";

let score = 0;
let time = 1100;
let rand;

let moleSprite;
let moleSprites;
let holes;
let currentHole;
let holeTimer = 100;

let pipeLine;
let ground;
let pipeLineReversed;
let birdVictory = false; 
let birdReset = false;
let birdMouse = true; 
let gameCurrent = true;
let birdDefeat = false;
let birdAttempt = 0;
let birdScore = 0;
let birdTimeout;
let bird;
let incrementedAttempt = false; 
let timeoutActive = false;

let tileBackground;
let snakeMouth;
let snakeGameOver;
let replayButton;
let arrowKeyInfo;
let iApple;
let iTrophy;
let x_snake = 100, y_snake = 200;
let win_w, win_h;
let resize = 20;

let warTorn; 
let landMine;
let scissors;
let mines = [];
let minesDefused = 0;
let level1 = true;
let level2 = false;
let level1mine = true;
let level2mine = false;
let minetime = 5;
let mineactive2 = false;
let mineover = false;

function preload() 
{
  font = loadFont('/assets/Inconsolata.otf');
  img = loadImage('/assets/ArcadeCabinet.png');
  
  moleSprite = loadImage('/assets/mole.png');
  hammer = loadImage('/assets/hammer2.png');
  
  pipeLine = loadImage('/assets/Pipe_Transparent.png');
  pipeLineReverse = loadImage('/assets/Pipe Reverse.png'); 
  flappyBird = loadImage('/assets/Flappy_Bird.png'); 
  ground = loadImage('/assets/flappyBirdFloor.png'); 
  bird =  loadImage('/assets/Flappy_Bird.png');
  
  tileBackground = 
    loadImage('/assets/SnakeTileBackground.png');
  arrowKeyInfo = loadImage('/assets/ArrowKeysBG.png');
  snakeMouth = loadImage('assets/SnakeMouthBG.png');
  snakeGameOver = loadImage('assets/SnakeGameOverBG.png');
  replayButton = loadImage('assets/SnakeReplayButton.png');
  iApple = loadImage('assets/appleBG.png');
  iTrophy = loadImage('assets/trophyBG.png');
  
  warTorn = loadImage('/assets/WarTornImage.jpg');
  landMine = loadImage('/assets/landMine.png');
  scissors = loadImage('/assets/scissors.png');
}

function setup() 
{
  createCanvas(600, 400);
  cursor(CROSS);
  
  cursorX = winMouseX;
  cursorY = winMouseY;
  
  rand = Math.round(random(1, 6));
  
  win_w = floor(width - resize);
  win_h = floor(height - resize);
  spawnFood();

  mineSetup();
}

function draw() 
{
  background(220);
  
  background("#E5E4F1");
  clearScreen = false;
  
  if (currentPage == "home")
  { 
    homePage();
    mousePressed();
  }
  
  if (currentPage == "homeRedo") {
    homePageRedo();
    mousePressed();
  }
  else if (currentPage == "pageTwo")
  {
    pageTwo(); 
    mousePressed();
  }
  else if (currentPage == "drawingShapes")
  {    
    drawingShapesPage();
    mousePressed();
  }
  else if (currentPage == "whackAMole")
  {
    whackAMolePage();
    mousePressed();
    
    image(hammer, cursorX-30, cursorY-30, 60, 60);
    noCursor();
  }
  else if (currentPage == "mineSweeper")
  {
    mineSweeperPage();
    mousePressed();
    
    for (let i = 0; i < mines.length; i++) 
    {
      let mine = mines[i];
      image(landMine, mine.x, mine.y, 100, 75);
    }
  }
  else if (currentPage == "snake")
  {
    snakePage();
    mousePressed();
  }
  else if (currentPage == "flappyBird")
  {
    flappyBirdPage();
    mousePressed();
  }
  
   if (level2 == true) {
    image(pipeLine, 275, 222, 100, 125);
    image(pipeLineReverse, 270, -10, 100, 190);
    image(pipeLineReverse, 330, -10, 100, 195);
    image(pipeLine, 330, 198, 100, 150);
  }
  
  

}

function mineOver() {
  mineover = true; // Ensure Game Over state remains active
  setTimeout(() => {
    minetime = 5; // Reset timer for a new game
    level2mine = false; // Restart the game logic
    mineover = false; // Clear the Game Over state
  }, 3000); // Delay of 3 seconds to allow Game Over screen display
}


function mineOverScreen() {
  fill("black");
  textSize(25); 
  text("Game Over", 300, 125);
}

function mouseIsOverButton()
{
  cursorX = winMouseX;
  cursorY = winMouseY;
  
  let checkCurPos;
  
  if (currentPage == "home")
  {
      return ((cursorX >= 200) && (cursorX <= 400)) &&
      ((cursorY >= 300) && (cursorY <= 340));
  } 
  
  if (currentPage == "homeRedo"){
    return ((cursorX >= 200) && (cursorX <= 400)) &&
      ((cursorY >= 300) && (cursorY <= 340));
  }
  
  // back button
  checkCurPos = ((cursorX >= 20) && (cursorX <= 120)) &&
  ((cursorY >= 15) &&  (cursorY <= 56));
  
  if (checkCurPos)
  {
    if (currentPage == "pageTwo")
    { currentButton = "pageTwoBackButton"; }
    else if (currentPage == "drawingShapes")
    { currentButton = "drawingShapesBackButton"; }
    else if (currentPage == "whackAMole")
    { currentButton = "whackAMoleBackButton"; }
    else if (currentPage == "mineSweeper")
    { currentButton = "mineSweeperBackButton"; }
    else if (currentPage == "snake")
    { currentButton = "snakeBackButton"; }
    else if (currentPage == "flappyBird")
    { currentButton = "flappyBirdBackButton"; }
      
    return ((cursorX >= 20) && (cursorX <= 120)) &&
    ((cursorY >= 15) &&  (cursorY <= 56));
  }
  
  // drawing shapes play button
  checkCurPos = ((cursorX >= 370) && (cursorX <= 455)) &&
  ((cursorY >= 108) && (cursorY <= 153));
    
  if (checkCurPos)
  {
    currentButton = "pageTwoDrawingShapesButton";
    return ((cursorX >= 370) && (cursorX <= 455)) &&
    ((cursorY >= 108) && (cursorY <= 153));
  }
    
  // whack a mole button
  checkCurPos = ((cursorX >= 370) && (cursorX <= 455)) &&
  ((cursorY >= 160) && (cursorY <= 204));
    
  if (checkCurPos)
  {
    currentButton = "pageTwoWhackAMoleButton";
    return ((cursorX >= 370) && (cursorX <= 455)) &&
    ((cursorY >= 160) && (cursorY <= 204));
  }
    
  // mine sweeper button
  checkCurPos = ((cursorX >= 370) && (cursorX <= 455)) &&
  ((cursorY >= 213) && (cursorY <= 257));
    
  if (checkCurPos)
  {
    currentButton = "pageTwoMineSweeperButton";
    return ((cursorX >= 370) && (cursorX <= 455)) &&
  ((cursorY >= 213) && (cursorY <= 257));
  }
    
  // snake button
  checkCurPos = ((cursorX >= 370) && (cursorX <= 455)) &&
  ((cursorY >= 267) && (cursorY <= 310));
    
  if (checkCurPos)
  {
    currentButton = "pageTwoSnakeButton";
    return ((cursorX >= 370) && (cursorX <= 455)) &&
  ((cursorY >= 267) && (cursorY <= 310));
  }
    
  // flappy bird button
  checkCurPos = ((cursorX >= 370) && (cursorX <= 455)) &&
  ((cursorY >= 322) && (cursorY <= 364));
    
  if (checkCurPos)
  {
    currentButton = "pageTwoFlappyBirdButton";
    return ((cursorX >= 370) && (cursorX <= 455)) &&
  ((cursorY >= 322) && (cursorY <= 364));
  }
    
  // whack a mole play button
  checkCurPos = ((cursorX >= 198) && (cursorX <= 398)) &&
  ((cursorY >= 329) && (cursorY <= 374));
    
  if (checkCurPos)
  {
    currentButton = "whackAMolePlayButton";
    return ((cursorX >= 198) && (cursorX <= 398)) &&
  ((cursorY >= 329) && (cursorY <= 374));
  }
  
  checkCurPos = ((cursorX >= 22) && (cursorX <= 119)) &&
  ((cursorY >= 314) && (cursorY <= 374));
  
  if (checkCurPos)
  {
    currentButton = "pageTwoHomeBackButton";
    return ((cursorX >= 22) && (cursorX <= 119)) &&
  ((cursorY >= 314) && (cursorY <= 374));
  }
}

function mousePressed()
{
  if (mouseIsOverButton() && mouseIsPressed 
      && (currentPage === "home" || currentPage == "homeRedo")) 
  {
    console.log("home play button clicked");
    currentPage = "pageTwo";
    // clear(); 
    pageTwo();
  }
  //FIX ME IT KEEPS ON EITHER GOING TO HOMEPAGE REDO OR GAME OPTIONS DEPENDING ON WHAT YOU PLACE AS THE CURRENT PAGE AND THE FUNCTION
  
  /*if (mouseIsOverButton() && mouseIsPressed
      && currentPage == "pageTwo" 
      && currentButton == "pageTwoBackButton")
  {
    console.log("page two back button clicked");
    currentPage = "homeRedo";
    // clear();
  }*/
  
   if (mouseIsOverButton() && mouseIsPressed
        && currentPage == "pageTwo"
        && currentButton == "pageTwoHomeBackButton")
   {
     console.log("page two home back button clicked");
     currentPage = "homeRedo";
     homePage();
   }
  
  if (mouseIsOverButton() && mouseIsPressed
            && currentPage == "pageTwo"
            && currentButton == "pageTwoDrawingShapesButton")
   {
     console.log("page two - drawing shapes play button clicked");
     currentPage = "drawingShapes";
     // clear();
     drawingShapesPage();
   }
   else if (mouseIsOverButton() && mouseIsPressed
             && currentPage == "drawingShapes" 
             && currentButton == "drawingShapesBackButton")
   {
     console.log("drawing shapes back button clicked");
     currentPage = "pageTwo";
     // clear();
     pageTwo();
     cursor(CROSS);
   }
   
  if (mouseIsOverButton() && mouseIsPressed 
             && currentPage == "pageTwo"
             && currentButton == "pageTwoWhackAMoleButton")
   {
     console.log("page two - whack a mole play button clicked");
     currentPage = "whackAMole";
     // clear();
     time = 1100;
     whackAMolePage();
   }
   else if (mouseIsOverButton() && mouseIsPressed
             && currentPage == "whackAMole" 
             && currentButton == "whackAMoleBackButton")
   {
     console.log("whack a mole back button clicked");
     currentPage = "pageTwo";
     // clear();
     pageTwo();
     cursor(CROSS);
  }
  
  if (mouseIsOverButton() && mouseIsPressed 
            && currentPage == "pageTwo"
            && currentButton == "pageTwoMineSweeperButton")
  {
    console.log("page two - mine sweeper play button clicked");
    currentPage = "mineSweeper";
    // clear();
    mineSweeperPage();
  }
  else if (mouseIsOverButton() && mouseIsPressed
            && currentPage == "mineSweeper" 
            && currentButton == "mineSweeperBackButton")
  {
    console.log("minesweeper back button clicked");
    currentPage = "pageTwo";
    // clear();
    pageTwo();
    cursor(CROSS);
  }
  
  if (mouseIsOverButton() && mouseIsPressed 
            && currentPage == "pageTwo"
            && currentButton == "pageTwoSnakeButton")
  {
    console.log("page two - snake play button clicked");
    currentPage = "snake";
    // clear();
    snakePage();
  }
  else if (mouseIsOverButton() && mouseIsPressed
            && currentPage == "snake" 
            && currentButton == "snakeBackButton")
  {
    console.log("snake back button clicked");
    currentPage = "pageTwo";
    // clear();
    pageTwo();
  }
  
  if (mouseIsOverButton() && mouseIsPressed 
            && currentPage == "pageTwo"
            && currentButton == "pageTwoFlappyBirdButton")
  {
    console.log("page two - flappy bird play button clicked");
    currentPage = "flappyBird";
    // clear();
    mineSweeperPage();
  }
  else if (mouseIsOverButton() && mouseIsPressed
            && currentPage == "flappyBird" 
            && currentButton == "flappyBirdBackButton")
  {
    console.log("flappy bird back button clicked");
    currentPage = "pageTwo";
    // clear();
    level2 = false;
    level1 = true;
    pageTwo();
    cursor(CROSS);
  }
  else if (mouseIsPressed) 
  {
    for (let i = mines.length - 1; i >= 0; i--) 
    {
      let mine = mines[i];

      // Check if the mouse click is 
      // within the bounds of the mine
      if (mouseX > mine.x && mouseX < mine.x + 100 && 
          /*Mine width is 100*/
          mouseY > mine.y && mouseY < mine.y + 75     
          /*Mine height is 75*/) 
      {
        // Remove the mine from the array
        mines.splice(i, 1);
        minesDefused +=1;
        break; // Exit the loop once a mine is clicked
      }
    }
  } 
}

function homePage()
{
  background("#5EBBC9");
  
  textFont(font);
  textSize(65);
  strokeWeight(0.5);
  fill("#FFF09E");
  text('Toddler Arcade', 70, 90);
  
  image(img, 220, 113, 180, 184);
  
  fill("#9EECF8");
  //               x,  y,   w,  h,   r
  button = rect(205, 299, 200, 45, 10);
  if (mouseIsOverButton())
  {
    fill("#94DCE8");
    //               x,  y,   w,  h,   r
    button = rect(205, 299, 200, 45, 10);
  }
    
  textFont(font);
  textSize(35);
  fill("black");
  //    text     x    y
  text('Play', 270, 332);
}

function homePageRedo(){ //COPY AND PASTE THIS FUNCTION
  // console.log("Reached here redo");
  background("#5EBBC9");
  
  textFont(font);
  textSize(65);
  strokeWeight(0.5);
  fill("#FFF09E");
  text('Toddler Arcade', 290, 75);
  
  image(img, 220, 113, 180, 184);
  
  fill("#9EECF8");
  //               x,  y,   w,  h,   r
  button = rect(205, 299, 200, 45, 10);
  if (mouseIsOverButton())
  {
    fill("#94DCE8");
    //               x,  y,   w,  h,   r
    button = rect(205, 299, 200, 45, 10);
  }
    
  textFont(font);
  textSize(35);
  fill("black");
  //    text     x    y
  text('Play', 305, 320);
}

function pageTwo()
{
  background("#5EBBC9");
  
  fill('white');
  strokeWeight(0.5);
  rectMode(CORNER);
  //    x, y,   w,   h,  r
  /*rect(20, 20, 100, 40, 10);
  if (mouseIsOverButton() 
      && currentButton == "pageTwoBackButton")
  {
    fill('#E8E8E8');
    //            x,  y,   w,   h,  r
    button = rect(20, 20, 100, 40, 10);
  }
  
  fill('black');
  textFont(font);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Back", 70, 37);*/
  
  fill('white');
  rect(20, 315, 100, 60, 10);
  if (mouseIsOverButton() 
      && currentButton == "pageTwoHomeBackButton")
  {
    fill('#E8E8E8');
    button = rect(20, 315, 100, 60, 10);
  }
  
  fill('black');
  textFont(font);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Back", 70, 330);
  text("Home", 70, 353);
  
  textSize(35);
  text("Game Options", 300, 82);
  
  fill("white");
  //     x,    y,  w,  h,  r  
  rect(160, 112, 300, 45, 10);
  textSize(24);
  fill("black");
  text("Drawing Shapes", 260, 132);
    
  fill("orange");
  //     x,  y,  w,  h,  r  
  rect(376, 112, 85, 45, 10);
  if (mouseIsOverButton() 
      && currentButton == "pageTwoDrawingShapesButton")
  {
    fill('#E38900');
    //     x,  y,  w,  h,  r  
    button = rect(376, 112, 85, 45, 10);
  }
  fill("black");
  text("Play", 420, 133);
  
  fill("white");
  //     x,    y,  w,  h,  r  
  rect(160, 164, 300, 45, 10);
  fill("black");
  text("Whack A Mole", 248, 184);
  
  fill("orange");
  //     x,  y,  w,  h,  r 
  rect(376, 164, 85, 45, 10);
  if (mouseIsOverButton() 
      && currentButton == "pageTwoWhackAMoleButton")
  {
    fill('#E38900');
    //     x,  y,  w,  h,  r 
    rect(376, 164, 85, 45, 10);
  }
  fill("black");
  text("Play", 420, 184);
  
  fill("white");
  //     x,    y,  w,  h,  r  
  rect(160, 216, 300, 45, 10);
  fill("black");
  text("Mine Sweeper", 250, 236);
  
  fill("orange");
  //     x,  y,  w,  h,  r 
  rect(376, 216, 85, 45, 10);
  if (mouseIsOverButton() 
      && currentButton == "pageTwoMineSweeperButton")
  {
    fill('#E38900');
    //     x,  y,  w,  h,  r 
    rect(376, 216, 85, 45, 10);
  }
  fill("black");
  text("Play", 420, 236);
  
  fill("white");
  //     x,    y,  w,  h,  r  
  rect(160, 268, 300, 45, 10);
  fill("black");
  text("Snake", 205, 287);
  
  fill("orange");
  //     x,  y,  w,  h,  r
  rect(376, 268, 85, 45, 10);
  if (mouseIsOverButton() 
      && currentButton == "pageTwoSnakeButton")
  {
    fill('#E38900');
    //     x,  y,  w,  h,  r
    rect(376, 268, 85, 45, 10);
  }
  fill("black");
  text("Play", 420, 287);
  
  fill("white");
  //     x,    y,  w,  h,  r  
  rect(160, 320, 300, 45, 10);
  fill("black");
  text("Flappy Bird", 242, 339);
  
  fill("orange");
  //     x,  y,  w,  h,  r
  rect(376, 320, 85, 45, 10);
  if (mouseIsOverButton() 
      && currentButton == "pageTwoFlappyBirdButton")
  {
    fill('#E38900');
    //     x,  y,  w,  h,  r
    rect(376, 320, 85, 45, 10);
  }
  fill("black");
  text("Play", 420, 340);
}

let clear = false;
let flag00 = false, flag01 = false, flag02 = false;
let flag10 = false, flag11 = false, flag12 = false;
let flag20 = false, flag21 = false, flag22 = false;

let overCircle = false, 
    overSquare = false, 
    overTriangle = false;

function drawingShapesPage()
{
  background("#5EBBC9");
  
  fill('white');
  strokeWeight(0.5);
  rectMode(CORNER);
  //     x,    y,   w,   h,  r
  button = rect(20, 20, 100, 40, 10);
  
  fill('black');
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Back", 70, 37);
  
  fill('white');
  button = rect(488, 346, 100, 40, 10);
  
  textSize(24);
  textAlign(CENTER, CENTER);
  fill('black');
  text("Clear", 535, 365);
  
  if (cursorX >= 488 && cursorX <= 588 && 
      cursorY >= 346 && cursorY <= 386 && mouseIsPressed) 
  { clear = true; }
  
  if (clear == true)
  {
    clear = false;
    flag00 = flag01 = flag02 = false;
    flag10 = flag11 = flag12 = false;
    flag20 = flag21 = flag22 = false;
  }
  
  fill('white');
  rect(20, 75, 100, 300, 20);
  
  clickCircleChoice();
  clickSquareChoice();
  clickTriangleChoice();
  
  // [0, 0]
  flag00 = clickCircle(200, 125, 65, flag00);
  fill('white');
  
  // [0, 1] 
  flag01 = clickTriangle(163.5, 255, 196, 175, 238.5, 255, flag01);
  fill('white');
  
  // [0, 2]
  flag02 = clickCircle(200, 310, 65, flag02);
  fill('white');
  
  // [1, 0]
  flag10 = clickSquare(275, 95, 65, flag10);
  fill('white');
  
  // [1, 1]
  flag11 = clickSquare(275, 190, 65, flag11);
  fill('white');
  
  // [1, 2]
  flag12 = clickTriangle(280.5, 350, 313, 270, 355.5, 350, flag12);
  fill('white');
  
  // [2, 0]
  flag20 = clickTriangle(390.5, 150, 423, 70, 455.5, 150, flag20);
  fill('white');
  
  // [2, 1]
  flag21 = clickCircle(420, 225, 65, flag21);
  fill('white');
  
  // [2, 2]
  flag22 = clickSquare(390, 290, 65, flag22);
  fill('white');
  
  // Draw the cursor shapes based on selection
  if (overCircle)
  { 
    fill('black'); 
    circle(cursorX, cursorY, 45); 
  }
  
  if (overSquare)
  { 
    fill('black'); 
    square(cursorX - 20, cursorY - 20, 45); 
  }
  
  if (overTriangle)
  { 
    fill('black'); 
    triangle(cursorX + 20, cursorY + 20, cursorX - 50, cursorY + 20, cursorX - 10, cursorY - 5);
  }
  fill('white');
}

function clickCircle(xPos, yPos, d, flag)
{
  let distance = dist(cursorX, cursorY, xPos, yPos);
  
  if (distance <= (d - 20) && mouseIsPressed)
  { flag = true; }
  
  if (flag)
  {
    if (overCircle)
    {
      fill('lime');
    }
    else
    {
      fill('red');
    }
    circle(xPos, yPos, d);
  }
  else
  { 
    fill('white');
    circle(xPos, yPos, d);
  }
  
  return flag;
}

function clickTriangle(xPosO, yPosO, xPosT, yPosT, xPosTh, yPosTh, flag)
{
  if (cursorX >= xPosO && xPosTh >= cursorX && 
      cursorY >= yPosT && yPosTh >= cursorY && mouseIsPressed)
  { flag = true; }

  if (flag)
  {
    if (overTriangle)
    {
      fill('lime');
    }
    else
    {
      fill('red');
    }
    triangle(xPosO, yPosO, xPosT, yPosT, xPosTh, yPosTh);
  }
  else
  { 
    fill('white');
    triangle(xPosO, yPosO, xPosT, yPosT, xPosTh, yPosTh);
  }
  
  return flag; 
}

function clickSquare(xPos, yPos, _scale, flag)
{
  if (cursorX >= xPos && (xPos + _scale) >= cursorX &&
      cursorY >= yPos && (yPos + _scale) >= cursorY && 
      mouseIsPressed)
  { flag = true; }

  if (flag)
  {
    if (overSquare)
    {
      fill('lime');
    }
    else
    {
      fill('red');
    }
    square(xPos, yPos, _scale);
  }
  else
  { 
    fill('white');
    square(xPos, yPos, _scale);
  }
  
  return flag;
}

function clickCircleChoice()
{
  let distance = dist(cursorX, cursorY, 72, 125);
  
  if (distance <= 45 && mouseIsPressed)
  {
    fill('lime');
    circle(72, 125, 65);
    overCircle = true;
    overSquare = overTriangle = false;
  }
  else
  {
    fill('white');
    circle(72, 125, 65);
  }
}

function clickSquareChoice()
{ 
  if (cursorX >= 40 && 104 >= cursorX &&
      cursorY >= 175 && 240 >= cursorY && mouseIsPressed)
  {
    fill('lime');
    square(40, 175, 65);
    overSquare = true;
    overCircle = overTriangle = false;
  }
  else
  {
    fill('white');
    square(40, 175, 65);
  }
}

function clickTriangleChoice()
{
  if (cursorX >= 36 && 110 >= cursorX && 
      cursorY >= 250 && 329 >= cursorY && mouseIsPressed)
  {
    fill('lime');
    triangle(37.5, 330, 70, 250, 112.5, 330); 
    overTriangle = true;
    overCircle = overSquare = false;
  }
  else
  {
    fill('white');
    triangle(37.5, 330, 70, 250, 112.5, 330); 
  }
}

function flagHole(distance)
{
  if (holeTimer != 0) 
  { 
    holeTimer += -1; 
    if (distance <= 30 && mouseIsPressed)
    {
      score += 10;
      holeTimer = 0;
    }
  }
  else 
  { 
    rand = Math.round(random(1, 6)); 
    holeTimer = 100;  
  }
  
  // for debug
  //text(`rand: ${rand}`, 0, 150);
}

function whackAMolePage()
{  
  background("#5EBBC9");
  
  strokeWeight(0.5);
  fill('white');
  rectMode(CORNER);
  
  //             x,    y,   w,   h,  r
  button = rect(20, 20, 100, 40, 10);
  // text(`x: ${(cursorX)}, y: ${(cursorY)}`, 75, 0);
  rect(485,20,100,40,10);
  fill('black');
  text("Level 2", 535, 37);
  
  if (mouseIsOverButton() 
      && currentButton == "whackAMoleBackButton")
  {
    fill('#E8E8E8');
    //              x,    y,   w,   h,  r
    button = rect(20, 20, 100, 40, 10);
  }
  
   if (cursorX >= 495 && cursorX <= 590 && 
        cursorY >= 30 && cursorY <= 70 && mouseIsPressed) {
     time = 900;
   }
  
  fill('black');
  textFont(font);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Back", 70, 37);
  
  fill("#FEFE66");
  textSize(35);
  text("Whack A Mole", 300, 80);
   
  fill("#9EECF8");
  //    x,  y,   w,  h,   r
  rect(205, 330, 200, 45, 10);
  if (mouseIsOverButton()
      && currentButton == "whackAMolePlayButton")
  {
    fill("#94DCE8");
    //             x,  y,   w,  h,   r
    button = rect(205, 330, 200, 45, 10);
  }
  textSize(35);
  fill("black");
  //    text     x    y
  text('Play', 303, 348);
  
  fill('#3F3F3F');
  holes = 
  [
    // [0, 0] pos
    circle(170,  160,  60),
    // [0, 1] pos
    circle(300,  160,  60),
    // [0, 2] pos
    circle(430,  160,  60),
    // [1, 0] pos
    circle(170,  250,  60),
    // [1, 1] pos
    circle(300,  250,  60),
    // [1, 2] pos
    circle(430,  250,  60)
  ];
  
  fill("white");
  textSize(25);
  text(`Score: ${score}`, 80, 350);
    
  if (time != 0)
  {
    time += -1;
    text(`Timer: ${time}`, 497, 350);
  }
  else
  { text(`Timer: ${0}`, 509, 350); }

  let distance;
  
  if (time != 0)
  {
    switch(rand)
    {
      case 1: // [0, 0] pos
        image(moleSprite, 130, 120, 80, 80); 
        distance = dist(cursorX, cursorY, 170, 160);
        currentHole = 1;
        flagHole(distance);
        break;
      case 2: // [0, 1] pos
        image(moleSprite, 260, 120, 80, 80); 
        distance = dist(cursorX, cursorY, 300, 160);
        currentHole = 2;
        flagHole(distance);
        break;
      case 3: // [0, 2] pos
        image(moleSprite, 390, 120, 80, 80); 
        distance = dist(cursorX, cursorX, 430, 160);
        currentHole = 3;
        flagHole(distance);
        break;
      case 4: // [1, 0] pos
        image(moleSprite, 130, 210, 80, 80); 
        distance = dist(cursorX, cursorY, 170, 250);
        currentHole = 4;
        flagHole(distance);
        break;
      case 5: // [1, 1] pos
        image(moleSprite, 260, 210, 80, 80);
        distance = dist(cursorX, cursorY, 300, 250);
        currentHole = 5;
        flagHole(distance);
        break;
      case 6: // [1, 2] pos
        image(moleSprite, 390, 210, 80, 80); 
        distance = dist(cursorX, cursorY, 430, 250);
        currentHole = 6;
        flagHole(distance);
        break;
      }
  }
  
  // for debug
  
    // distance = dist(cursorX, cursorY, 300, 160);
    // text(`touching first circle: ${(distance <= 30)}`, 120, -150);
    
 
}

function mineSweeperPage()
{
  // mineSetup()
  
  background("#5EBBC9");
  image(warTorn,0,0,600,400);
  
  /*textFont(font);
  textSize(25);
  fill("black");
  text(`x: ${(cursorX)}, y: ${(cursorY)}`, 100, 80);*/
  
  fill('white');
  button = rect(465, 20, 125, 40, 10);
  fill('black');
  textSize(20);
  text("Repopulate", 530, 35);
  
  fill('white');
  button = rect(465, 70, 125, 40, 10);
  fill('black');
  textSize(20);
  text("Reset count", 530, 85);
  
  fill('white');
  button = rect(465, 120, 125, 40, 10);
  fill('black');
  textSize(20);
  text("Reset mines", 530, 135);
  
  // fill('white');
  // button = rect(465, 170, 125, 40, 10);
  // fill('black');
  // textSize(20);
  // text("Level 2", 530, 185);
  
  textFont(font);
  textSize(25);
  fill("black");
  text(`Score: ${minesDefused}`, 300, 50);
  
  noCursor();
  image(scissors, cursorX-30, cursorY-30, 60, 60);
  /*for (let i = 0; i < mines.length; i++) 
  {
    let mine = mines[i];
    image(landMine, mine.x, mine.y, 100, 75);
  }*/
  if (level1 == true) {
    //BUTTONS IN ORDER OF FUNCTION
  if (!timeoutActive) 
  {
    if (cursorX >= 465 && cursorX <= 590 && 
        cursorY >= 20 && cursorY <= 60 && mouseIsPressed) 
    {
      timeoutActive = true;
      mineSetup();
      setTimeout(() => 
      { /*Disable timeout after a delay*/
        timeoutActive = false; }, 1000);
    }
  }
    
  if (cursorX >= 465 && cursorX <= 590 && 
        cursorY >= 190 && cursorY <= 235 && mouseIsPressed) {
    level1mine = false;
    level2mine = true;
  }
    
  
  if (cursorX >= 465 && cursorX <= 590 && 
        cursorY >= 70 && cursorY <= 100 && mouseIsPressed) 
  { minesDefused = 0; }
  
  if (!timeoutActive) 
  {
    if (cursorX >= 465 && cursorX <= 590 && 
        cursorY >= 120 && cursorY <= 160 && mouseIsPressed) 
    {
      timeoutActive = true;
      clearMines();
      setTimeout(() => 
      { /*Disable timeout after a delay*/ 
        timeoutActive = false; }, 1000);
      
    }
  }
  }
  
  
  
  fill('white');
  rectMode(CORNER);
  //             x,    y,   w,   h,  r
  button = rect(20, 20, 100, 40, 10);
  if (mouseIsOverButton() 
      && currentButton == "mineSweeperBackButton")
  {
    fill('#E8E8E8');
    //              x,    y,   w,   h,  r
    button = rect(20, 20, 100, 40, 10);
  }
  
  fill('black');
  textFont(font);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Back", 70, 37);
  
//   fill("#FEFE66");
//   textSize(35);
//   text("Minesweeper", 300, 80);
  
}

function mineSetup()
{
  for (let i = 0; i < 6; i++) 
  {
    let x = random(0, 520);
    let y = random(200, 330);
    mines.push({ x: x, y: y }); 
  }  
}

function clearMines()
{
  mines.splice(0, mines.length);
}


let snakeBody = [];
let snakeLen = snakeBody.length;
let showInfo = true;
let food;

let trophys = 0;
let apples = 0;

let xDir = 0, yDir = 0;
let len = 0;
let count = 0;

let snakeDefeat = false;
let replay = false;
let levelsDisplay = false;

let levelOne = true;
let levelTwo = false;
let announceTimer = 500;

function snakePage()
{
  background("#5EBBC9");
  image(tileBackground, 0, 0, 600, 400);
  
  fill('white');
  rectMode(CORNER);
    //           x,  y,   w,   h,  r
  button = rect(20, 20, 100, 40, 10);
  if (mouseIsOverButton() 
      && currentButton == "snakeBackButton")
  {
    fill('#E8E8E8');
    //              x, y,   w,   h,  r
    button = rect(20, 20, 100, 40, 10);
  }
  
  fill('black');
  textFont(font);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Back", 70, 37);
  
  fill("#FEFE66");
  textSize(35);
  text("Snake", 300, 80);
  
  if (showInfo)
  { image(arrowKeyInfo, 250, 150, 100, 100); }
  
  if ((key === 'a' || key === 'd' ||
       key === 's' || key === 'w') && keyIsPressed)
  { showInfo = false; }
  
  snakeBody[0] = createVector(floor(x_snake), floor(y_snake));
  
  if (!isGameOver())
  { 
    if (levelOne == true)
    {
      switch(key)
      {
        case 'a': setDir(-5, 0); break;
        case 'd': setDir(5, 0);  break;
        case 's': setDir(0, 5);  break;
        case 'w': setDir(0, -5); break;
      }   
    }
    else if (levelTwo == true)
    {
      switch(key)
      {
        case 'a': setDir(-10, 0); break;
        case 'd': setDir(10, 0);  break;
        case 's': setDir(0, 10);  break;
        case 'w': setDir(0, -10); break;
      }
    }
  }
  
  updateBody();
  show();
  if (showInfo) { growAtStart(); }
  if (replay) 
  { 
    count = 0; 
    apples = 0; 
    replay = false;
  }
  
  noStroke();
  fill(255, 0, 0);
  rect(floor(food.x), floor(food.y), 20, 20);
  
  if (didEat()) 
  { 
    spawnFood(); 
   growBody(); 
    apples++; 
  }
  trophys = max(trophys, apples);
  
  textSize(25);
  fill('white');
  
  image(iApple, 400, 20, 36, 36);
  text(`${apples}`, 460, 40);
  
  image(iTrophy, 500, 20, 36, 36);
  text(`${trophys}`, 560, 40);
  
  gameOver();
}

function growAtStart()
{
  if (count != 1)
  {
    growBody();
    count++;
  }
}

function updateBody()
{
  let head = snakeBody[snakeBody.length - 1].copy();
  snakeBody.shift();
  head.x += xDir;
  head.y += yDir;
  snakeBody.push(head);
}

function setDir(x, y)
{
  xDir = x;
  yDir = y;
}

function growBody()
{
  let head = snakeBody[snakeBody.length - 1].copy();
  len++;
  snakeBody.push(head);
}

function show()
{
  for (let bi = 0; bi < snakeBody.length; bi++)
  {
    fill('#627fee');
    noStroke();
    rect(snakeBody[bi].x, snakeBody[bi].y, 20, 20);
  }
}

function spawnFood()
{
  let x = floor(random(win_w));
  let y = yPosHelper(floor(random(win_h)));
  food = createVector(x, y);
}

function yPosHelper(y)
{
  if (y < 105) 
  { 
    y = floor(random(win_h));
    return yPosHelper(y); 
  }
  
  return y;
}

/*function didEat()
{
  if ((abs(x_snake - food.x) <= 10) && 
      (abs(y_snake - food.y) <= 10))
  { return true; }
  return false;
}*/

function didEat()
{
  let head = snakeBody[snakeBody.length - 1].copy();
  if ((abs(head.x - food.x) <= 10) && 
      (abs(head.y - food.y) <= 10))
  { return true; }
  return false;
}

/*function isGameOver()
{
  if (((x_snake <= 2 || x_snake >= 598)) ||
      ((y_snake <= 96) || (y_snake >= 397)))
  { return true; }
  return false;
}*/

function gameOver()
{
  if (snakeDefeat)
  {
    filter(BLUR, 3);
    image(snakeGameOver, 210, 100, 200, 200);
    
    if (replayClicked())
    {
      fill('#577335');
      rect(210, 300, 200, 40);
      if (mouseIsPressed)
      {
        apples = 0;
        snakeBody = [];
        snakeBody[0] = createVector(floor(x_snake), 
                                    floor(y_snake));
        snakeDefeat = false;
        showInfo = true;
        replay = true;
      }
    }
    else
    {
      replay = false;
      fill('#7fa64d');
      rect(210, 300, 200, 40);
    }
    
    if (levelsClicked())
    {
      fill('#5d8993');
      rect(210, 350, 200, 40);
      
      if (mouseIsPressed)
      { levelsDisplay = true; }
    }
    else
    {
      fill('#5EBBC9');
      rect(210, 350, 200, 40);
    }
    
    fill('white');
    textFont(font);  
    textSize(30);
    text("try again", 310, 315);
    
    text("Levels", 310, 365);
    
    textSize(25);
    fill('white');
    text(`${apples}`, 268, 180);
    text(`${trophys}`, 354, 180);
    
    if (levelsDisplay)
    { displayLevels(); }
    
    if (isGameOver() && announceTimer != 0)
    {
      announceTimer = 500;
      if (levelOne == true)
      {
        if (announceTimer != 0)
        {
          announceTimer += -1;
          noStroke();
          fill('black');
          text('level one activated', 300, 55);
          //console.log("level one activated");
        }
      }
      else if (levelTwo == true)
      {
        if (announceTimer != 0)
        {
          announceTimer += -1;
          noStroke();
          fill('black');
          text('level two activated', 300, 55);
          //console.log("level two activated");
        }  
      }    
    }
  
  }
}

function isGameOver()
{
  let head = snakeBody[snakeBody.length - 1].copy();
  
  if (((head.x <= 2 || head.x >= 598)) ||
  ((head.y <= 96) || (head.y >= 397)))
  { 
    snakeDefeat = true;
    return snakeDefeat; 
  }
  snakeDefeat = false;
  return snakeDefeat;
}

function replayClicked()
{
  if ((cursorX >= 211 && cursorX <= 409) &&
     (cursorY >= 300 && cursorY <= 339))
  { return true; }
  return false;
}

function levelsClicked()
{
  if ((cursorX >= 211 && cursorX <= 409) &&
      (cursorY >= 349 && cursorY <= 387))
  { return true; }
  return false;
}

function displayLevels()
{
  if (levelsDisplay)
  {
    fill('#5EBBC9');
    rect(100, 100, 400, 250, 5);
    fill('#96dced')
    rect(220, 80, 150, 40, 5);
    
    stroke(0.1);
    textSize(28);
    fill('black');
    text("Levels", 300, 98);
  
    stroke(1);
    stroke('#5d8993');
    
    if ((cursorX >= 121 && cursorX <= 168) &&
        (cursorY >= 141 && cursorY <= 187) && mouseIsPressed)
    {
      fill('#85aab7');
      rect(120, 140, 50, 50, 5);
      levelOne = true;
      levelTwo = false;    
    }
    else
    {
      fill('#96dced');
      rect(120, 140, 50, 50, 5);
    }
  
    stroke(0.1);
    fill('black');
    text("1", 145, 155);
    textSize(14);
    fill('black');
    text("Lvl", 145, 178);
  
    stroke(1);
    stroke('#5d8993');
    fill('#96dced');
    rect(200, 140, 50, 50, 5);
  
    if ((cursorX >= 200 && cursorX <= 248) &&
        (cursorY >= 141 && cursorY <= 187) && mouseIsPressed)
    {
      fill('#85aab7');
      rect(200, 140, 50, 50, 5);
      levelOne = false;
      levelTwo = true;
    }
    else
    {
      fill('#96dced');
      rect(200, 140, 50, 50, 5);
    }
    
    stroke(0.1);
    fill('black');
    textSize(30);
    text("2", 225, 155);
    textSize(14);
    fill('black');
    text("Lvl", 225, 178);
  
    stroke(1);
    stroke('#5d8993');
    fill('#96dced');
    rect(285, 140, 50, 50, 5);
      
    if ((cursorX >= 286 && cursorX <= 334) &&
        (cursorY >= 141 && cursorY <= 187) && mouseIsPressed)
    {
      fill('#85aab7');
      rect(285, 140, 50, 50, 5);
    }
    else
    {
      fill('#96dced');
      rect(285, 140, 50, 50, 5);
    }
  
    stroke(0.1);
    fill('black');
    textSize(30);
    text("3", 310, 155);
    textSize(14);
    fill('black');
    text("Lvl", 310, 178);
  
    noStroke();
    if ((cursorX >= 481 && cursorX <= 498) &&
        (cursorY >= 100 && cursorY <= 118))
    {
      fill('#ae2a1b');
      stroke('black');
      rect(481, 100, 19, 19, 0);
      if (mouseIsPressed) { levelsDisplay = false; }
    }
    else
    {
      fill('red');
      stroke('black');
      rect(481, 100, 19, 19, 0);
    }
    
    fill('black');
    noStroke();
    textSize(24);
    text('X', 491, 107);
  }
}

function flappyBirdPage()
{
  // let level1 = true;
  // let level2 = false;
  background("#5EBBC9");
  
  fill('white');
  //rect(5,65,590,275,30);
  fill('#A6ECEF');
  rect(0, 0, 600, 350);
  
  fill('red');
  square(520, 160, 70, 20);
  
  image(ground, 0, 340, 600, 80);
  
  fill('white');
  rectMode(CORNER);
  
  
  
  
  
    //           x, y,   w,   h,  r
  button = rect(20, 20, 100, 40, 10);
  
  
  fill('white');
  button = rect(150, 346, 100, 40, 10);
  fill('black');
  text("Level 2", 200, 365);
  
  
  if (mouseIsOverButton() 
      && currentButton == "flappyBirdBackButton")
  {
    fill('#E8E8E8');
    //              x,    y,   w,   h,  r
    button = rect(20, 20, 100, 40, 10);
  }
  
  fill('white');
  button = rect(488, 346, 100, 40, 10);
  
  if (level1 == true) {
    image(pipeLine, 250, 222, 100, 125);
    image(pipeLineReverse, 190, -10, 100, 200);
    image(pipeLineReverse, 340, -10, 100, 200);
    image(pipeLine, 425, 198, 100, 150);
  }
  
  // if (level2 == true) {
  //   image(pipeLine, 275, 222, 100, 125);
  //   image(pipeLineReverse, 270, -10, 100, 190);
  //   image(pipeLineReverse, 330, -10, 100, 195);
  //   image(pipeLine, 330, 198, 100, 150);
  // }
  
  
  //image(bird, 48, vy, 60, 60);   
  
  
  textFont(font);
  textSize(25);
  fill("black");
  text(`x: ${cursorX} y: ${cursorY}`, 220, 20);
  
  if (birdMouse == true) {
    noCursor();
    image(flappyBird, cursorX-30, cursorY-30, 60, 60);
    
  }
  if (birdMouse == false) {
    cursor(CROSS);
  }
  
  textFont(font);
  textSize(24);
  textAlign(CENTER, CENTER);
  
  fill('black');
  text("Clear", 540, 365);
  
  fill('white');
  button = rect(20, 346, 100, 40, 10);
  fill('black');
  text("Start", 70, 365);
  
 
  
  if (cursorX >= 155 && cursorX <= 250 && 
      cursorY >= 350 && cursorY <= 390 && mouseIsPressed) {
    level1 = false;
    level2 = true;
  }
  
  
  if (cursorX >= 488 && cursorX <= 588 && 
      cursorY >= 346 && cursorY <= 386 && mouseIsPressed) 
  { 
    clear = true;
    birdReset = true;
    gameCurrent == false;
    console.log("Clear button here");
  }
  
  
  if (clear == true)
  {
    clear = false;
    flagColor = false;
  }
  
  if (level1 == true) {
    if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 520 && cursorX <= 590 && 
        cursorY >= 160 && cursorY <= 230 && mouseIsPressed) {
      birdVictory = true;
      birdMouse = false;
      gameCurrent = true;
      birdScore += 1;
      birdAttempt += 1;
      timeoutActive = true; // Activate timeout to prevent re-triggering
      console.log("Bird Victory True");
      setTimeout(() => {
        timeoutActive = false; // Disable timeout after a delay
      }, 1000); // 1 second delay
    } 
  }
  
  if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 20 && cursorX <= 120 && 
        cursorY >= 350 && cursorY <= 390 && mouseIsPressed) {
      birdMouse = true;
      gameCurrent = true;
      console.log("Starting Game");
    }
  }

  if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 220 && cursorX <= 260 && 
        cursorY > 0 && cursorY <= 170 && mouseIsPressed) 
    {
      birdDefeat = true;
      gameCurrent == false;
      birdMouse = false;
      birdAttempt += 1;
      timeoutActive = true; // Activate timeout to prevent re-triggering
      console.log("Died at Totem1");
      setTimeout(() => {
        timeoutActive = false; // Disable timeout after a delay
      }, 1000); // 1 second delay
    }
  }
  
  if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 290 && cursorX <= 320 && 
        cursorY >= 240 && cursorY < 400 && mouseIsPressed) {
      birdDefeat = true;
      gameCurrent == false;
      birdMouse = false;
      birdAttempt += 1;
      timeoutActive = true; // Activate timeout to prevent re-triggering
      console.log("Died at Totem2");
      setTimeout(() => {
        timeoutActive = false; // Disable timeout after a delay
      }, 1000); // 1 second delay
    }
  }
  
  if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 380 && cursorX <= 410 && 
        cursorY > 0 && cursorY <= 170 && mouseIsPressed) {
      birdDefeat = true;
      gameCurrent == false;
      birdMouse = false;
      birdAttempt += 1;
      timeoutActive = true; // Activate timeout to prevent re-triggering
      console.log("Died at Totem3");
      setTimeout(() => {
        timeoutActive = false; // Disable timeout after a delay
      }, 1000); // 1 second delay
    }
  }
  
  if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 470 && cursorX <= 495 && 
        cursorY >= 240 && cursorY < 400 && mouseIsPressed) {
      birdDefeat = true;
      gameCurrent == false;
      birdMouse = false;
      birdAttempt += 1;
      timeoutActive = true; // Activate timeout to prevent re-triggering
      console.log("Died at Totem4");
      setTimeout(() => {
        timeoutActive = false; // Disable timeout after a delay
      }, 1000); // 1 second delay
    }
  }
  
  }
  
  if (level2 == true) {
    
    if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 520 && cursorX <= 590 && 
        cursorY >= 160 && cursorY <= 230 && mouseIsPressed) {
      birdVictory = true;
      birdMouse = false;
      gameCurrent = true;
      birdScore += 1;
      birdAttempt += 1;
      timeoutActive = true; // Activate timeout to prevent re-triggering
      console.log("Bird Victory True");
      setTimeout(() => {
        timeoutActive = false; // Disable timeout after a delay
      }, 1000); // 1 second delay
    } 
  }
    
    
    
    if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 310 && cursorX <= 335 && 
        cursorY >= 0 && cursorY < 160 && mouseIsPressed) {
      birdDefeat = true;
      gameCurrent == false;
      birdMouse = false;
      birdAttempt += 1;
      timeoutActive = true; // Activate timeout to prevent re-triggering
      console.log("Died at Totem4");
      setTimeout(() => {
        timeoutActive = false; // Disable timeout after a delay
      }, 1000); // 1 second delay
    }
  }
    
    if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 20 && cursorX <= 120 && 
        cursorY >= 350 && cursorY <= 390 && mouseIsPressed) {
      birdMouse = true;
      gameCurrent = true;
      console.log("Starting Game");
    }
  }
    
  if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 320 && cursorX <= 355 && 
        cursorY >= 221 && cursorY < 330 && mouseIsPressed) {
      birdDefeat = true;
      gameCurrent == false;
      birdMouse = false;
      birdAttempt += 1;
      timeoutActive = true; // Activate timeout to prevent re-triggering
      console.log("Died at Totem4");
      setTimeout(() => {
        timeoutActive = false; // Disable timeout after a delay
      }, 1000); // 1 second delay
    }
  }
    
  if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 355 && cursorX <= 410 && 
        cursorY >= 0 && cursorY < 165 && mouseIsPressed) {
      birdDefeat = true;
      gameCurrent == false;
      birdMouse = false;
      birdAttempt += 1;
      timeoutActive = true; // Activate timeout to prevent re-triggering
      console.log("Died at Totem4");
      setTimeout(() => {
        timeoutActive = false; // Disable timeout after a delay
      }, 1000); // 1 second delay
    }
  }
    
  if (!timeoutActive) { // Only allow interaction if no timeout is active
    if (cursorX >= 355 && cursorX <= 410 && 
        cursorY >= 200 && cursorY < 330 && mouseIsPressed) {
      birdDefeat = true;
      gameCurrent == false;
      birdMouse = false;
      birdAttempt += 1;
      timeoutActive = true; // Activate timeout to prevent re-triggering
      console.log("Died at Totem4");
      setTimeout(() => {
        timeoutActive = false; // Disable timeout after a delay
      }, 1000); // 1 second delay
    }
  }
    
  }
  
  
  if (birdDefeat == true) 
  {
    textFont(font);
    textSize(25);
    fill("black");
    textSize(40);
    text('Defeat', 300, 200);
  }
  
  if (birdVictory == true)
  {
    
    textFont(font);
    textSize(25);
    fill("black");
    textSize(40);
    text('Victory', 300, 200);
  }
  
  if (birdVictory == false && gameCurrent == false|| birdDefeat == false && gameCurrent == false) {
    textFont(font);
    textSize(25);
    fill("white");
    noStroke();
    rect(190, 185, 200, 50, 10);
    
    // textSize(40);
    // text('Victory', 300, 200);
  }
  
  if (birdReset == true) 
  {
    birdVictory = false;
    birdMouse = false;
    birdReset = false;
    birdDefeat = false;
  }
  
  textFont(font);
  textSize(25);
  fill("black");
  text(`Attempts: ${birdAttempt}`, 525, 10);
  text(`Score: ${birdScore}`, 540, 30);
  
  fill('black');
  textFont(font);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Back", 70, 37);
}
