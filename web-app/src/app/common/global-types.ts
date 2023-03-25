export type Pedido = {
  id_pedido: String;
  id_produto: String;
  data_hora: Date;
  valor: number;
};

export type Categoria = {
  nome_categoria: String;
  descricao_categoria: String;
};