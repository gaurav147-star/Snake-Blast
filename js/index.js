//Constant & Variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 10;
let increasescoreespeed = 10;

let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 5, y: 7 };
let highscore = 0;

function playGame() {

  //Game Function
  //ctime=current time
  function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
    lastPaintTime = ctime;
    gameEngine();
  }

  function isCollide(snake) {
    //If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }
    //If you bump into the wall
    if (
      snake[0].x >= 18 ||
      snake[0].x <= 0 ||
      snake[0].y >= 18 ||
      snake[0].y <= 0
    ) {
      return true;
    }
  }


  // hiscoreBox.innerHTML = "High Score:" + max;
  // console.log(max)
  function gameEngine() {
    //Part 1: Updating the snake array & Food
    // musicSound.play();

    if (isCollide(snakeArr)) {
      gameOverSound.play();
      musicSound.pause();
      // console.log(highscore)
      if (score > highscore) {
        var person = prompt("Congrats!Please enter your name", "Naruto Uzumaki");
        var dat = {
          sc: score,
          name: person
        }
        ref.push(dat);
      }
      // console.log(score)
      // swal("Game Over", "Congrats!You Scored ", "success");
      inputDir = { x: 0, y: 0 };

      alert("Game Over. Press any key to play again " + score);

      // console.log(score)
      window.location.reload();
      playGame();
      score = 0;
      // musicSound.play();
    }
    //If food eaten by the snake , increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
      foodSound.play();
      score += 1;
      // console.log(score)
      if (score > increasescoreespeed) {
        speed += 3;
        increasescoreespeed += 10;

      }


      scoreBox.innerHTML = "Score: " + score;
      snakeArr.unshift({
        x: snakeArr[0].x + inputDir.x,
        y: snakeArr[0].y + inputDir.y,
      });

      let a = 2;
      let b = 16;
      food = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random()),
      };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
      snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2: Display the snake and Food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
      snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;
      if (index == 0) {
        snakeElement.classList.add("head");
      } else {
        snakeElement.classList.add("snake");
      }
      board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
  }

  window.requestAnimationFrame(main);


  function enableMute() {
    x.muted = true;
  }

  function disableMute() {
    x.muted = false;
  }

  function checkMute() {
    alert(x.muted);
  }


  window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 }; //Start the game
    moveSound.play();
    switch (e.key) {
      case "ArrowUp":
        // console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;

      case "ArrowDown":
        // console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;

      case "ArrowLeft":
        // console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;

      case "ArrowRight":
        // console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;

      default:
        break;
    }
  });
  snakeArr = [{ x: 13, y: 15 }];
  var x = document.getElementById("musicSound");

  const firebaseConfig = {
    apiKey: "AIzaSyCjT6DO_tW-GF50QVgdMmLxd0LJAcQnxG0",
    authDomain: "snake-blast-580ce.firebaseapp.com",
    databaseURL: "https://snake-blast-580ce-default-rtdb.firebaseio.com",
    projectId: "snake-blast-580ce",
    storageBucket: "snake-blast-580ce.appspot.com",
    messagingSenderId: "199190077576",
    appId: "1:199190077576:web:99211e0dce2e33c3a33f3d"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // console.log(firebase)
  const db = firebase.database()
  var ref = db.ref('scores');
  ref.on("value", function (snapshot) {

    //1st method to retrive
    // var data = snapshot.val();
    // for(let i in data){
    //   console.log(data[i].name);
    // }

    //2nd Method to retrive data
    snapshot.forEach(function (e) {

      var f_name = e.val().name;
      var f_sc = e.val().sc;
      AddItemsToTable(f_name, f_sc);
      // console.log(f_name);
      // console.log(f_sc);
      if (f_sc > highscore) {
        highscore = f_sc;
      }


    })

    // for (var i = 0; i < keys.length; i++) {
    // var k = keys[i];
    // console.log(keys);
    // var username = scores[k].name;
    // var userscore = scores[k].sc;
    // var lihiname = document.createElement("li");
    // var lihiscore = document.createElement("li");
    // var hiusername = document.createTextNode(username);
    // var hiuserscore = document.createTextNode(userscore);
    // console.log(hiusername)
    // console.log(hiuserscore)
    // lihiname.appendChild(hiusername);
    // lihiscore.appendChild(hiuserscore);


    // document.getElementById("myUl").appendChild(lihiname);
    // document.getElementById("myUl").appendChild(lihiscore);
    // console.log(userscore)
    // if (userscore > highscore) {
    //   highscore = userscore;
    // }
    // console.log(highscore)
    // }
    hiscoreBox.innerHTML = "High Score:" + highscore;
  }, function (error) {
    console.log("Error: " + error.code);
  });




}
var stdNo = 0;

function AddItemsToTable(f_name, f_sc) {
  var tbody = document.getElementById('tbody1');
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  td1.innerHTML = ++stdNo;
  td2.innerHTML = f_name;
  td3.innerHTML = f_sc;
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  tbody.appendChild(trow);
}