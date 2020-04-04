require('dotenv').config()

const fs = require('fs');
const FormData = require('form-data');
const { resolve } = require('path');
const jsonfile = require('jsonfile');
const crypto = require('crypto');
const axios = require('axios');

const token = process.env.TOKEN;
const baseUrl = process.env.API_URL;
const filePath = `${resolve(__dirname)}/answer.json`;

const requireChallege = async ( path ) => {
  try {
    const { data } = await axios.get(`${baseUrl}/generate-data`, { params:{ token } });
    
    // criar arquivo json da resposta
    jsonfile.writeFileSync(path, data);

    console.log('O arquivo "answer.json" foi criado com sucesso!');

  } catch (error) {
    console.error(error);
  } 
}

const decoded = async (textoCifrado, deslocamento) => {

  const scapeCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,".", " "];
  const numeroCasas = deslocamento < 0 ? 26 : deslocamento;

  const textoDecifrado = textoCifrado
    .split('')
    .reduce((texto, char) => {
      const code = char.charCodeAt(0);
      let letra = '';

      // se não for um ponto, número ou espaço em branco.
      if(!scapeCharacters.includes(char)){

        if(code >= 65 && code <= 90){ // Se for letra maiúscula
          letra = String.fromCharCode((code - numeroCasas) % 36);
        }else if(code >= 97 && code <= 122){ // Se for letra minúscula

          if((code -  numeroCasas) < 97) {
            letra = String.fromCharCode(code - numeroCasas + 122 - 97 + 1);
          }else{
            letra = String.fromCharCode(code - numeroCasas);
          }
        }

        return texto += letra;
      }

      return texto += char;
    }, "");

  return textoDecifrado;
}

const updateAnswerFile = async (path) => {
  try {
    const response = jsonfile.readFileSync(path);
    // salvar texto decifrado.
    response.decifrado = await decoded(response.cifrado, response.numero_casas);
    // criar resumo do texto criptografado.
    response.resumo_criptografico = crypto
      .createHash('sha1')
      .update(response.decifrado, 'utf8')
      .digest('hex');

    // atualizar arquivo
    jsonfile.writeFileSync(path, response);  

    console.log(response);  

  } catch (error) {
    console.error(error);
  } 
}

const sendAnswer = async (path) => {
  try {
    const answerFile = await fs.createReadStream(path);
    const formData = new FormData();
    formData.append("answer", answerFile);

    const { data } = await axios(
      {
        method: "POST",
        url: `${baseUrl}/submit-solution?token=${token}`,
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }
      }
    )

    console.log(data);

  } catch (error) {
    console.error(error);
  } 
}

const init = async (path) => {
  // requisitar código para ser decifrado
  await requireChallege(path);

  // Atualizar arquivos
  await updateAnswerFile(path);

  // enviar resultado
  await sendAnswer(path);
}

// Executar desafio
init(filePath);


