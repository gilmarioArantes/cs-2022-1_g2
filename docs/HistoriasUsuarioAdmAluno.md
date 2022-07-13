<div align=center>
  <img src="./imagens/logo.jpg">
</div>


<div align="center">Titulo</div>
<div align="center">Subtitulo</div>

## Histórico
|**Versão**|**Data**|**Alteração no Documento**|**Autor**|
|------|----|---------|-----|
|1.0|<13/07/2022>|<13/07/2022>|< João Victor Rosa Couto e Silva >|


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

**Cenário 2**: Cadastrar um aluno como administrador

**Dado**: que eu esteja autenticado como administrador;

**E**: esteja na página de cadastro de alunos;

**Quando**: eu inserir os dados do aluno de usuário e senha;

**E**: clicar sobre o botão confirmar;

**Então**: o sistema deve cadastrar o aluno;

**Cenário 3**: Atualização de aluno como admin

**Dado**: que eu esteja autenticado como administrador;

**E**: esteja na página de alunos cadastrados;

**Quando**: eu clicar para editar os dados de um aluno;

**E**: clicar em confirmar;

**Cenário 4**: Remoção de aluno como admin

**Dado**: que eu esteja autenticado como administrador;

**E**: esteja na página de alunos cadastrados;

**Quando**: eu clicar em remover o aluno;

**E**: clicar em confirmar;

**Cenário 5**: Listagem de aluno como admin;

**Dado**: que eu esteja autenticado como administrador;

**E**: esteja na página de usuários;

**E**: eu clique no filtro de buscas;

**E**: selecione “aluno”;

**Então**: o sistema deve listar todos os alunos;

**Cenário 6**: Obter aluno por id

**Dado**: que eu esteja autenticado como administrador;

**E**: esteja na página de usuários;

**E**: eu clique no filtro de ID de alunos;

**E**: eu insira o ID do aluno

**Então**: o sistema deve listar o aluno com o ID correspondente;

</DIV>