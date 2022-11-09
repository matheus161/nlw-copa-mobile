## Anotações

Primeiro foi criado o arquivo com o comando:

npx create-expo-aoo <name>

Depois foi alterado o Arquivo App.js para App.tsx e foi compilado com o comando

npx start expo

## Instalando o NativeBase

npm install native-base

expo install react-native-svg@12.1.1

## Garantir a versão do React

- Adicione a propriedade "overrides" no package.json

## Intalando fonts personalizada

npx expo install expo-font @expo-google-fonts/roboto

## Login do Google

1. Cadastrar nossa aplicação nos servidores do Google para que ele possa reconhecer qual dispositivo está acessando.
2. O usuário solicita a autenticação nos servidores do Google, nesse momento é redirecionado para o seu navegador.
3. Ao ser autenticado, precisamos fazer um "redirect Deep Link" para que ele possa voltar a nossa aplicação com o token de login que o Google forneceu, contendo as informações do usuário.

npx expo install expo-auth-session expo-random

npx expo install expo-web-browser

## Para se autenticar com a conta expo

npx expo login

## React Navigation

Permite que possa fazer a navegação por pilhas ou por botões

https://reactnavigation.org/docs/getting-started

npm install @react-navigation/bottom-tabs

## Biblioteca para ajustar o formato da hora

npm install dayjs

## Instalando o dotenv

npm i dotenv babel-plugin-inline-dotenv
