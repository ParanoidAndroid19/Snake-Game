document.addEventListener('DOMContentLoaded', () => {

  // squares has all the divs within the div with class name grid
  const squares = document.querySelectorAll('.grid div')

  const scoreDisplay = document.querySelector('span')

  const startBtn = document.querySelector('.start')

  const width = 10
  let currentIndex = 0 // first div in our grid
  let appleIndex = 0 // location of the apple

  // we need to differentiate b/w what is the tail and what is the head
  // the div of the value 2 will be the HEAD
  // the div of the value 0 will be the TAIL
  // the divs of the value 1 will be the body of the snake
  let currentSnake = [2, 1, 0]

  // that is the snake should always go one div down the array
  let direction = 1

  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0

  // to start and restart the game
  function startGame() {
    // each index of the current snake is taken into consideration
    // forEach is used to call a function for each element of an array

    // we remove all the class name snake from the divs, at the start of the function there is no div of class name snake
    // we also remove the apple class from divs, so that no div is marked as apple in the start of game
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    // basically reseting everything

    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000 // 1 sec
    currentSnake = [2, 1, 0]
    currentIndex = 0

    // for each box/div of the snake, marking those divs with the snake class name
    // basically making the snake here
    currentSnake.forEach(index => squares[index].classList.add('snake'))

    // this function will deal with any and all outcomes for our decisions, it will deal with collisions, events and scores setting
    // the moveOutcomes function is called after every 1000milsec = 1 sec, until clearInterval is called
    interval = setInterval(moveOutcomes, intervalTime)
  }



  // function that deals with all outcomes of snake
  function moveOutcomes() {

    // deals with snake hitting border and snake hitting itself
    // here we are dealing with the snake's head and finding out where on the grid the snake head is
    // snake head === currentSnake[0], since 2 is the head
    if (
      (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || // if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
    ) {
      // this basically means moveOutcomes is no longer called and the snake stops moving
      return clearInterval(interval) // if any of the above happens then we clear the interval
    }


    // ooooh this is to keep the snake moving in the given direction
    // the lesser is the interval time, the faster the snake moves then
    const tail = currentSnake.pop() // removes last item of the array and shows it
    squares[tail].classList.remove('snake') // removes class of snake from TAIL, to give the appearence that the snake is moving
    // got the logic of direction noww, the direction could be -1, 1, -10, 10 (that is left, right, up, down)
    // but then the head of snake could be 2-1, 2+1, 2-10, 2+10 ????
    currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array


    // deals with snake getting apple, that is when snake head goes into the div which has apple class
    if (squares[currentSnake[0]].classList.contains('apple')) {
      // removing the apple class from div with snake head
      squares[currentSnake[0]].classList.remove('apple')
      // since snake ate apple it grows one box more, hence now previously removed tail is now a part of snake
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.textContent = score

      // after each time snake eats apple and grows, the snake moves faster.
      // for this each time the interval time is decreased so that snake appears to move faster
      clearInterval(interval)
      intervalTime = intervalTime * speed //speed is 0.9, so each time the intervalTime decreases
      interval = setInterval(moveOutcomes, intervalTime)
    }

    squares[currentSnake[0]].classList.add('snake')

  }

  // generate new apple once the apple is eaten
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake')) // making sure apple does not appear inside snake

    squares[appleIndex].classList.add('apple')
  }



  // console.log(squares[10])
  // console.log(squares[10].classList)

  // assign functions to keycodes
  // making the snake move accros the board using keycodes
  // each key on the keyboard has a keycode assigned to it

  // e is for event. This function is to make the snake move up, down, left and right,
  // depending on which key is pressed.
  function control(e) {

    // removing the class of a particular div, that is making that box no longer a part of snake
    squares[currentIndex].classList.remove('snake')

    //    -10
    // -1     +1
    //    +10

    // if the right arrow button is pressed then the snake will go right
    if (e.keyCode === 39) {
      direction = 1
    }

    // for up arrow, snake goes into the 10th position back from its current position in the array
    // this will make it appear the snake moves up on row!
    else if (e.keyCode === 38) {
      direction = -width // = -10
    } else if (e.keyCode === 37) {
      direction = -1 // if we press left the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = +width //if down is pressed, then the snake head will appear in the div ten divs from the current psoition
      // basically in the row below, snake moves down a row
    }
  }

  // for everytime a key is pressed
  document.addEventListener('keyup', control)

  // linking to start button
  startBtn.addEventListener('click', startGame)
})