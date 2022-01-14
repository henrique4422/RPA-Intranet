// Abrir modal
function mostraRegistro (){
    let modal = document.querySelector('.modal-container');
    let registros = document.querySelector('.registros');
 

    modal.style.display = 'block';
    registros.style.display = 'block';
    
}

// Função que fecha o modal
function fecharModal() {
    let modal = document.querySelector('.modal-container');
    let registros = document.querySelector('.registros');
    let modalSelecionar = document.querySelector('.pesquisaInput');
        
    let modalDepart = document.querySelector('.seleciona-depart');

    
    const btnFechar = document.getElementById('fechar');

    btnFechar.onclick = (event) => {
        event.preventDefault();
        modal.style.display = 'none';
        registros.style.display = 'none';
        modalSelecionar.style.display = 'block';
        
    }
    limpaTabela();
    
}

function limpaTabela(){
    const listaID = document.querySelector(".result-id");
    const listaNome = document.querySelector(".result-nome");
    const listaDepart = document.querySelector(".result-depart");
    const listaFuncao = document.querySelector(".result-funcao");

    let modalNome = document.querySelector('.digita-nome');

    listaID.innerHTML = '';
    listaNome.innerHTML = '';
    listaDepart.innerHTML = '';
    listaFuncao.innerHTML = '';
    modalNome.value = '';
}

// Função chamada quando o nome é pesquisado no modal
    function pesquisaRegistro() {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var options = {
            method: "GET",
            headers: myHeaders,
            cache: "default"
        }

        const btnRegistro = document.querySelector('#pesquisa');

        btnRegistro.onclick = (event) => {
            event.preventDefault();
            const entradaRegistro = document.querySelector('#escolhe-nome').value;

            const showData = (result) => {
                for(var i in result){
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

                        const listaID = document.querySelector(".result-id");
                        const listaNome = document.querySelector(".result-nome");
                        const listaDepart = document.querySelector(".result-depart");
                        const listaFuncao = document.querySelector(".result-funcao");
                        
                        listaID.innerHTML += result[i].id + '<br>';
                        listaNome.innerHTML += result[i].nome + '<br>'; 
                        listaDepart.innerHTML += mostrarDepartamento + '<br>';
                        listaFuncao.innerHTML += result[i].funcao + '<br>';
                        
                    }
                }

            fetch(`${entradaRegistro}`, options)
            .then(response => {
                response.json()
            .then(data => showData(data))
            })
        }
    }

// Pesquisa todos os registros quando botão "Pesquisar todos" é clicado no modal
    function pesquisaTodos() {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var options = {
            method: "GET",
            headers: myHeaders,
            cache: "default"
        }

        const btnRegistro = document.querySelector('#pesquisaTodos');

        btnRegistro.onclick = (event) => {
            event.preventDefault();

            const showData = (result) => {
                for(var i in result){
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
                        
                        const listaID = document.querySelector(".result-id");
                        const listaNome = document.querySelector(".result-nome");
                        const listaDepart = document.querySelector(".result-depart");
                        const listaFuncao = document.querySelector(".result-funcao");
                        
                        listaID.innerHTML += result[i].id + '<br>';
                        listaNome.innerHTML += result[i].nome + '<br>'; 
                        listaDepart.innerHTML += mostrarDepartamento + '<br>';
                        listaFuncao.innerHTML += result[i].funcao + '<br>';
                        
                    }
                }

            fetch('/consulta', options)
            .then(response => {
                response.json()
            .then(data => showData(data))
            })
        }
    }

// Função utilizada para cadastrar colaboradores
    function capturaDados() {
        
        var id = document.getElementById('codigo').value;
        var nome = document.getElementById('nome').value;
        var dataNasc = document.getElementById('dataNasc').value;
        var depart = document.getElementById('depart').value;
        var funcao = document.getElementById('funcao').value;
        

        if (id != "")
        {
            alert("Código só deve ser utilizado para pesquisa");
            document.getElementById('codigo').value = '';

        }else if (nome == ""){
            alertaCampos();
        }
        else if (dataNasc == ""){
            alertaCampos();
        }
    
        else if (depart == "0"){
            alertaCampos();
        }
    
        else if (depart == ""){
            alertaCampos();
        }
    
        else if (funcao == ""){
            alertaCampos();
        } 
        else {
        
        var info = {nome, dataNasc, depart, funcao};

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("/insert", {
            method: "POST",
            headers: myHeaders,
            cache: "reload", 
            body:  JSON.stringify(info) 
        }).then((response) => {
            console.log(response)
            return response.json();
        }).then((responseJson) => {
            if (responseJson.resultado)
            {
                confirmaCadastro(); 
                resetaPadrao();
            }else{
                alert('Erro');
            }
        })
        return false;
      }
    }

// Função usada quando é pesquisado um colaborador
    function consultaColaborador() {
        const verificacao = verificaID();
        if (verificacao == false){
            alert("Insira o código para pesquisar");
        } else {

            var id = document.getElementById('codigo').value;
            var nome = document.getElementById('nome').value;
            var dataAniversario = document.getElementById('dataNasc').value;
            var depart = document.getElementById('depart').value;
            var funcao = document.getElementById('funcao').value;


            var info = {id, nome, dataAniversario, depart, funcao};
            var codId = info.id;


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const showData = (result) => {
                
                for(const campo in result){
                    
                    var localeData = result[0].dataAniversario;
                    let dataTransformada = localeData.replace('T03:00:00.000Z', '');


                    document.querySelector("#nome").value = result[0].nome;
                    document.querySelector("#dataNasc").value = dataTransformada;
                    document.querySelector("#depart").value = result[0].departamento;
                    document.querySelector("#funcao").value = result[0].funcao;

                    } 
                }
            
            var options = {
                method: "GET",
                headers: myHeaders,
                cache: "default"
            }

            fetch("/consulta/" + `${codId}`, options)
            .then(response => {
                response.json()
            .then(data => showData(data))
            })
        }
    }

// Função utilizada para deletar colaboradores no banco de dados 
    function deletaColaborador() {
        var id = document.getElementById('codigo').value;
        var nome = document.getElementById('nome').value;
        var dataAniversario = document.getElementById('dataNasc').value;
        var depart = document.getElementById('depart').value;
        var funcao = document.getElementById('funcao').value;


        var info = {id, nome, dataAniversario, depart, funcao};
        var codId = info.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var optionsDelete = {
            method: "DELETE",
            headers: myHeaders,
            cache: "default"
        }

        fetch("/delete/" + `${codId}`, optionsDelete)
            .then(response => {
                response.json()
            .then(registro => console.log(registro))
            })
        confirmaExclusao();
        resetaPadrao();
        }
    
// Função que testa se o Código não é vazio
function verificaID(){
    const inputID = document.getElementById('codigo').value;

    if (inputID == ''){
        return false;
    }
}

// Função que testa se os campos não estão vazios no cadastro de colaboradores
function alertaCampos(){
    document.getElementById('vazio').style.opacity = "1";
    document.getElementById('vazio').style.transition = "2s";
    window.setInterval(function (){
        document.getElementById('vazio').style.opacity = "0";
    }, 5000)
}

// Função que confirma cadastro de colaborador
function confirmaCadastro(){
    document.getElementById('confirmacao').style.opacity = "1";
    document.getElementById('confirmacao').style.transition = "2s";
    window.setInterval(function (){
        document.getElementById('confirmacao').style.opacity = "0";
    }, 3000)
}

// Função que confirma exclusao de colaborador
function confirmaExclusao(){
    document.getElementById('excluido').style.opacity = "1";
    document.getElementById('excluido').style.transition = "2s";
    window.setInterval(function (){
        document.getElementById('excluido').style.opacity = "0";
    }, 3000)
}

// Função chamada ao clicar no botão "Limpar"
function resetaPadrao() {
    document.getElementById('codigo').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('dataNasc').value = '';
    document.getElementById('depart').value = '';
    document.getElementById('funcao').value = '';
}

// Função que deixa a primeira letra do nome maiuscula
function nomeMaiusculo(text) {
    var words = text.toUpperCase().split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
    
}

// Cadastro é feito com botão "Enter"
document.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        const btn = document.querySelector("#enviarBtn");

        btn.click();
    }
})

