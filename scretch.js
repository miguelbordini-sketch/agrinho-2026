let tile = 40;
let cols = 15;
let rows = 10;

let map = [];
let player;
let enemy;

let score = 0;

function setup() {
  createCanvas(cols * tile, rows * tile);

  player = { x: 1, y: 1 };
  enemy = { x: cols - 2, y: rows - 2 };

  createMap();
}

function draw() {
  background(0);

  drawMap();
  drawPlayer();
  drawEnemy();
  moveEnemy();
  drawUI();
  checkCollision();
}

function createMap() {
  map = [];

  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      if (
        x === 0 || y === 0 ||
        x === cols - 1 || y === rows - 1 ||
        random() < 0.15
      ) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    map.push(row);
  }

  map[player.y][player.x] = 0;
  map[enemy.y][enemy.x] = 0;
}

function drawMap() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      fill(map[y][x] === 1 ? 80 : 20);
      rect(x * tile, y * tile, tile, tile);
    }
  }
}

function drawPlayer() {
  fill("yellow");
  ellipse(player.x * tile + 20, player.y * tile + 20, 25);
}

function drawEnemy() {
  fill("red");
  rect(enemy.x * tile + 10, enemy.y * tile + 10, 20, 20);
}

function keyPressed() {
  let nx = player.x;
  let ny = player.y;

  if (keyCode === LEFT_ARROW) nx--;
  if (keyCode === RIGHT_ARROW) nx++;
  if (keyCode === UP_ARROW) ny--;
  if (keyCode === DOWN_ARROW) ny++;

  if (map[ny] && map[ny][nx] === 0) {
    player.x = nx;
    player.y = ny;
  }
}

function moveEnemy() {
  let dx = player.x - enemy.x;
  let dy = player.y - enemy.y;

  let nx = enemy.x;
  let ny = enemy.y;

  if (abs(dx) > abs(dy)) {
    nx += dx > 0 ? 1 : -1;

    if (map[enemy.y][nx] === 0) {
      enemy.x = nx;
      return;
    }
  }

  ny += dy > 0 ? 1 : -1;

  if (map[ny] && map[ny][enemy.x] === 0) {
    enemy.y = ny;
    return;
  }

  let dirs = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];

  for (let d of dirs) {
    let tx = enemy.x + d.x;
    let ty = enemy.y + d.y;

    if (map[ty] && map[ty][tx] === 0) {
      enemy.x = tx;
      enemy.y = ty;
      return;
    }
  }
}

function checkCollision() {
  if (player.x === enemy.x && player.y === enemy.y) {
    resetGame();
  }
}

function resetGame() {
  player = { x: 1, y: 1 };
  enemy = { x: cols - 2, y: rows - 2 };
  createMap();
}

function drawUI() {
  fill(255);
  textSize(14);
  text("👾 simples Pac-style", 10, 20);
}
