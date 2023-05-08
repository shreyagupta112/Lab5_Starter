// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const select = document.querySelector("#horn-select");
  const volume = document.querySelector("#volume");
  const button = document.querySelector("button");
  const pic = document.querySelector("img");
  const audio = document.querySelector("audio");
  const volume2 = document.querySelector("#volume-controls img");
  const jsConfetti = new JSConfetti()

  select.addEventListener("change", (event) =>{
    if(select.value == 'air-horn') { 
      pic.src = "assets/images/air-horn.svg"; 
      audio.src = 'assets/audio/air-horn.mp3';
    }

    if(select.value == 'car-horn') {
      pic.src = "assets/images/car-horn.svg";
      audio.src = 'assets/audio/car-horn.mp3';
    }

    if(select.value == 'party-horn') {
      pic.src = "assets/images/party-horn.svg";
      audio.src = 'assets/audio/party-horn.mp3';
    }
  });

  volume.addEventListener("change", (event) =>{
    if(volume.value  == 0)
      volume2.src = "assets/icons/volume-level-0.svg";
    
    if(volume.value >= 1 && volume.value < 33) 
      volume2.src = "assets/icons/volume-level-1.svg"; 
    
    if(volume.value >= 33 && volume.value < 67) 
      volume2.src = "assets/icons/volume-level-2.svg"; 
    
    if(volume.value >= 67) 
      volume2.src = "assets/icons/volume-level-3.svg"; 

  }); 

  button.addEventListener("click", function() {
    e.preventDefault();
    audio.play()

    if(select.value === "party-horn"){
      jsConfetti.addConfetti();
    }
  })
}