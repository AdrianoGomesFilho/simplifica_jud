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
    <div class="cell">
      <div class="button-container">
        <button class="button button-1" tabindex="-1" onclick="selectButton(this, '🟢')">Procede</button>
        <button class="button button-2" tabindex="-1" onclick="selectButton(this, '🟡')">Parcialmente procedente</button>
        <button class="button button-3" tabindex="-1" onclick="selectButton(this, '🔴')">Improcede</button>
        <button class="button button-4" tabindex="-1" onclick="selectButton(this, '🔵')">Outro</button>
      </div>
    </div>
    <div class="cell">
      <input type="text" placeholder="Pedido">
    </div>
    <div class="cell">
      <input type="text" placeholder="Fundamento da decisão">
    </div>
  `;
  container.appendChild(newRow);
}
