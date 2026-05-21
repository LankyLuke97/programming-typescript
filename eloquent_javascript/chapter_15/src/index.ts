// Chapter 15, Exercise 1: Balloon

<!doctype html>

<p>🎈</p>

<script>
  let balloon = document.querySelector("p");
  let size = 20;
  let can_inflate = true;
  let can_deflate = true;
  balloon.style.fontSize = `${Math.ceil(size)}px`  

  function decrease(event) {
    if (event.key === "ArrowUp") can_inflate = true;
    else if (event.key === "ArrowDown") can_deflate = true;
  }

  function increase(event) {
    if (can_inflate && event.key === "ArrowUp") {
      can_inflate = false;
      size *= 1.1;
    } else if (can_deflate && event.key === "ArrowDown") {
      can_deflate = false;
      size /= 1.1;
    }
    if (size > 60) {
      balloon.textContent = "💥";
      window.removeEventListener("keyup", decrease);
      window.removeEventListener("keyup", increase);
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          size /= 1.8;
          balloon.style.fontSize = `${Math.ceil(size)}px`
        }, 200*i);
      }
      setTimeout(() => {
        balloon.style.display = "none";
      }, 2200);
    }
    balloon.style.fontSize = `${Math.ceil(size)}px`
  }
  
  window.addEventListener("keydown", increase);
  window.addEventListener("keyup", decrease);
</script>

// Chapter 15, Exercise 2: Mouse Trail
//
<!doctype html>

<style>
  .trail { /* className for the trail elements */
    position: absolute;
    height: 6px; width: 6px;
    border-radius: 3px;
    background: teal;
  }
  body {
    height: 300px;
  }
</style>

<script>
  let trailArray = [];
  let numTrail = 15;
  let curTrail = 0;
  for (let i = 0; i < numTrail; i++) {
    let trail = document.createElement("div");
    trail.className = "trail";
    trail.style.top = "0px";
    trail.style.top = "0px";
    trailArray.push(trail);
    document.body.appendChild(trail);
  }

  window.addEventListener("mousemove", event => {
    let trail = trailArray[curTrail];
    curTrail++;
    if (curTrail == numTrail) curTrail = 0;
    trail.style.top = event.pageY + "px";
    trail.style.left = event.pageX + "px";
  });
</script>
