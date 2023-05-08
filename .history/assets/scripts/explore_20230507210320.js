window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const select2 = document.querySelector('#voice-select');
  const text = document.querySelector('textarea');
  const button = document.querySelector('button');
  const pic = document.querySelector('img');
  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();

    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;

      if (voice.default) {
        option.textContent += ' -- DEFAULT';
      }

      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      select2.appendChild(option);
    });
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  button.addEventListener('click', (e) => {
    const utterThis = new SpeechSynthesisUtterance(text.value);
    const selectedOption = select2.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }

    synth.speak(utterThis);

    utterThis.addEventListener('start', (e) => {
      text.blur();
      pic.src = 'assets/images/smiling-open.png';
    });

    utterThis.addEventListener('end', (e) => {
      pic.src = 'assets/images/smiling.png';
    });
  });
}
