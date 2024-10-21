let lastEmoji = ''; // Variable to store the last clicked emoji

function selectButton(button, emoji) {
  // Get all buttons in the same button container
  const buttons = button.parentElement.querySelectorAll('button');
  
  // Remove active class from all buttons
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });

  // Add active class to the clicked button
  button.classList.add('active');
  
  // Store the clicked emoji
  lastEmoji = emoji; 
}

function copyResults() {
  const inputs = document.querySelectorAll('input[type="text"]');
  const textArray = [];

  inputs.forEach(input => {
    if (input.value) {
      textArray.push(lastEmoji + ' ' + input.value); // Prepend the emoji to the input value
    }
  });

  const textToCopy = textArray.join('\n'); // Join all the inputs with a new line
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert('Resumo copiado para a área de transferência!');
  }).catch(err => {
    console.error('Erro ao copiar: ', err);
  });
}

function addRow() {
  // Logic to add more rows can go here
  const container = document.getElementById('emoji-container');
  const newRow = document.createElement('div');
  newRow.className = 'row';
  newRow.innerHTML = `
    <div class="supercell">
      <!-- First Row: Buttons Row -->
      <div class="row button-row">
        <div class="cell">
          <div class="button-container">
            <button class="button button-1" data-preview="Procede" tabindex="-1" onclick="selectButton(this, '🟢')"></button>
            <button class="button button-2" data-preview="Parcialmente procedente" tabindex="-1" onclick="selectButton(this, '🟢')"></button>
            <button class="button button-3" data-preview="Improcede" tabindex="-1" onclick="selectButton(this, '🟢')"></button>
            <button class="button button-4" data-preview="Outro" tabindex="-1" onclick="selectButton(this, '🟢')"></button>
          </div>
        </div>
      </div>
      <!-- Second Row: Inputs -->
      <div class="row input-row">
        <div class="cell">
          <input type="text" placeholder="Pedido">
        </div>
        <div class="cell">
          <input type="text" placeholder="Fundamento da decisão">
        </div>
      </div>
    </div>
  `;
  container.appendChild(newRow);
    // Automatically focus the first input of the new row
    newRow.querySelector('input').focus();

    // Add the Tab key listener to the last input in the new row
    addTabKeyListener();
}

// Function to handle button selection and styling
function selectButton(button, emoji) {
  const buttons = button.parentNode.querySelectorAll('.button');
  buttons.forEach(btn => btn.classList.remove('active')); // Remove active class from all buttons in this container
  button.classList.add('active'); // Add active class to clicked button
}

// Function to listen for the Tab key in the last input
function addTabKeyListener() {
  const inputs = document.querySelectorAll("input[type='text']");
  const lastInput = inputs[inputs.length - 1]; // Get the last input element

  lastInput.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent the default Tab behavior
      addRow(); // Add a new row
    }
  });
}

// Add the Tab key listener to the last input on page load
window.onload = function() {
  addTabKeyListener();
};