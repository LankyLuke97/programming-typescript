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
