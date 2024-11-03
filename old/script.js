function pressEffect(btn) {
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)'
  }, 100);
}

let activeEmoji = "";

function setActiveEmoji(emoji) {
  activeEmoji = emoji;
}

function clearInputs() {
  activeEmoji = "";

  const currentRow = event.target.closest(".input_row");
  if (currentRow) {
    const inputs = currentRow.querySelectorAll(".input");
    inputs.forEach(input => {
      input.value = "";
    });

    const emojiButtons = currentRow.querySelectorAll('.button_emoji');
    emojiButtons.forEach(button => {
      button.classList.remove('active');
    });
  }

  updatePreview();
  updateCustomerPreview();
}

function updatePreview() {
  const parteAutora = document.querySelector(".dados_autor .input_dados")?.value.trim() || "";
  const parteRe = document.querySelector(".dados_re .input_dados")?.value.trim();
  const numeroProcesso = document.querySelector(".dados_numero .input_dados")?.value.trim();
  const orgaoJulgador = document.querySelector(".dados_orgao .input_dados")?.value;

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

  let results = dados_processo_resultados;

  rows.forEach(row => {

    const activeButton = row.querySelector('.button_emoji.active');
    const emojiDisplay = activeButton ? activeButton.getAttribute('data-emoji') : '';

    const pedido = row.querySelector(".input_pedido")?.value.trim() || "";
    const fundamento = row.querySelector(".input_fundamento")?.value.trim() || "";
    const valor = row.querySelector(".input-valor")?.value.trim() || "";

    results += `${emojiDisplay} Pedido: ${pedido}<br>`;

    if (fundamento) {
      results += `${emojiDisplay} Pedido: ${pedido}`;
    }

    if (valor) {
      results += `, Valor: R$${valor}`;
    }
    results += "<br>";
  });

  const previewElement = document.getElementById("internalPreview");
  previewElement.innerHTML = results;
}

function updateCustomerPreview() {
  const parteAutora = document.querySelector(".dados_autor .input_dados")?.value.trim();
  const parteRe = document.querySelector(".dados_re .input_dados")?.value.trim();
  const numeroProcesso = document.querySelector(".dados_numero .input_dados")?.value.trim();
  const orgaoJulgador = document.querySelector(".dados_orgao .input_dados")?.value;

  const rows = document.querySelectorAll(".row.input_row");

  const procedentes = [];
  const improcedentes = [];
  const parcialmenteProcedentes = [];
  const observacoes = [];

  rows.forEach(row => {
    const pedido = row.querySelector(".input_pedido")?.value.trim();
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

  let customerPreviewText = `Prezado(a) ${parteAutora},
    tivemos uma decisão do ${orgaoJulgador} no processo número: ${numeroProcesso} contra a parte ré ${parteRe}.<br><br>`;

  if (procedentes.length > 0) {
    customerPreviewText += `🟢Os pedidos procedentes foram: "${procedentes.join(', ')}. A parte ré poderá recorrer de tais pontos.<br><br>`;
  }
  if (improcedentes.length > 0) {
    customerPreviewText += `Os pedidos improcedentes foram: ${improcedentes.join(', ')}. Iremos recorrer de tais pedidos.<br><br>`;
  }
  if (parcialmenteProcedentes.length > 0) {
    customerPreviewText += `Os pedidos parcialmente procedentes foram: "${parcialmenteProcedentes.join(', ')}". Poderá haver recurso de ambas as partes.<br><br>`;
  }
  if (observacoes.length > 0) {
    customerPreviewText += `Sobre o pedido "${observacoes.join(', ')}" iremos fazer uma observação:<br>`;
  }

  customerPreviewText += "<br>Cuidado com golpes! Havendo novidades lhe informaremos através dos meios oficiais de comunicação, reforçamos que o escritório não solicita adiantamentos de qualquer natureza. Havendo dúvida, comunique com nossa equipe.<br><br>É um prazer lhe ter como cliente! Aproveitamos para lhe pedir uma avaliação dos nossos serviços via Google Maps: https://maps.app.goo.gl/RpNeBQreMS7fSuUUA.<br>";

  const customerPreviewElement = document.getElementById("customerPreview");
  customerPreviewElement.innerHTML = customerPreviewText;
}

const inputFields = document.querySelectorAll(".input_dados, .input_pedido, input_fundamento, .input_valor");
inputFields.forEach(input => {
  input.addEventListener('input', () => {
    updatePreview();
    updateCustomerPreview();
  });
});

function copyInternalPreview() {
  const internalPreview = document.getElementById("internalPreview").innerText;
  navigator.clipboard.writeText(internalPreview.replace(/<br\s*\/?>/g, "\n"))
    .catch(err => {
      console.error("Erro ao copiar resumo: ", err);
    })
}

document.getElementById("copyInternalPreview").addEventListener('click', copyInternalPreview);
document.getElementById("copyExternalPreview").addEventListener('click', copyExternalPreview);

function addRow() {
  const inputContainer = document.querySelector(".medium_container");
  const newRow = document.createElement("div");
  newRow.className = "row input_row";

  newRow.innerHTML = `
        <div class="container_botoes">
          <button tabindex="-1" class="button button_emoji button_1" onclick="pressEffect(this);setActiveEmoji('🟢')" data-emoji="🟢"></button>
          <button tabindex="-1" class="button button_emoji button_2" onclick="pressEffect(this);setActiveEmoji('🟡')" data-emoji="🟡"></button>
          <button tabindex="-1" class="button button_emoji button_3" onclick="pressEffect(this);setActiveEmoji('🔴')" data-emoji="🔴"></button>
          <button tabindex="-1" class="button button_emoji button_4" onclick="pressEffect(this); setActiveEmoji('🔵')" data-emoji="🔵"></button>
          <button tabindex="-1" class="button button_5" onclick="pressEffect(this);clearInputs()">Limpar</button>
        </div>

        <input type="text" class="input input_pedido" placeholder="Pedido">
        <input type="text" class="input input_fundamento" placeholder="Fundamento da decisão">
        <input type="text" class="input input_valor" placeholder="Valor do pedido">`;

  inputContainer.appendChild(newRow);

  const newInputs = newRow.querySelectorAll(".input");
  newInputs.forEach(input => {
    input.addEventListener('input', () => {
      updatePreview();
      updateCustomerPreview(); // Update customer preview on input changes
    });
  });

  const newButtons = newRow.querySelectorAll('.button_emoji');
  newButtons.forEach((button) => {
    button.addEventListener('click', () => {
      newButtons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      setActiveEmoji(button.getAttribute('data-emoji'));
      updatePreview();
      updateCustomerPreview();
    })
  })
}

const emojiButtons = document.querySelectorAll('.button_emoji');
emojiButtons.forEach((button) => {
  button.addEventListener('click', () => {
    emojiButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    setActiveEmoji(button.getAttribute('data-emoji'));
    updatePreview();
    updateCustomerPreview();
  });
});

function deleteRow(button) {
  const row = button.closest('.input_row');
  if (row) {
    row.remove();
    updatePreview();
    updateCustomerPreview();
  }
}

const existingRows = document.querySelectorAll(".input_row");
existingRows.forEach(row => {
  const rowInputs = row.querySelectorAll(".input");
  rowInputs.forEach(input => {
    input.addEventListener('input', () => {
      updatePreview();
      updateCustomerPreview();
    });
  });

  const emojiButtons = row.querySelectorAll('.button_emoji');
  emojiButtons.forEach(button => {
    emojiButtons.forEach(button => {
      button.addEventListener('click', () => {
        emojiButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  });

});