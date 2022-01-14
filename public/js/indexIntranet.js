function mostraAniversarios() {
  var mesCorrente = new Date();
  mesCorrente = mesCorrente.getMonth() + 1;

  const listaNome = document.querySelector(".aniverNome");
  const listaDepart = document.querySelector(".aniverDepart");
  const listaData = document.querySelector(".aniverData");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var options = {
    method: "GET",
    headers: myHeaders,
    cache: "default"
  }

  const showData = (result) => {
    for (var i in result) {
      var mostrarDepartamento = result[i].departamento;
      switch (mostrarDepartamento) {
        case 1:
          mostrarDepartamento = 'Atendimento';
          break;
        case 2:
          mostrarDepartamento = 'Comercial';
          break;
        case 3:
          mostrarDepartamento = 'Compras';
          break;
        case 4:
          mostrarDepartamento = 'Controladoria';
          break;
        case 5:
          mostrarDepartamento = 'COT';
          break;
        case 6:
          mostrarDepartamento = 'Financeiro';
          break;
        case 7:
          mostrarDepartamento = 'Gente e Gestão';
          break;
        case 8:
          mostrarDepartamento = 'Perdas e danos';
          break;
        case 9:
          mostrarDepartamento = 'Tecnologia';
          break;
      }

      if (mesCorrente == result[i].Mes) {
        listaNome.innerHTML += result[i].nome + '<br>';
        listaData.innerHTML += result[i].Dia + '<br>';
        listaDepart.innerHTML += mostrarDepartamento + '<br>';
      }
    }
  }


  fetch("/consultaAniver", options)
    .then(response => {
      response.json()
        .then(data => data.sort((a, b) => (a.Dia > b.Dia) ? 1 : (b.Dia > a.Dia) ? -1 : 0)
          .then(showData(data)))
    })
}

function scrollAniver() {
  const sessaoScroll = document.getElementById('aniverBarra');

  scrolldelay = setTimeout('scrollAniver()',500);
  sessaoScroll.scrollBy(0, 2);

  sessaoScroll.addEventListener('scroll', function () {
    var scrolled = sessaoScroll.scrollHeight - Math.abs(sessaoScroll.scrollTop) === sessaoScroll.clientHeight;
    if (scrolled === true) {
      sessaoScroll.scrollTo(0, -10);

    }
  })
}


// Controla imagens
function currentSlide(n) {
  showSlides(slideIndex = n);
}
var slideIndex = 0;
var timeout;

//Slide Proximo/Anterior controle
function plusSlides(n) {
  slideIndex += n;
  showSlides();
}

function showSlides() {
  if (timeout != null) {
    clearTimeout(timeout);
  }

  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  if (slideIndex < 1) { slideIndex = slides.length }
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  timeout = setTimeout(function () {
    slideIndex++; showSlides()
  }
    , 5000); // Muda imagem a cada 5s
}