let activeEmoji = "";

// Function to set the active emoji
function setActiveEmoji(emoji) {
  activeEmoji = emoji;
}

function clearInputs() {
  // Reset the active emoji
  activeEmoji = "";

  // Clear input fields in the current row
  const currentRow = event.target.closest(".input_row");
  if (currentRow) {
    const inputs = currentRow.querySelectorAll(".input");
    inputs.forEach(input => {
      input.value = ""; // Clear each input field
    });

    // Reset the active state of emoji buttons
    const emojiButtons = currentRow.querySelectorAll('.button_emoji');
    emojiButtons.forEach(button => {
      button.classList.remove('active'); // Remove active class from all emoji buttons
    });
  }

  // Update the preview to reflect the cleared state
  updatePreview();
}

// Function to create a button press effect
function pressEffect(btn) {
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 100);
}

// Update preview dynamically
function updatePreview() {
  const parteAutoraInput = document.querySelector(".dados_autor .input_dados");
  const parteReInput = document.querySelector(".dados_re .input_dados");
  const numeroProcessoInput = document.querySelector(".dados_numero .input_dados");
  const orgaoJulgadorInput = document.querySelector(".dados_orgao .input_dados");

  // Get current values from the inputs
  const parteAutora = parteAutoraInput.value.trim();
  const parteRe = parteReInput.value.trim();
  const numeroProcesso = numeroProcessoInput.value.trim();
  const orgaoJulgador = orgaoJulgadorInput.value;

  let dados_processo_resultados = "";

  if (parteAutora) {
    dados_processo_resultados += `Parte autora: ${parteAutora}<br>`;
  }

  if (parteRe) {
    dados_processo_resultados += `Parte ré: ${parteRe}<br>`;
  }

  if (numeroProcesso) {
    dados_processo_resultados += `Número do processo: ${numeroProcesso}<br>`;
  }

  if (orgaoJulgador) {
    dados_processo_resultados += `Órgão julgador: ${orgaoJulgador}<br>`;
  }

  const rows = document.querySelectorAll(".row.input_row");
  let results = dados_processo_resultados; // Initialize results with process data

  rows.forEach(row => {
    const pedido = row.querySelector(".input_pedido").value;
    const fundamento = row.querySelector(".input_fundamento").value;
    const valor = row.querySelector(".input_valor").value.trim() || "";
    const activeButton = row.querySelector('.button_emoji.active');
    const emojiDisplay = activeButton ? activeButton.getAttribute('data-emoji') : '';

    results += `${emojiDisplay} Pedido: ${pedido}, Fundamento: ${fundamento}`;
    if (valor) {
      results += `, Valor: R$${valor}`;
    }
    results += "<br>";
  });

  // Update the preview area
  const previewElement = document.getElementById("preview");
  previewElement.innerHTML = results; // Display results in preview
}

// Add input event listeners to update the preview for existing inputs
const inputs = document.querySelectorAll(".input_dados, .input_pedido, .input_fundamento, .input_valor");
inputs.forEach(input => {
  input.addEventListener('input', updatePreview);
});

// Modify copyResults to just copy the current preview text
function copyResults() {
  const results = document.getElementById("preview").textContent;

  navigator.clipboard.writeText(results)
    .then(() => {
      alert("Resultados copiados para a área de transferência!");
    })
    .catch(err => {
      console.error("Erro ao copiar para a área de transferência: ", err);
    });
}

// Function to add a new row
function addRow() {
  const inputContainer = document.querySelector(".medium_container");
  const newRow = document.createElement("div");
  newRow.className = "row input_row";

  newRow.innerHTML = `
      <div class="container_botoes">
        <button class="button button_emoji button_1" onclick="pressEffect(this);setActiveEmoji('🟢'); updatePreview();" data-emoji="🟢"></button>
        <button class="button button_emoji button_2" onclick="pressEffect(this);setActiveEmoji('🟡'); updatePreview();" data-emoji="🟡"></button>
        <button class="button button_emoji button_3" onclick="pressEffect(this);setActiveEmoji('🔴'); updatePreview();" data-emoji="🔴"></button>
        <button class="button button_emoji button_4" onclick="pressEffect(this);setActiveEmoji('🔵'); updatePreview();" data-emoji="🔵"></button>
        <button class="button button_5" onclick="pressEffect(this);clearInputs()">Restaurar</button>
      </div>

      <input type="text" class="input input_pedido" placeholder="Pedido">
      <input type="text" class="input input_fundamento" placeholder="Fundamento da decisão">
      <input type="text" class="input input_valor" placeholder="Valor do pedido">
      <button class="button_delete" onclick="deleteRow(this)">x</button>
        </div>
  `;

  inputContainer.appendChild(newRow);

  // Add input event listeners to the new row inputs
  const newInputs = newRow.querySelectorAll(".input");
  newInputs.forEach(input => {
    input.addEventListener('input', updatePreview);
  });

  // Add click event listener to buttons in the new row
  const newButtons = newRow.querySelectorAll('.button_emoji');
  newButtons.forEach((button) => {
    button.addEventListener('click', () => {
      newButtons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      setActiveEmoji(button.getAttribute('data-emoji')); // Set active emoji from the clicked button
      updatePreview(); // Update the preview after selecting emoji
    });
  });
}

function deleteRow(button) {
  const row = button.closest(".input_row"); // Find the closest row element
  if (row) {
    row.remove(); // Remove the row from the DOM
    updatePreview(); // Update the preview to reflect the changes
  }
}

// Initialize event listeners for existing emoji buttons
const emojiButtons = document.querySelectorAll('.button_emoji');
emojiButtons.forEach((button) => {
  button.addEventListener('click', () => {
    emojiButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    setActiveEmoji(button.getAttribute('data-emoji')); // Set the active emoji when button is clicked
    updatePreview(); // Update the preview after selecting emoji
  });
});
