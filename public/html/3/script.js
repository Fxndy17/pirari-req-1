const balls = document.querySelectorAll('.gumball-container .gumball');
let y = 0;
let direction = 1;
let speed = 4;

balls.forEach((ball, index) => {
  let ballY = 0;
  let ballDirection = 1;
  let ballSpeed = 4 + (index * 0.5);

  setInterval(() => {
    ballY = ballY + ballSpeed * ballDirection;
    if (ballY >= window.innerHeight/4 - -50) {
      ballDirection = -1;
    }
    if (ballY <= 0) {
      ballDirection = 1;
    }
    ball.style.top = ballY + 'px';
  }, 20);
});

const random = (list) => {

  return list[Math.floor(Math.random() * list.length)]

}


function togglePopup () {
  fetch("./db")
  .then(a=>a.json())
  .then(a=>{
    const b = random(a)
    document.getElementById("untuk").textContent = "To: "+b.untuk
    document.getElementById("pesan").textContent = b.pesan
    
    document.getElementById("popup-1").classList.toggle("active");
  })
}