window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const select = document.querySelector('#voice-select');
  const text = document.querySelector('textarea');
  const button = document.querySelector('button');
  const pic = document.querySelector('img');
  let voices = [];

  const utterThis = new SpeechSynthesisUtterance(text.value);

  utterThis.addEventListener('start', (e) => {
    pic.src = 'assets/images/smiling-open.png';
    text.blur();
  });

  utterThis.addEventListener('end', (e) => {
    pic.src = 'assets/images/smiling.png';
  });

  function populateVoiceList() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      select.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  select.addEventListener('change', (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const selectedVoiceName = selectedOption.getAttribute('data-name');

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedVoiceName) {
        utterThis.voice = voices[i];
      }
    }
  });

  button.addEventListener('click', (e) => {
    synth.speak(utterThis);
  });
}