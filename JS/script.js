const url = 'Dados/champions.json'

function revelar(){
    axios(url).then(resp => {
        const itens = resp.data.reduce(
            (html, campeoes) => html + `${campeoes.name},`, ''
        )

        let splitado = itens.split(',')
        let tamanhoItens = splitado.length
        let desabilitar = document.querySelector('.resposta')
        desabilitar.setAttribute("disabled", "disabled")
        clearInterval(this.loop)
        for(i = 0; i <= tamanhoItens; i++){
            let mudarDisplay = document.getElementById(splitado[i])
            mudarDisplay.style.display = ''
        }

    })
}

fetch(url)
    .then(resp => resp.json())
    .then(estados => {
        const itens = estados.reduce(
            (html, estado) => html + `${estado.name},`, ''
            )
        const teste2 = itens.split(",")
            
        
        listaTabela(teste2)
    })     


function listaTabela(campeoes){
    let tbody = document.getElementById("tbody")
    tbody.innerText = ''
    for(let i = 0; i<= 25; i++){
        let tr =tbody.insertRow()
        let td_id = tr.insertCell()
        let td_id2 = tr.insertCell()
        let td_id3 = tr.insertCell()
        let td_id4 = tr.insertCell()
        let td_id5 = tr.insertCell()
        let td_id6 = tr.insertCell()
        let td_id7 = tr.insertCell()
       
        td_id.innerText = campeoes[i]
        td_id2.innerText = campeoes[i + 26]
        td_id3.innerText = campeoes[i + 52]
        td_id4.innerText = campeoes[i + 78]
        td_id5.innerText = campeoes[i + 104]
        td_id6.innerText = campeoes[i + 130]
        td_id7.innerText = campeoes[i + 155]
        td_id.setAttribute("id", campeoes[i])
        td_id.setAttribute("style", "display: none;")
        td_id2.setAttribute("id", campeoes[i + 26])
        td_id2.setAttribute("style", "display: none;")
        td_id3.setAttribute("id", campeoes[i + 52])
        td_id3.setAttribute("style", "display: none;")
        td_id4.setAttribute("id", campeoes[i + 78])
        td_id4.setAttribute("style", "display: none;")
        td_id5.setAttribute("id", campeoes[i + 104])
        td_id5.setAttribute("style", "display: none;")
        td_id6.setAttribute("id", campeoes[i + 130])
        td_id6.setAttribute("style", "display: none;")
        td_id7.setAttribute("id", campeoes[i + 155])
        td_id7.setAttribute("style", "display: none;")
        tr.setAttribute("align", "center")
        
        
    }
  
}

function comparar(){
    axios(url).then(resp => {
        const itens = resp.data.reduce(
            (html, campeoes) => html + `${campeoes.name},`, ''
        )
        var input = document.querySelector(".resposta")
        let valor = input.value
        let maiscula = valor[0].toUpperCase() + valor.substring(1)
        if(maiscula.includes("'")){
            let i = maiscula.indexOf("'")
            let maiscula2 = maiscula[i+1].toUpperCase()
            let iC = i+1
            let palavraC = maiscula.replace(maiscula[iC], maiscula2)
            removerNone(palavraC)
            score()
            input.value=''
        }
        else if (maiscula == "Jarvan iv"){
            let palavraC = "Jarvan IV"
            removerNone(palavraC)
            score()
            input.value=''
        }
        else if (maiscula == "Nunu e willump"){
            let palavraC = "Nunu E Willump"
            removerNone(palavraC)
            score()
            input.value=''
        }
        else if (maiscula.includes(" ")){
            let i = maiscula.indexOf(" ")
            let maiscula2 = maiscula[i+1].toUpperCase()
            let IC = i+1
            let palavraC = maiscula.replace(maiscula[IC], maiscula2)
            removerNone(palavraC)
            score()
            input.value=''
        }

        
        let splitado = itens.split(',')
        let displayValue = document.getElementById(maiscula)
        let verificarDisplay = getComputedStyle(displayValue).getPropertyValue('display')
        let tamanhoItens = splitado.length
        for(i = 0; i <= tamanhoItens; i++){
            if(maiscula == splitado[i] && verificarDisplay == 'none'){
                input.value = ''
                removerNone(maiscula)
                score() 
            }
        } 
        
    })
}

function removerNone(id){
    let mudarDisplay = document.getElementById(id)
    mudarDisplay.style.display = ''
}
let contador = 0
function score(){
    let acertos = document.querySelector(".acertos")
    
    contador = contador +1
    acertos.innerHTML = `Acertos: ${contador}/162`

    
}

window.onhashchange = function(e) {
    const oldURL = e.oldURL.split('#')[1]
    const newURL = e.newURL.split('#')[1]
    const oldLink = document.querySelector(`.menu a[href='#${oldURL}']`)
    const newLink = document.querySelector(`.menu a[href='#${newURL}']`)
    oldLink && oldLink.classList.remove('selected')
    newLink && newLink.classList.add('selected')
}

function botaoMenu(){
    const menuMobile = document.querySelector('.mobileMenu')
    if(menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open')
    } else{
        menuMobile.classList.add('open')
    }
}

function tempo(duracao, display){
    
    let timer = duracao, minutos, segundos
    let intervalo =setInterval(function() {
        
        minutos = parseInt(timer / 60, 10)
        segundos = parseInt(timer % 60, 10)

        minutos = minutos < 10 ? "0" + minutos: minutos
        segundos= segundos < 10 ? "0" + segundos: segundos

        display.textContent = minutos + ":" + segundos

        if(--timer < 0){
            timer = duracao
        }
        
    }, 1000);
    this.loop = intervalo
}

function comecarTempo(){
    var duracao = 60*10 
    var display = document.querySelector(".timer")
    var teste = document.querySelector('.informacoes')
    var botao = document.querySelector('.comecar')

    testeI = '<input type="text" class="resposta" placeholder= "Nome do Campeão" ;" oninput="comparar()">'
    teste.insertAdjacentHTML('afterbegin', testeI)
    botao.style.display = 'none'

    tempo(duracao, display)
}



