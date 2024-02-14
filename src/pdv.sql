create database pdv;

create table categorias (
id serial primary key,
descricao text not null
);

create table usuarios (
id serial primary key,
nome varchar(50) not null,
email varchar(50) unique not null,
senha text not null
);

insert into categorias
(descricao) values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

create table produtos (
id serial primary key,
descricao text not null,
quantidade_estoque integer not null,
valor integer not null,
categoria_id integer not null references categorias(id)
);

create table clientes (
id serial primary key,
nome varchar(50) not null,
email varchar(50) unique not null,
cpf varchar(11) unique not null,
cep varchar(8),
rua varchar(50),
numero varchar(50),
bairro varchar(50),
cidade varchar(50),
estado varchar(50)
);

create table pedidos (
id serial primary key,
cliente_id integer not null references clientes(id),
observacao text,
valor_total integer
);

create table pedido_produtos (
id serial primary key,
pedido_id integer not null references pedidos(id),
produto_id integer not null references produtos(id),
quantidade_produto integer,
valor_produto integer
);

ALTER TABLE produtos
ADD COLUMN produto_imagem text;