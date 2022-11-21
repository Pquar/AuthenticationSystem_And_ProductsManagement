
# Aplicacação de Autencição e Cadastro de produtos

Esse projeto foi usado para meu projeto integrador (conclusão de curso) em **Sistemas para Internet**, consiste em:

- Sistema de Autenticação.
  - Login.
  - Cadastro.
  - Autenticação com JWT e entrega do token.
- Sistema de Cadastro de produtos e seu armazenamento .
  - Armazenamento de produtos.
  - Cadastro de produtos.
  - Deletar um produto.
  - Mostragem de produtos e produto.

- Armazenamento de Ordens de compra.
  - Armazenamento da Ordens.

## Stack utilizada

**Back-end:** Node(16.17), Express (4.18.2), Bcryptjs 2.4.3, fs (0.0.1-security), Jsonwebtoken (8.5.1), Mongoose(6.7.2), Nodemailer(6.8.0), Nodemailer-express-handlebars(5.0.0), Path(0.12.7).
## Screenshots dos Testes
Foi Ultilizado o Insomnia para o teste de resquições http.

![image](https://user-images.githubusercontent.com/66132307/203149397-b2a46cd4-cee4-4a34-b3fd-69c230526fa4.png)

## Aprendizados

Este projeto obtive a oportunidade de aprender e execitar o uso de tecnologias como:
- A ultilização e criação de tokens JWT.
- Criação e uso de rotas autenticadas
- Criação de um sistema de Login e Senha.
- Armazenamento de Senha Encriptadas.
- Uso de Banco de dados não Relacional MONGO_DB.
- Ultilização de Rotas Http e criações de metodos POST, GET, DELT.
## Instalação & Depenciais

Clone este projecto e entre na pasta backend_1

Para rodar, ultilize na raiz da pasta backend_1 o comando: 
```bash
  node src/index/js
```
Este comando rodara o projeto com node.js na porta http://localhost:8000/

A mesma porta que e usado no FRONT-End feita para este projeto para consumir os dados.

Para rodas esta aplicação precisa ter instalado o NODEjs, a versão ultilizada foi 16.17.0.
    
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu um diretorio chamado config dentro da de src.
![image](https://user-images.githubusercontent.com/66132307/203164904-e6d30874-d4f1-44ef-922f-3749e0ff4f03.png)

backend_1/src/config
- auth.json
secret para gerar tokenJWT unico.

`
{
    "secret": "ColoqueUmSenhaQueSeraUsadaComoSecretEmSuaParaEncriptarSeuTokenJWT"
}
`
- mail.json
`{
    "host": "xxxx",
    "port": "xxxx",
    "user" : "xxxxxxx",
    "pass": "xxxx"
}`

mail.json, este arquivo serve para configurar o ambiente para receber os emails para recuperação de senha via SMTP service(https://mailtrap.io/home),


## Documentação da API

#### ProductController
Base_url: http://localhost:8000/

| Metodo    | Base_url             | Descrição                           |
| :---------- | :---------           | :---------------------------------- |
| `GET`       | `/products`          | Lista de todos os produtos     |
| `GET`       | `/products/byId`     | Retorna o produto pelo Id   |
| `POST`      | `/products`          | **Autenticação Obrigatória**. Cadastra o produto     |
| `DEL`       | ` /products/byId`    | **Autenticação Obrigatória**. Remove um produto pelo Id     |

#### OrderController
| Metodo    | Base_url             | Descrição                           |
| :---------- | :---------           | :---------------------------------- |
| `POST`      | `/order`          |  Registra a Ordem do products   |

#### AutenticaçãoController
| Metodo    | Base_url             | Descrição                           |
| :---------- | :---------           | :---------------------------------- |
| `POST`       | `/register`          | Regista um novo um usuario & retorna o um token **JWT**   |
| `POST`       | `/authenticate`     | Autenticação de usuario & retorna o um token **JWT**  |
| `POST`      | `/forgot_password`          |  Envia um email com um token para recuperação|
| `POST`       | ` /reset_password`    |   Reset de senha com o token recebito no email  |



## Feedback

Se você tiver algum feedback, por favor o deixe por meio de email clon@outlook.com.br ou atraves do meu [Linkedin](https://www.linkedin.com/in/cleiton-araujo-moura/)


## Autor

- [Cleiton Araujo Moura](https://www.github.com/pquar)

