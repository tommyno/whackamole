  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  let lastHole;
  let timeUp = false;
  let score = 0;

  function randomTime(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      return randomHole(holes);
    } 
    lastHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(800, 1500);
    const hole = randomHole(holes);
    hole.classList.remove('hit');
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) {
        peep();
      } else {
          document.querySelector('button').disabled = false;
      }
    }, time);
  }

  function bonk(e) {
    if (!e.isTrusted) return; // Juksemaker!

    // Avoid multiple hits
    if (this.parentNode.classList.contains('up')) {
      new Audio('assets/bonk.mp3').play();
      score++;
      this.parentNode.classList.remove('up');
      this.parentNode.classList.add('hit');
      scoreBoard.textContent = score;
    }
  }

  moles.forEach( mole => mole.addEventListener('click', bonk) );


  function startGame () {
    document.querySelector('button').disabled = true;
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    peep();
    setTimeout( () => {
      timeUp = true;
    }, 20000)
    
  }  

  /* Autostart game */
  setTimeout(() => startGame(), 2000);