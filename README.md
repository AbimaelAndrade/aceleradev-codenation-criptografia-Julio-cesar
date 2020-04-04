# AceleraDev React - Codenation (Criptografia de Júlio César)

## Resumo
Este repositório é referente ao código utilizado para resolver o desafio __AceleraDev React__. A linguagem utilizada é javascript/nodeJs.

## Regras do desafio:

* As mensagens serão convertidas para minúsculas tanto para a criptografia quanto para descriptografia.
* No nosso caso os números e pontos serão mantidos, ou seja:

> __Normal:__ 1a.a

> __Cifrado:__ 1d.d

Escrever programa, em qualquer linguagem de programação, que faça uma requisição HTTP para a url abaixo:

```js
https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=SEU_TOKEN
```

Para encontrar o seu token , acesse a plataforma Codenation, faça o login e a informação estará la no seu perfil.

O resultado da requisição vai ser um JSON conforme o exemplo:

```js
{
	"numero_casas": 10,
	"token":"token_do_usuario",
	"cifrado": "texto criptografado",
	"decifrado": "aqui vai o texto decifrado",
	"resumo_criptografico": "aqui vai o resumo"
}
```

O primeiro passo é você salvar o conteúdo do JSON em um arquivo com o nome __answer.json__, que irá usar no restante do __desafio__.

Você deve usar o número de casas para decifrar o texto e atualizar o arquivo JSON, no campo decifrado. 
O próximo passo é gerar um resumo criptográfico do texto decifrado usando o algoritmo __sha1__ e atualizar novamente o arquivo JSON. 
OBS: você pode usar qualquer biblioteca de criptografia da sua linguagem de programação favorita para gerar o resumo __sha1__ do texto decifrado.

Seu programa deve submeter o arquivo atualizado para correção via POST para a API:

```js
https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=SEU_TOKEN
```

OBS: a API espera um arquivo sendo enviado como __multipart/form-data__, como se fosse enviado por um formulário HTML, 
com um campo do tipo file com o nome __answer__. Considere isso ao enviar o arquivo.
