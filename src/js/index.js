const chaveDaApi = "8f5820462b334b6bbfb42008232311";
const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;

    if(!cidade) return;

    const dados = await buscarDadosDaCidade(cidade);

    if(dados) preencherDadosNaTela(dados, cidade);
})

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no`;

    const resposta = await fetch(apiUrl);

    const dados = resposta.json();

    return dados;
}

function preencherDadosNaTela(dados, cidade) {
    cidadeMaiusculo = cidade.split(" ");
    for (let i = 0; i < cidadeMaiusculo.length; i++) {
        cidadeMaiusculo[i] = cidadeMaiusculo[i][0].toUpperCase() + cidadeMaiusculo[i].substring(1);     
    }
    cidade = cidadeMaiusculo.join(" ");

    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const umidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;
    
    document.getElementById("temperatura").textContent =  `${temperatura} °C`;

    document.getElementById("condicao").textContent = condicao;

    document.getElementById("umidade").textContent = `${umidade}%`;

    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento} km/h`;

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}

