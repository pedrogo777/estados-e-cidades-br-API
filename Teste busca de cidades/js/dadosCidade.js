const selectEstado = document.querySelector('#sltEstado');
const selectCidade = document.querySelector('#sltCidade');
const URLEstado = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';
let estadoSelecionadoId = 0;

fetch(URLEstado).then(function(response){
    return response.json();
})
.then(function(dados){
    for(let i = 0; i < dados.length; i++){
        selectEstado.innerHTML += `<option value="${dados[i].id}">${dados[i].nome} (${dados[i].sigla})</option>`
    }
})

selectEstado.addEventListener('change', function(e){
    e.preventDefault();

    estadoSelecionadoId = selectEstado.value;
    selectCidade.removeAttribute('disabled')
    BuscarCidades();
})

function BuscarCidades(){
    let URLCidade = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionadoId}/distritos?orderBy=nome`;
    fetch(URLCidade).then(function(response){
        return response.json();
    })
    .then(function(dados){
        selectCidade.innerHTML = '';
        selectCidade.innerHTML = '<option value="0" disabled selected>Selecione a cidade</option>'
        for(let i = 0; i < dados.length; i++){
            selectCidade.innerHTML += `<option value="${dados[i].id}">${dados[i].nome}</option>`
        }
    })
}

