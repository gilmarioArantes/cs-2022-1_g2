### cs-2022-1_g2
Repositório definido para a manutenção do controle de versão dos artefatos gerados pelo **Grupo 2** na construção de uma API REST, durante o curso da disciplina **Construção de Software**, do quinto período do curso de **Engenharia de Software**, do **INF/UFG**, no semestre 2022/1.

### Descrição do Produto: API para o gerenciamento de academias, na qual seria possível ter perfis de aluno (visualizar treinos), professor (cadastrar treinos, vincular treinos aos alunos) e administrador (visualizar treinos, professores, alunos, fazer edições gerais).

#### Requisitos:
1. Requisito/funcionalidade: autenticação e cadastro de professor (como administrador)
2. Requisito/funcionalidade: cadastrar aluno (como administrador)
3. Requisito/funcionalidade: cadastrar exercícios (como professor) 
4. Requisito/funcionalidade: associação de treino (exercícios, dia de realização e aluno) (como professor)
5. Requisito/funcionalidade: acesso ao treino (como aluno)

### Tecnologia empregada no desenvolvimento:

### Linguagem: .NET 6

### Banco de Dados: PostgreSQL

### Local de deploy: AWS

### Execucação aplicação:
- Modo desenvolvimento: `docker-compose up -d` **(será iniciado apenas o container do PostgreSQL)**
- Modo staging: `docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d` **(será iniciado o container da aplicação e do PostgreSQL)**

### Login aplicação como admin:

- Utilizar endpoint `/Autenticacao/autenticar` com o body:

```json
{
  "email": "admin@ufg.br",
  "senha": "admin@UFG123"
}
```

### Participantes:
|#|Nome|Usuário|Papel|
|---|---|---|---|
|1|ALEXANDRE WAGNER CARDOSO RODRIGUES|[awagcr](https://github.com/awagcr)||
|2|JOÃO VICTOR ROSA COUTO E SILVA|[JvRosa](https://github.com/JvRosa)||
|3|LUCA BACCHESCHI BENETTI|[lucabenetti](https://github.com/lucabenetti)|Líder|
|4|MATHEUS DE MOURA ROSA|[ItsMatt1](https://github.com/ItsMatt1)||
|5|VITOR HENRIQUE FERREIRA DE BRITO|[vitorhenrique-ufg](https://github.com/vitorhenrique-ufg)||


### Cronograma:
|Sprint|Atividade|Responsável|Início|Fim|Situação|Avaliação|
|---|---|---|---|---|---|---|
|1|Formação de Grupos. Definição de Temas|Equipe|03/06/2022|17/06/2022|Concluída|22/06/2022|
|2|Implementação do Requisito 01|Equipe|18/06/2022|01/07/2022|Concluída|06/07/2022|
|3|Implementação do Requisito 02|Equipe|02/07/2022|15/07/2022|Concluída|20/07/2022|
|4|Implementação do Requisito 03|Equipe|16/07/2022|29/07/2022|Em Andamento|03/08/2022|
|5|Implementação do Requisito 04|Equipe|30/07/2022|12/08/2022|A fazer|17/08/2022|
|6|Implementação do Requisito 05|Equipe|13/08/2022|26/08/2022|A fazer|31/08/2022|
