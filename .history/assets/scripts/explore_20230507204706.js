// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const select = document.querySelector('#voice-select');
  const text = document.querySelector('textarea');
  const button = document.querySelector('button');
  const pic = document.querySelector('img');
  const voices = synth.getVoices();
  const utterThis = new SpeechSynthesisUtterance(text.value);

  utterThis.addEventListener('start', (e) => {
    pic.src = 'assets/images/smiling-open.png';
    text.blur();
  });
  utterThis.addEventListener('end', (e) => {
    pic.src = 'assets/images/smiling.png';

  });


  function populateVoiceList() {
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      select.appendChild(option);
    }
  }


  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  

  button.addEventListener('click', (e) => {
    synth.speak(utterThis);
    
    const op = select.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === op) {
        utterThis.voice = voices[i];
      }
    }

    utterThis.addEventListener('start', (e) => {
      inputTxt.blur();
      image.src = 'assets/images/smiling-open.png';
    });
    utterThis.addEventListener('end', (e) => {
      image.src = 'assets/images/smiling.png';
    });
  });
}