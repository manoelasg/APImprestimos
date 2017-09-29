# APImprestimos
Exercício Mastertech: Sistema back-end de empréstimos P2P disponibilizado através de API

Grupo: Alex Monteiro, Felipe Sardim e Manoela Silverio

Funcionalidades do MVP:

1) Cadastro de clientes
Essa função cadastra os clientes no banco de dados.

Input:"Nome" (Required), "email" (Required), "senha"(sem hash) (Required) e "data_nascimento" (Required)
Output: "Nome", "email", "senha"(com hash), "data_nascimento", "_id" e "saldo"

2) Login
Essa função faz o login do usuário já cadastrado no sistema

Input:"email" (Required) e "senha"(sem hash) (Required)
Output: "_id", "Nome", "email", "senha"(com hash), "data_nascimento",  e "saldo"

3) Listagem de membros do site só para membros logados (credores e tomadores de crédito) - Apenas para funcionários logados

3.1) Listar Tomadores de Crédito (Listar usuários que estão tomando crédito emprestado e esta sujeito ao pagamento de juros)
Output: "_id", "Nome", "email", "senha"(com hash), "data_nascimento",  e "saldo" (sempre negativo)

3.2) Listar de Credores (Listar usuários que estão colocando valores para render juros)
Output: "_id", "Nome", "email", "senha"(com hash), "data_nascimento",  e "saldo" (sempre positivo)

3.3) Listar todos os usuários cadastrados (Credores ou tomadores de créditos)
Output: "_id", "Nome", "email", "senha"(com hash), "data_nascimento",  e "saldo" (positivo ou negativo)
    
4) Participar de algum dos grupos (cadastrar interesse em tomar ou ceder crédito) - Apenas para funcionários logados

Input:"valor" (Required) e "papel"("credor" / "tomador de crédito") (Required)
Output: "_id", "Nome", "email", "senha"(com hash), "data_nascimento",  e "saldo" (atualizado)
