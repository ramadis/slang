var textarea = document.getElementsByClassName('program-box')[0];
var input = document.getElementsByClassName('code-box')[0];

document.addEventListener('input', function(ev) {
  if (ev.target.className === textarea.className) input.value = '';
  else if (ev.target.className === input.className) textarea.value = '';
});

document.addEventListener('keydown', function(ev) {
  if (ev.target.className === textarea.className && ev.keyCode === 9) {
    textarea.value += '        ';
    ev.preventDefault();
  }
}, true);

document.addEventListener('click', function (ev) {
  if (ev.target.className !== 'process-btn' || !(textarea.value || input.value)) return;
  
  var godelMode = document.getElementsByClassName('code-mode')[0].checked;

  if (textarea.value && input.value) {
    var programToCode = confirm('Accept to transform the Program to its Code. Cancel for the opposite.');
    if (programToCode) input.value = Program.fromString(textarea.value).getCode(godelMode? Program.codeModes.GODEL : Program.codeModes.PRIMES);
    else textarea.value = Program.fromCode(input.value).getString();
  } else if (input.value) {
    textarea.value = Program.fromCode(input.value).getString()
  } else if (textarea.value) {
    input.value = Program.fromString(textarea.value).getCode(godelMode ? Program.codeModes.GODEL : Program.codeModes.PRIMES);
  }
});