import { create } from 'venom-bot'

create({
    session: 'Roll A Dice',
    multidevice: true
})
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro)
    })

    async function start(client) {
        client.onAnyMessage((message) => {
            // Verifica se a mensagem começa com um número seguido por 'd' (por exemplo, "2d6")
            if (message.body.toLowerCase().match(/^\d+d\d+$/)) {
                const dados = message.body.toLowerCase().split("d");
                if (dados.length === 2) {
                    let quantidade = parseInt(dados[0]);
                    const lados = parseInt(dados[1]);
                    if (!isNaN(quantidade) && !isNaN(lados) && quantidade > 0 && lados > 0) {
                        let resultados = [];
                        for (let i = 0; i < quantidade; i++) {
                            let resultado = Math.floor(Math.random() * lados) + 1;
                            resultados.push(resultado);
                        }
                        const somaResultados = resultados.reduce((acc, curr) => acc + curr, 0);
                        client.sendText(message.from, `Você rolou ${quantidade} dados d${lados} com resultados 🎲: ${resultados.join(", ")}. Soma total 🎲: ${somaResultados}`);
                    } else {
                        client.sendText(message.from, "Formato de dado inválido. Use 2d6, 3d20, etc.");
                    }
                }
            }
        });
    }