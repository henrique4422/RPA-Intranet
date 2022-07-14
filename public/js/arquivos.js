function listaArquivos() {
  mostraModal()

  const render = document.querySelector('.modal-body');
  render.innerHTML = "";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var options = {
    method: "GET",
    headers: myHeaders,
    cache: "default"
  };

  fetch("/lista", options)
    .then(response => response.json())
    .then(data => {
      for (var i in data) {
        let nomeFormatado = data[i];
        nomeFormatado = nomeFormatado.join(' ')
        render.innerHTML += nomeFormatado;
      }
    })
}

function mostraModal() {
  $('#modalArquivos').modal('show')
}

function fecharModal() {
  $('#modalArquivos').modal('hide')
}

function modalConfirma() {
  $('#modalConfirma').modal('show')
}

function modalVazio() {
  $('#modalVazio').modal('show')
}


function limpaTabela() {
  const resultados = document.querySelector('.renderLista');
  resultados.innerHTML = '';
}

function getDocumento() {
  var nome = document.querySelector('.nomeArquivo').value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var options = {
    method: "GET",
    headers: myHeaders,
    cache: "default"
  }

  if (nome == "") {
    modalVazio()
  } else {
    fetch("/download/" + `${nome}`, options)
      .then(function (data) {
        return data.blob();
      }).then(function (result) {
        downloadFile(result, nome)
        modalConfirma()
      })
    resetaPadrao()
  }
}

function downloadFile(result, name) {
  allowedFileTypes = ["application/octet-stream", "application/pkcs12", "application/pdf", "application/vnd.mspowerpoint", "application/xhtml+xml", "application/xml", "text/plain", "text/html", "text/css", "text/javascript", "image/gif", "image/png", "image/jpeg", "image/bmp", "image/webp", "audio/midi", "audio/mpeg", "audio/webm", "audio/ogg", "audio/wav", "video/webm", "video/ogg"];

  const blob = new Blob([result], { type: allowedFileTypes });

  const href = URL.createObjectURL(blob)

  const a = Object.assign(document.createElement("a"), {
    href,
    style: "display:none",
    download: name
  })

  document.body.appendChild(a)

  a.click();
  URL.revokeObjectURL(href);
  a.remove();
}

function resetaPadrao() {
  document.querySelector('.nomeArquivo').value = '';
}

