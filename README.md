# Inicializando a aplicação

## Sumário
- [1. Requisitos](#requisitos)
- [2. Executando a aplicação](#executando-a-aplicação)
- [3. Melhorias futuras](#melhorias-futuras)
- [4. Considerações finais](#consideracoes-finais)

## 1. Requisitos
IDE para o Java.\
Docker para rodar o docker-compose.\
Node para iniciar o react.

### **Importante:** Para a aplicação "logic-back" se deve configurar a variável de ambiente CHAT_ID o application.properties irá pegar automaticamene.

## 2. Executando a Aplicação
1)Com o Docker já instalado, através do prompt ir na pasta onde está o "docker-compose.yml" e digitar o código "docker compose up -d" para subir o banco.\
2)Com a IDE de sua preferência iniciar o projeto "java-back" ele está configurado na versão 17 do java e na versão 3.3.5 do Spring Boot.\
3)Através do prompt ir na pasta "logic-front" e digitar "npm i" para instalar as dependências do projeto e em seguida "npm start" para inicializar o projeto.

## 3. Melhorias futuras
Muitas melhorias poderiam ainda ter sido feitas no código, como por exemplo:
1)Uma camada a mais no "logic-front" para lidar somente com a lógica.\
2)Um arquivo com os enums dos textos de cada tela para padronizar os textos e evitar erros futuros.\
3)Testes unitários tanto no React quanto no Java (comecei a fazer no Java, porém não consegui desenvolve-los bem e os removi para evitar possíveis erros).\
4)Tela de edição das conexões DIXOM existentes.\
5)Tela de edição de usuário.

## 4. Considerações finais
Gostaria de expressar a minha gratificação por ter desenvolvido esse projeto e por estar no processo de seleção para a vaga, apesar de ser um projeto 
aparentemente simples, me senti desafiado e foi muito bom ter esse desafio como experiência, agradeço novamente a oportunidade.
