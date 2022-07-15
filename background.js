document.addEventListener('DOMContentLoaded', () => {
  alert("on active website");
  var audio = new Audio('cashregister.mp3');
  document.getElementById('t-num-fmt-currency').onclick = function() {
    audio.play();
    alert("DID IT BOYIOS");
  };
});
