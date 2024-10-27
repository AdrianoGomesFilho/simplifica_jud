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
  updateCustomerPreview(); // Ensure customer preview is also updated
}

// Create a button press effect
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

    results += `${emojiDisplay} Pedido: ${pedido}`;

    if (fundamento) {
      results += `, Fundamento: ${fundamento}`;
    }

    if (valor) {
      results += `, Valor: R$${valor}`;
    }
    results += "<br>";
  });

  // Update the preview area
  const previewElement = document.getElementById("internalPreview");
  previewElement.innerHTML = results; // Display results in preview
}

// Update customer preview
function updateCustomerPreview() {
  const parteAutora = document.querySelector(".dados_autor .input_dados").value.trim();
  const parteRe = document.querySelector(".dados_re .input_dados").value.trim();
  const numeroProcesso = document.querySelector(".dados_numero .input_dados").value.trim();
  const orgaoJulgador = document.querySelector(".dados_orgao .input_dados").value;

  const rows = document.querySelectorAll(".row.input_row");

  // Initialize groups for each emoji category
  const procedentes = []; // Green emoji
  const improcedentes = []; // Red emoji
  const parcialmenteProcedentes = []; // Yellow emoji
  const observacoes = []; // Blue emoji

  rows.forEach(row => {
    const pedido = row.querySelector(".input_pedido").value.trim();
    const activeButton = row.querySelector('.button_emoji.active');
    const emojiDisplay = activeButton ? activeButton.getAttribute('data-emoji') : '';

    if (emojiDisplay === '🟢') {
      procedentes.push(pedido);
    } else if (emojiDisplay === '🔴') {
      improcedentes.push(pedido);
    } else if (emojiDisplay === '🟡') {
      parcialmenteProcedentes.push(pedido);
    } else if (emojiDisplay === '🔵') {
      observacoes.push(pedido);
    }
  });

  // Build the customer preview text
  let customerPreviewText = `Prezado(a) ${parteAutora}, tivemos decisão do ${orgaoJulgador} no processo número: ${numeroProcesso} contra a parte ré "${parteRe}".<br><br>`;

  if (procedentes.length > 0) {
    customerPreviewText += `Os pedidos procedentes foram: "${procedentes.join(', ')}". A empresa poderá recorrer de tais pontos.<br>`;
  }
  if (improcedentes.length > 0) {
    customerPreviewText += `Os pedidos improcedentes foram: "${improcedentes.join(', ')}". Iremos recorrer de tais pontos.<br>`;
  }
  if (parcialmenteProcedentes.length > 0) {
    customerPreviewText += `Os pedidos parcialmente procedentes foram: "${parcialmenteProcedentes.join(', ')}".<br>`;
  }
  if (observacoes.length > 0) {
    customerPreviewText += `Sobre o pedido "${observacoes.join(', ')}" iremos fazer uma observação:<br>`;
  }

  customerPreviewText += "<br>Cuidado com golpes! Havendo novidades lhe informaremos através dos meios oficiais de comunicação, reforçamos que o escritório não solicita adiantamentos de qualquer natureza. Havendo dúvida, comunique com nossa equipe.<br><br>É um prazer lhe ter como cliente! Aproveitamos para lhe pedir uma avaliação dos nossos serviços via Google Maps: LINK DO SEU ESCRITÓRIO.<br>";


  // Display the customer preview in a separate element
  const customerPreviewElement = document.getElementById("customerPreview");
  customerPreviewElement.innerHTML = customerPreviewText;
}

// Add input event listeners to existing inputs to update the customer preview
const inputFields = document.querySelectorAll(".input_dados, .input_pedido, .input_fundamento, .input_valor");
inputFields.forEach(input => {
  input.addEventListener('input', () => {
    updatePreview();
    updateCustomerPreview(); // Update customer preview on input changes
  });
});

// Modify copyResults to just copy the current preview text
function copyInternalPreview() {
  const internalPreview = document.getElementById("internalPreview").innerHTML; // Use innerHTML for formatting

  navigator.clipboard.writeText(internalPreview.replace(/<br\s*\/?>/g, "\n")) // Replace <br> with newline
    .catch(err => {
      console.error("Erro ao copiar o resumo interno: ", err);
    });
}

function copyExternalPreview() {
  const externalPreview = document.getElementById("customerPreview").innerHTML; // Use innerHTML for formatting

  navigator.clipboard.writeText(externalPreview.replace(/<br\s*\/?>/g, "\n")) // Replace <br> with newline
    .catch(err => {
      console.error("Erro ao copiar o resumo externo: ", err);
    });
}

// Add event listeners to the copy buttons
document.getElementById("copyInternalPreview").addEventListener('click', copyInternalPreview);
document.getElementById("copyExternalPreview").addEventListener('click', copyExternalPreview);

// Function to add a new row
function addRow() {
  const inputContainer = document.querySelector(".medium_container");
  const newRow = document.createElement("div");
  newRow.className = "row input_row";

  newRow.innerHTML = `
      <div class="container_botoes">
        <button tabindex="-1" class="button button_emoji button_1" data-emoji="🟢"></button>
        <button tabindex="-1" class="button button_emoji button_2" data-emoji="🟡"></button>
        <button tabindex="-1" class="button button_emoji button_3" data-emoji="🔴"></button>
        <button tabindex="-1" class="button button_emoji button_4" data-emoji="🔵"></button>
        <button tabindex="-1" class="button button_5" onclick="pressEffect(this);clearInputs()">Limpar</button>
      </div>

      <input type="text" class="input input_pedido" placeholder="Pedido">
      <input type="text" class="input input_fundamento" placeholder="Fundamento da decisão">
      <input type="text" class="input input_valor" placeholder="Valor do pedido">
      <button tabindex="-1" class="button_delete" onclick="deleteRow(this)">x</button>
    `;

  inputContainer.appendChild(newRow);

  // Add input event listeners to the new row inputs
  const newInputs = newRow.querySelectorAll(".input");
  newInputs.forEach(input => {
    input.addEventListener('input', () => {
      updatePreview();
      updateCustomerPreview(); // Update customer preview on input changes
    });
  });

  // Add click event listener to buttons in the new row
  const newButtons = newRow.querySelectorAll('.button_emoji');
  newButtons.forEach((button) => {
    button.addEventListener('click', () => {
      newButtons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      setActiveEmoji(button.getAttribute('data-emoji')); // Set active emoji from the clicked button
      updatePreview(); // Update the preview after selecting emoji
      updateCustomerPreview(); // Ensure customer preview updates
    });
  });
}

// Initialize event listeners for existing emoji buttons
const emojiButtons = document.querySelectorAll('.button_emoji');
emojiButtons.forEach((button) => {
  button.addEventListener('click', () => {
    emojiButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    setActiveEmoji(button.getAttribute('data-emoji')); // Set the active emoji when button is clicked
    updatePreview(); // Update the preview after selecting emoji
    updateCustomerPreview(); // Update customer preview
  });
});

// Function to delete a row
function deleteRow(button) {
  const row = button.closest('.input_row');
  if (row) {
    row.remove();
    updatePreview(); // Update preview after row deletion
    updateCustomerPreview(); // Update customer preview after row deletion
  }
}

// Initialize input event listeners for existing rows
const existingRows = document.querySelectorAll(".input_row");
existingRows.forEach(row => {
  const rowInputs = row.querySelectorAll(".input");
  rowInputs.forEach(input => {
    input.addEventListener('input', () => {
      updatePreview();
      updateCustomerPreview(); // Update customer preview on input changes
    });
  });

  const emojiButtons = row.querySelectorAll('.button_emoji');
  emojiButtons.forEach(button => {
    button.addEventListener('click', () => {
      emojiButtons.forEach(btn => btn.classList.remove('active')); // Remove active class from all buttons
      button.classList.add('active'); // Add active class to the clicked button
    });
  });
});
