let display = document.getElementById('display');
let historyList = document.getElementById('historyList');
let clickSound = document.getElementById('clickSound');

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function appendValue(value) {
  playSound();
  display.value += value;
}

function clearDisplay() {
  playSound();
  display.value = '';
}

function deleteLast() {
  playSound();
  display.value = display.value.slice(0, -1);
}

function calculate() {
  playSound();
  try {
    const result = eval(display.value);
    addToHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li); // Add to top
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const allowed = '0123456789+-*/.=EnterBackspaceEscape';
  if (!allowed.includes(e.key) && isNaN(e.key)) return;

  if (e.key >= 0 && e.key <= 9 || ['+', '-', '*', '/'].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === '.') {
    appendValue('.');
  } else if (e.key === '=' || e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    deleteLast();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});

// Light/Dark mode toggle
document.getElementById('themeSwitch').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
});
