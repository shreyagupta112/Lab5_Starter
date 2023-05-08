// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO

  const voiceSelect = document.getElementById('voice-select');
  const synth = window.speechSynthesis;
  const play_button = document.getElementsByTagName('button')[0];
  const text_area = document.getElementById('text-to-speak');
  const voices = synth.getVoices();
  const image = document.getElementsByTagName('img')[0];

  function populateVoiceList() {
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  

  play_button.addEventListener('click', (e) => {
    e.preventDefault();

    if (text_area.value.length == 0){
      alert('No input given');
      return;
    }

    if (voiceSelect.selectedOptions[0].value == 'select'){
      alert('No voice selected');
      return;
    }

    const utterThis = new SpeechSynthesisUtterance(text_area.value);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
    utterThis.addEventListener('start', (e) => {
      e.preventDefault();
      image.src = 'assets/images/smiling-open.png';
    });
    utterThis.addEventListener('end', (e) => {
      e.preventDefault();
      image.src = 'assets/images/smiling.png';
    });
  })
}