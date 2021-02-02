# Log BOT
Esse simples bot de discord pega os chats que você registrar e salva logs dos chats que você desejar.

![image](./assets/image.png "Obrigado Sudano pela ideia de colocar a data e hora :)")

## Requerimentos
- ``npm install discord.js --save``

## Comandos
- ``.register-chat #canal``

Esse comando registra o chat que você desejar e começa a escrever em um ``.txt`` as mensagens que serão enviadas nesse chat.

O arquivo ``.txt`` receberá o nome do canal, a fim de possibilitar mudanças no chat em si, sem alterar o funcionamento das logs.

- ``.chat-log #canal``

Esse comando checa as logs atuais do canal mencionado na mensagem. **EM BREVE ENVIARÁ AS LOGS POR UM PASTEBIN**

- ``.check-cache``

Esse comando checa quais canais estão em cache no momento. Isso acontece para evitar manipulação de arquivos excessivamente, o que acarreta num desempenho de pior qualidade.

## TODO
- [ ] Retornar logs em pastebin