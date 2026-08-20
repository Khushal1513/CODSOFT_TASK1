document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const grid = document.querySelector('.calculator-grid');

  let currentExpression = '';

  grid.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.matches('button')) return;

    const value = target.dataset.value;
    const action = target.dataset.action;

    if (action === 'clear') {
      clearAll();
    } else if (action === 'delete') {
      deleteLast();
    } else if (action === 'calculate') {
      evaluateExpression();
    } else if (value !== undefined) {
      appendValue(value);
    }
  });

  function appendValue(val) {
    if (currentExpression === '' && ['+', '*', '/', '.'].includes(val)) return;
    
    currentExpression += val;
    updateDisplay(currentExpression);
  }

  function clearAll() {
    currentExpression = '';
    updateDisplay('');
  }

  function deleteLast() {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay(currentExpression);
  }

  function evaluateExpression() {
    if (!currentExpression) return;

    try {
      const sanitizedResult = Function('"use strict"; return (' + currentExpression + ')')();

      if (!isFinite(sanitizedResult)) {
        updateDisplay('Error');
        currentExpression = '';
      } else {
        const formatted = Math.round(sanitizedResult * 1e8) / 1e8;
        currentExpression = String(formatted);
        updateDisplay(currentExpression);
      }
    } catch (err) {
      updateDisplay('Error');
      currentExpression = '';
    }
  }

  function updateDisplay(val) {
    display.value = val;
  }
});