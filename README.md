# Linux Push Notifications

<img src="android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png" />

> Aplicativo desenvolvido em [React Native](https://reactnative.dev/) que recebe notificações push disparadas por **ShellScript** utilizando [OneSignal](https://onesignal.com/) + [Firebase](https://firebase.google.com/?hl=pt).
> Minha principal motivação para construir o app foi depois de ter descoberto o app [Pushover](https://play.google.com/store/apps/details?id=net.superblock.pushover) que faz exatamente isso, permite com que mandemos notificações push para grupos de aparelhos via script(o app **Linux Push Notifications** de longe não faz ném metade do que o **Pushover** faz, meu aplicativo ta mais pra um fangame, porém pretendo tornar o app tão útil quanto o app que inspirou esse projeto).

O app foi construído e pensado apenas para **Android**, então provavelmente se você quiser utilizar dentro do **Ios** terá que modificar o código fonte mais do que o mínimo para utilizar o aplicativo.

> ## Versão 1.0
> A versão 1.0 do aplicativo tem apenas uma funcionalidade que é receber as notificações disparadas pelo seu **shellscript** ou requisição via **JavaScript**, **PHP**, **Python** etc. [Saiba mais lendo a documentação da api rest do OneSignal](https://documentation.onesignal.com/reference/create-notification#example-code---create-notification)

> ## Notas para o futuro -> V2.0
> Ao ler essa documentação você vai se deparar com os passos para começar a utilizar a aplicação e ainda não é uma tarefa simples, mas para o futuro pretendo tornar o processo menos complicado automatizando algumas coisas, já outras pelo fato da ideia de ser um aplicativo para uso pessoal e gratuito sempre existirá um trabalho na primeira configuração para criar um registro do app no **OneSignal** e **Firebase**, porém depois de feito uma vez dificilmente precisará de manutenção recorrente.
> - Cadastrar o **OneSignal AppID** por qrcode.
> > Para que as notificações push cheguem ao seu aparelho precisamos configurar o app dentro de uma conta no OneSignal após o cadastro, temos acesso ao ID do app, com ele precisamos adicionar no código para quando fizermos a requisição **createNotification** dentro do nosso script o OneSignal possa mandar a notificação push para o app instalado no nosso aparelho.
> - Registrar no app as notificações recebidas.
> > É importante ter um registro das nossas informações ainda mais pensando no cenário onde você pode programar notificações dentro da VM do servidor do qual seu site está hospedado seja lá para o que for, HD cheio, super aquecimento etc.

Lembrando sempre que esse é um app individual para uso pessoal e não profissional(nada impede você de expandir o projeto como quiser), então ele serviria mais como uma ferramenta pessoal para ir tomar um café e saber exatamente quando aquele build foi concluído.

## Agora vamos ao que interessa

### Nossos Objetivos são
- Criar uma conta e um projeto no **Google Firebase** para obter a **Chave do servidor** e **ID do remetente**.
- Criar uma conta no **OneSignal** para obter o **APPID** para receber as Push Notifications.
- Modificar o código do aplicativo adicionando o **APPID** obtido no passo anterir, dentro da configuração **OneSignal** no arquivo index.js na pasta raíz do projeto.
- Gerar um apk release do app.
- Criar um shellscript para enviar as notificações.

## Passo 1 - Criando conta no Firebase
- Criar a conta no **Firebase** é simples acesse o [site](https://console.firebase.google.com/u/0/?hl=pt) loge com a sua conta ou crie uma se quiser, acesse o console do firebase e clique em adicionar projeto depois disso é só seguir os passos, não precisa configurar nada, selecine **android** quando perguntar sobre a plataforma, dê o nome que você quiser para o projeto.
- Agora dentro do projeto criado, ao lado de **Visão Geral do Projeto** do lado superior esquerdo você irá ver uma engranagem, clique nela, entre em configurações gerais do projeto.
- Agora você deve estar na aba **Geral**, clique ao lado **Cloud Messaging**.
- Chegamos a parte importante, anote em qualquer lugar de sua preferência a **Chave do servidor** e o **ID do remetente** usaremos esses valores na configuração do **OneSignal**.
**Fim do Passo 1**

## Passo 2 - Criar Conta e Configuração OneSignal
- Entre no [site](https://app.onesignal.com/) do **OneSignal** e faça o login ou crie uma conta.
- Clique em **New App**, digite um nome, pode ser qualquer nome. Selecione a plataforma **Android** e clique em next.
- Irá aparecer um formulário pedindo a **Firebase Server Key(Chave do servidor)** e **Firebase Sender ID(ID do remetente)**.
- Após preencher o formulário e clicar em next selecione React Native/Expo e clique em Save/Continue.
- Agora copie o **APPID** e anote em um local de sua preferência e deixe a tela onde está.
**Fim do Passo 2**

## Passo 3 - Adicionando AppID no código do Linux Push Notification
- Primeiro vamos clonar o repositório
```bash
git clone git@github.com:inacio0196/linuxpush.git
cd linuxpush
```
- Dentro do projeto, vamos instalar as dependências
```bash
yarn
```
- Agora dentro do arquivo **./index.js**, vamos editar a configuração do **OneSignal**
```javascript
import {AppRegistry} from 'react-native';
// ...
// ...
import OneSignal from 'react-native-onesignal';

// ...
// ...
OneSignal.setAppId('ONESIGNAL_APP_ID'); // Troque ONESIGNAL_APP_ID pelo seu APPID obtido no passo anterior.
```
- Salve as alterações e pronto, o app já está configurado.
**Fim do Passo 3**

## Passo 4 - Gerar APK Release
> Chegou uma parte da qual eu realmente queria poupar você, pois para isso terá que configurar o ambiente React Native na sua máquina, infelizmente não tem como escapar dessa parte, pelo menos a primeiro momento, provavelmente na versão 2.0 não será necessário mais esse passo estressante pois deixarei o apk anexado para download.
- Primeiro você precisa configurar o ambiente React Native na sua máquina, para isso eu recomendo seguir esse tutorial da [Rocketseat](https://react-native.rocketseat.dev/) tente criar e rodar um projeto para validar se o ambiente está configurado corretamente.
- Agora dentro da pasta do projeto.
```bash
cd android && ./gradlew clean && ./gradlew assembleRelease
```
- E pronto o apk release está em **android/app/build/outputs/apk/release/app-release.apk**
- Passe o apk para seu aparelho e instale.
**Fim do Passo 4**

## Passo 5 - Criar ShellScript para enviar as notificações
> O que faremos aqui nada mais é do que um arquivo **.sh** que faz uma requisição para a api do **OneSignal** enviando Título e uma Descrição para nossa notificação que vamos receber no aplicativo que acabamos de instalar.
- Dentro de qualquer pasta do seu Terminal crie o arquivo digitando os comandos.
```bash
touch send-notification.sh
```
- Agora vamos dar permissão de execução para o arquivo.
```bash
chmod +x send-notification.sh
```
- Agora podemos executar nosso script dessa forma, porém ele não vai fazer nada pois não escrevemos nada nele ainda.
```bash
./send-notification.sh
```
- Abra o arquivo **send-notification.sh** com o editor de texto de sua preferência no meu caso sempre uso o [vim](https://www.vim.org/) para edições rápidas de texto.
- Dentro do arquivo começamos a escrever nosso script que será interpretado pelo **bash** do linux.
```bash
 #!/bin/bash

ONE_SIGNAL_API_TOKEN="one_signal_api_token"
APP_ID="seu_app_id" # O mesmo app_id que você colocou dentro do index.js no app.
MESSAGE_TITLE="$1" # Titulo recebido como 1º por parametro
MESSAGE_DESCRIPTION="$2" # Descrição recebida como 2º parametro

curl --include \
     --request POST \
     --header "Content-Type: application/json; charset=utf-8" \
     --header "Authorization: Basic $ONE_SIGNAL_API_TOKEN" \
     --data-binary "{\"app_id\": \"$APP_ID\",
\"contents\": {\"en\": \"$MESSAGE_DESCRIPTION\"},
\"headings\": {\"en\": \"$MESSAGE_TITLE\"},
\"included_segments\": [\"Subscribed Users\"]}" \
     https://onesignal.com/api/v1/notifications
```
- Pronto, agora para funcionar realmente só precisamos do token da api do **OneSignal**.
- Volte para a página do OneSignal na Web entre no seu aplicativo que foi configurado vá em **Settings**.
- Depois em **Keys & IDs** e copie o valor de **Rest API Key**.
- Agora dentro do nosso script troque **one_signal_api_token** por sua **Rest API Key**.
- Agora vamos fazer nosso primeiro teste.
```bash
./send-notification.sh "Titulo da Notificação" "Descrição da Notificação"
```
Se a notificação chegou no seu celular está tudo certo e você está pronto para usar o App parabéns!!
