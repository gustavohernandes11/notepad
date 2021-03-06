# Notepad
## Sobre
Com essa aplicação, cada usuário pode se cadastrar no banco de dados (criptografado) e acessar a suas anotações em um banco de dados. Usuários admin têm acesso ao painel de administração, onde podem sobrescrever alguns dados simples de usuários, como o apelido e email. 


## Componentes
### Cadastro de usuário:

 Opção de troca entre o componente de login e logout. A validação do formulário acontece no backend.
 
 
![notepadLogin](https://user-images.githubusercontent.com/66632840/166263165-189962ab-859b-40a1-bef9-1a5259931372.png)

<hr >

### Página home da aplicação.
![notepadHome](https://user-images.githubusercontent.com/66632840/166263076-1860320f-61bd-49f2-ad80-3bdeb733235c.png)

<hr >

Possui um menu de categorias e um espaço para as anotações salvas. À direita existe um menu de edição dinâmico que pode ser acessado ao acionar o botão do canto superior direito da tela ou o card de 'adicionar nota':


### Quando não há anotações na categoria:
![notepadAddNoteCard](https://user-images.githubusercontent.com/66632840/166265007-9a8e4065-c1bf-4ff9-b52e-bc6d473fbe74.png)

<hr >

#### Menu de edição ou adição:
![EditMenu](https://user-images.githubusercontent.com/66632840/166266617-8ec88f55-33cf-4068-aee9-9afa077433b1.png)


### Página de administração

 Quando a o usuário for admin haverá uma opção de navegação no header para a página de administração do sistema:

 Aqui podemos vizualizar os usuários cadastradas e seus dados **não sensíveis**
 
 
![notepadAdmin](https://user-images.githubusercontent.com/66632840/166263136-cf1f183e-af3b-4b02-8d5d-2c3c6f3b0889.png)

<hr >
No banco de dados as senhas são corretamente criptografadas: 

![notepadPassword](https://user-images.githubusercontent.com/66632840/166270434-e152ac94-cd12-4c89-bd51-c7773cfade3a.png)


## Aprendizado
Aprendi muito sobre validação de dados e requisições, tokens de usuários, e lógica de banco de dados. E, sobretudo, conheci bastante sobre o Vuejs.
