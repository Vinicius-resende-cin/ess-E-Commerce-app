import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/common/global-types';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}
  
  /* Lista de todas as categorias */
  categorias: Categoria[] = [];

  /* Chama a função getCategorias quando a página abre para listar todas as categorias */
  ngOnInit(): void {
    this.getCategorias();
  }

  /* Altera a página para a página de criação de uma nova categoria */
  criarCategoria(): void {
    this.router.navigate(['home', 'criacao-nova-categoria']);
  }

  /* Altera a página para a página de edição de uma categoria, e salva as 
    informações da categoria selecionada para poder exibir durante a edição */
  editarCategoria(id: String, descricao: String): void {
    this.categoriaService.setInfo(id, descricao);
    this.router.navigate(['home', 'categoria', id]);
  }

  /* Dá um GET das categorias no servidor e armazena elas 
    na lista de categorias, para ser exibida na página */
  getCategorias(): void {
    this.categoriaService.getCategories().subscribe((data) => {
      this.categorias = data as Categoria[];
    });
  }
}
