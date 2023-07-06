# Cadastro de reservas de hotel

## Tecnologias Utilizadas

- React
- Typescript
- SCSS

## Como Utilizar

1. Acesse o aplicativo hospedado em [https://link](https://link).
2. Clique em Nova reserva.
3. Preencha todos os campos com os dados da reserva.
4. Clique em Fazer reserva.
5. Se não estiver faltando preencher nenhum campo a reserva é cadastrada.
6. No menu dashboard mostra todas as reservas cadastradas
7. Você pode pesquisar o registro na barra de pesquisa por nome, acomodação e data.
8. Filtros de ordenação por nome, acomodação e check-in.
9. Clicando no icone "..." no ID ou na imagem da reserva irá abrir uma janela modal
com as informações da reserva.
10. Na janela modal mostra os detalhes da reserva com 3 botões logo abaixo.
11. você pode fechar a janela modal ou excluir/editar o registro.

## Funcionalidades
- Adicionar, editar e remover registros.
- Filtro por acomodação, nome e check-in.
- Barra de pesquisa para pesquisar por nome, acomodação e data.
- Consulta do cep com a API do viacep para buscar endereços.
- Validação do formulario e mascara nos inputs.
- Todos os dados são salvos no Localstorage.

## Componentes
O projeto é composto pelos seguintes componentes:

<details>
  <summary style="color: blue;">Aside</summary>
  Componente do menu lateral que navega entre o dashboard e novas reservas.
  ao clicar no link ele pega o window.location.pathname e passa para um state p/ que o menu clicado fique selecionado.
</details>

<details>
<summary style="color: blue;">NavBar</summary>
Componente do menu de navegação contem a logo, alguns botões que estão sem funcionalidade por hora e um painel de login apenas visual com um menu dropDown para deslogar o usuario.
</details>

<details>
  <summary><span style="color: blue;">SearchBooking</span></summary>
Componente que faz a busca de registros por nome, acomodação e data recebe como prop a função handleSearch que busca o valor digitado nas propriedades dos objetos dentro do array.
</details>

<details>
  <summary><span style="color: blue;">Bookings</span></summary>
  Componente que tem os botões de filtrar por acomodação, nome e check-in, utilizando a funcao sortData que utiliza .sort para comparar os itens do array e filtrar baseado na condição selecionada.
  Tambem recebe 'data' como prop que é o state que armazena os registros, é feito um map e retorna o componente Booking com o objeto criado.
</details>

<details>
  <summary><span style="color: blue;">Booking</span></summary>
  Componente que renderiza cada objeto que é adicionado no array, tem a funcionalidade de mostrar a janela modal, formatar a data e hora, e mapeia as imagens das acomodações para a tag 'select'.
</details>

<details>
  <summary><span style="color: blue;">Forms</span></summary>
  Componente que renderiza os formularios para preenchimento da reserva, faz a requisição para a API do viacep com o numero do cep p/ preencher os dados de endereço, validação do cpf, e mascara de campos utilizando 'react-input-mask' e validação do formulario, na qual o usuario não consegue enviar o formulario com campos em branco.
</details>

<details>
  <summary><span style="color: blue;">Modal</span></summary>
Componente que mostra detalhes da reserva, e possui os botões para deletar ou editar o usuario,
para deletar o usuario coloquei uma janela de confirmação.
</details>

## Desenvolvimento

Se você deseja executar o projeto localmente e realizar alterações, siga as etapas abaixo:

1. Clone este repositório em sua máquina local usando o seguinte comando:

```shell
git clone https://github.com/seu-usuario/teste-front-end.git
```

2. Acesse o diretório do projeto:

```shell
cd app-teste-front-end
```

3. Instale as dependências do projeto:

```shell
npm install / yarn install
```

4. Inicie o servidor de desenvolvimento:

```shell
npm run dev / yarn run dev
```

5. Abra seu navegador e acesse seu localHost para visualizar o aplicativo em execução.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema no aplicativo ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue.

## Autor

João Paulo
Licença

Contato
Caso tenha alguma dúvida ou sugestão sobre este projeto, sinta-se à vontade para entrar em contato através do seguinte email: jpgoncalves021@gmail.com.