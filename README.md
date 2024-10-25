# Inicializando a aplicação

## Sumário
- [1. Importante](#importante)
- [2. Requisitos](#requisitos)
- [3. Executando a aplicação](#executando-a-aplicação)
- [4. Melhorias futuras](#melhorias-futuras)
- [5. Considerações finais](#consideracoes-finais)

## 1. Importante
Para a aplicação "logic-back" se deve configurar a variável de ambiente CHAT_ID, o application.properties irá pegar automaticamene.\

O projeto "logic-font" precisa estar rodando na porta 3000 para que o cors, pois o projeto "logic-back" libera cors somente para porta 3000.

## 2. Requisitos
IDE para o Java.\
Docker para rodar o docker-compose.\
Node para iniciar o react.

## 3. Executando a Aplicação
1)Com o Docker já instalado, através do prompt ir na pasta onde está o "docker-compose.yml" e digitar o código "docker compose up -d" para subir o banco.\
2)Com a IDE de sua preferência iniciar o projeto "java-back" ele está configurado na versão 17 do java e na versão 3.3.5 do Spring Boot.\
3)Através do prompt ir na pasta "logic-front" e digitar "npm i" para instalar as dependências do projeto e em seguida "npm start" para inicializar o projeto.

## 4. Melhorias futuras
Muitas melhorias poderiam ainda ter sido feitas no código, como por exemplo:
1)Uma camada a mais no "logic-front" para lidar somente com a lógica.\
2)Para melhor segurança, utilizar jwt tokens para acessar as páginas e as entidades.\
3)Implantar um sistema de versionamento de banco de dados como o Liquibase ou o Flyway para otimizar alterações e migrações do banco.\
4)Um arquivo com os enums dos textos de cada tela para padronizar os textos e evitar erros futuros.\
5)Testes unitários tanto no React quanto no Java (comecei a fazer no Java, porém não consegui desenvolve-los bem e os removi para evitar possíveis erros).\
6)Tela de edição das conexões DIXOM existentes.\
7)Tela de edição de usuário.\
8)Melhorar o sistema de paginação das conexões DICOM para realizasse uma consulta por página ao invés de toda a consulta de uma única vez.\


## 5. Considerações finais
Gostaria de expressar a minha gratificação por ter desenvolvido esse projeto e por estar no processo de seleção para a vaga, apesar de ser um projeto 
aparentemente simples, me senti desafiado e foi muito bom ter esse desafio como experiência, agradeço novamente a oportunidade.
