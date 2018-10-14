const prompt = require('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1');

// dotenv: usado para não enviar credenciais ao GitHub
require('dotenv').config()


const chatbot = new watson({
    //username: process.env.USERNAME,
    username: '46aa3d5d-5e20-4a9b-93da-5720f113b442',
    password: process.env.PASSWORD,
    version: process.env.VERSION
})

const workspace_id = process.env.WORKSPACE_ID;


// começamos a conversação com uma mensagem vazia
chatbot.message({
    workspace_id}, trataResposta);

let fimDeConversa = false;

function trataResposta(err, resposta) {
    if(err){
        console.log(err); // caso tenha erro
        return;
    }

    // detecta a intenção do usuário
    if (resposta.intents.length>0){
        console.log('Eu detectei a intenção:' + resposta.intents[0].intent);
        if(resposta.intents[0].intent =='despedida')
            fimDeConversa=true;
    }

    //console.log(resposta)
    // exibe respota do diálogo, caso haja
    if (resposta.output.text.length > 0){
        //console.log('Atendente ---> : ' + resposta.output.text)
        console.log(resposta.output.text)
    }

    //console.log(resposta.context); // mostra a resposta completa

    if (!fimDeConversa){
        const mensagemUsuario = prompt('>>>>>');
        chatbot.message({
            workspace_id,
            input: {text:mensagemUsuario},
            context: resposta.context  
            // inclui o contexto - para o Watson se localizar onde está na conversa
        }, trataResposta)
    }

}