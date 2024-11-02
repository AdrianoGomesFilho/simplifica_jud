function pressEffect(btn) {
  btn.style.transform = 'scale(0.95)';
  setTimeout(()=> {
    btn.style.transform = 'scale(1)'
  }, 100);
}

let activeEmoji = "";

function setActiveEmoji(emoji) {
  ectiveEmoji = emoji;
}

function clearInputs() {
activeEmoji = "";

  const currentRow = event.target.closest(".input_row");
  if (currentRow) {
    const inputs = currentRow.querySelectorAll(".input");
    inputs.forEach(input =>{
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
  const parteAutora = document.querySelector(".dados_autor .input_dados").value.trim() || "";
  const parteRe = document.querySelector(".dados_re .input_dados").value.trim();
  const numeroProcesso = document.querySelector(".dados_numero .input_dados").value.trim();
  const orgaoJulgadorInput = document.querySelector(".dados_orgao .input_dados").value;
  
  let dados_processo_resultados ="";

  if(parteAutora) {
    dados_processo_resultados += `Parte autora: ${parteAutora}<br>`;
  }

  if (parteRe) {
    dados_processo_resultados += `Parte ré: ${parteRe}<br>`;
  }
  
  if(numeroProcesso) {
    dados_processo_resultados += `Número do processo: ${numeroProcesso}<br>`;
  }

  if(orgaoJulgador) {
    dados_processo_resultados += `Órgão julgador: ${orgaoJulgador}<br>`;
  }

  const rows = document.querySelectorAll(".row.input_row");

  let results = dados_processo_resultados;

  rows.forEach(row => {

    const activeButton = row.querySelector('.button_emoji.active');
    const emojiDisplay = activeButton ? activeButton.getAttribute('')

    const pedido = row.querySelector(".input_pedido").value.trim()  || "";
    const fundamento = row.querySelector(".input_fundamento").value.trim()  || "";
    const valor = row.querySelector(".input-valor").value.trim() || "";
    
  })
 
}