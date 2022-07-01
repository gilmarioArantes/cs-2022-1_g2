<div align=center>
  <img src="./imagens/logo.jpg">
</div>


<div align="center">Titulo</div>
<div align="center">Subtitulo</div>

## Histórico
|**Versão**|**Data**|**Alteração no Documento**|**Autor**|
|------|----|---------|-----|
|1.0|<29/06/2022>|<29/06/2022>|< Matheus de Moura Rosa >|


**Como:** Administrador do sistema de gerenciamento de academias

**Eu quero**: ser capaz de conduzir e administrar os usuários da academia, como professores e alunos.

**Para**: Para criar regras de organização e manutenção do négocio.

**Cenário 1**: Autenticação como admin.

**Dado**: Que eu tenha o usuário e senha de um administrador.

**E**: esteja na página principal;

**Quando**: eu acessar o sistema;

**E**: informar o meu login e minha senha;

**E**: clicar sobre o botão confirmar;

**Então**: o sistema deve permitir minha autenticação como administrador;

**Cenário 2**: Cadastrar um professor como administrador

**Dado**: que eu esteja autenticado como administrador;

**E**: esteja na página de cadastro de professor;

**Quando**: eu inserir os dados do professor de usuário e senha;

**E**: alterar suas permissões para administrador;

**E**: clicar sobre o botão confirmar;

**Então**: o sistema deve cadastrar o professor como admin;

**Cenário 3**: Atualização de professor como admin

**Dado**: que eu esteja autenticado como administrador;

**E**: esteja na página de professores cadastrados;

**Quando**: eu clicar para editar os dados de um professor;

**E**: clicar em confirmar;

**Cenário 4**: Remoção de professor como admin

**Dado**: que eu esteja autenticado como administrador;

**E**: esteja na página de professores cadastrados;

**Quando**: eu clicar em remover o professor;

**E**: clicar em confirmar;

**Cenário 5**: Listagem de professor como admin;

**Dado**: que eu esteja autenticado como administrador;

**E**: esteja na página de usuários;

**E**: eu clique no filtro de permissões de professores;

**E**: selecione “Admin”;

**Então**: o sistema deve listar todos os professores com privilégios de admin;

**Cenário 6**: Obter professor por id

**Dado**: que eu esteja autenticado como administrador;

**E**: esteja na página de usuários;

**E**: eu clique no filtro de ID de professores;

**Então**: o sistema deve listar todos os professores pelo id;

</DIV>