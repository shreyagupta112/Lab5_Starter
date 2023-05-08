document.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const voiceSelect = document.querySelector('#voice-select');
  const textArea = document.querySelector('textarea');
  const button = document.querySelector('button');
  const pic = document.querySelector('img');
  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();

    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute('value', voice.name);
      voiceSelect.appendChild(option);
    });
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  button.addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(textArea.value);
    const selectedVoice = voiceSelect.value;

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedVoice) {
        utterance.voice = voices[i];
        break;
      }
    }

    synth.speak(utterance);

    utterance.addEventListener('start', () => {
      textArea.blur();
      pic.src = 'assets/images/smiling-open.png';
    });

    utterance.addEventListener('end', () => {
      pic.src = 'assets/images/smiling.png';
    });
  });
}