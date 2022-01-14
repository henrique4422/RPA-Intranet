var funcionarios = {};

const mes = ["Janeiro", "Fevereiro", "Março", "Abri", "Maio", "Junho", "Julho",
"Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const d = new Date();
var mesAtual = (mes[d.getMonth()]);

var data  = new Date();
var mesNum = data.getMonth()+1;

function capturaDados() {
  var nome = document.getElementById('nome');
  console.log(nome);
  return nome;
}

const arquivoMes = 
      ["json/intranet.json", 
      "json/janeiro.json",
      "json/fevereiro.json", 
      "json/marco.json", 
      "json/abril.json", 
      "json/maio.json", 
      "json/junho.json", 
      "json/julho.json", 
      "json/agosto.json", 
      "json/setembro.json", 
      "json/outubro.json", 
      "json/novembro.json", 
      "json/dezembro.json"];


function inicializaAniver(){
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Chamada tipica quando documento está pronto
      funcionarios = JSON.parse(xhttp.responseText);
      adicionaLinha();
    }
};

for (var i = 0; i <= mes.length; i++){
  if(mesNum == i){
    xhttp.open("GET", arquivoMes[i],  true);
    xhttp.send();
    }
  }  
}

if (!String.prototype.format) {
  String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined'
              ? args[number]
              : match
          ;
      });
  };
}

function adicionaLinha() {
var output = '';
for(var i = 0; i < funcionarios.colaboradores.length; i++){
 colaborador = funcionarios.colaboradores[i];
 output += '<div class="aniver-linha"> <div class="nome-aniver aniver-coluna"><span class="nome">{0}</span></div><div class="data-aniver aniver-coluna"><span>{1}<span></div><div class="depart-aniver aniver-coluna"><span>{2}</span></div></div >'.format(colaborador.nome, colaborador.data, colaborador.depart);
}

document.getElementById('colab-content').innerHTML = output; 

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

  if (slideIndex < 1) {slideIndex = slides.length}
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  timeout = setTimeout(function () { slideIndex++; showSlides()}
    , 5000); // Muda imagem a cada 5s
}