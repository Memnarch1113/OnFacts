// alert("WAT?");
var audio = new Audio(chrome.runtime.getURL('cashregister.mp3'));
document.getElementById('t-num-fmt-currency').onclick = function() {
  audio.play();
  // alert("DID IT BOYIOS");
};
