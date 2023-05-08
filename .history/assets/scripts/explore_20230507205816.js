// explore.js

window.addEventListener('DOMContentLoaded', init);
function init() {
  // TODO
  const synth = window.speechSynthesis;
  const inputButton = document.querySelector("button");
  const inputTxt = document.querySelector("#text-to-speak");
  const voiceSelect = document.querySelector("select");
  const pitch = document.querySelector("#pitch");
  const pitchValue = document.querySelector(".pitch-value");
  const rate = document.querySelector("#rate");
  const rateValue = document.querySelector(".rate-value");
  const utterThis = new SpeechSynthesisUtterance();
  const faceImg = document.body.querySelector("img");
  utterThis.addEventListener("start", (event) =>{
    faceImg.src = "assets/images/smiling-open.png";
    inputTxt.blur();
  });
  utterThis.addEventListener("end", (event) => {
    faceImg.src = "assets/images/smiling.png";
  })
  let voices = [];
  function populateVoiceList() {
    voices = synth.getVoices();
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
  inputButton.addEventListener("click", (event) => {
    console.log(inputTxt.value)
    utterThis.text = inputTxt.value;
    synth.speak(utterThis);
    event.preventDefault();
    const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    // utterThis.pitch = pitch.value;
    // utterThis.rate = rate.value;
  });
}