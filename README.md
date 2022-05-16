 <h1 align="center">Condominio Dev</h1>
 
 


<h2>Banco de dados</h2>
<h4>Gerando banco de dados</h4>
Para gerar o banco de dados, primeiramente deve-se renomear o arquivo <mark><b>.env.sample</b></mark> para <mark><b>.env</b></mark> e alterar os dados:

```bash
DATABASE_URL=postgres://<user>:<password>@localhost:<port>/<db_name>
```
Com os dados alterados, basta executar o comando abaixo em seu terminal:
```bash
yarn sequelize db:create
```

<h4>Gerando tabelas</h4>
Com o banco de dados gerado, podemos gerar as tabelas através das migrations com o comando:
```bash
yarn sequelize db:migrate
```
<hr>

<h4>Populando tabelas</h4>
Uma vez com as tabelas criadas, podemos fazer um preenchimento das mesmas:
```bash
yarn sequelize-cli db:seed:all
```
<hr>

<!-- <h2>End Points</h2>
<h4>Habitantes</h4>
<ul>
<li>
  <b>index</b> - Retorna todos os habitantes cadastrados no banco de dados

```bash
http://localhost:3333/hab/habitantes
```
</li>
<li></li>
<li></li>
<li></li>
</ul>
<h4>Condominio</h4>
<hr>
 -->
 <h4>Modelagem Física</h4>
 <p>Criação da tabela Habitantes</p>

 
```bash
 CREATE TABLE habitantes (
	id serial4 NOT NULL,
	nome varchar(255) NOT NULL,
	sobrenome varchar(255) NOT NULL,
	data_nascimento date NOT NULL,
	renda int4 NOT NULL,
	cpf varchar(11) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT habitantes_cpf_key UNIQUE (cpf),
	CONSTRAINT habitantes_pkey PRIMARY KEY (id)
);
```

<p>Criação da tabela despesas</p>

```bash
CREATE TABLE despesas (
	id serial4 NOT NULL,
	mes int4 NOT NULL,
	ano int4 NOT NULL,
	agua float8 NULL,
	luz float8 NOT NULL,
	reserva float8 NULL,
	adm float8 NULL,
	extra float8 NULL,
	total float8 NULL,
	caixa float8 NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT despesas_pkey PRIMARY KEY (id)
);
```
