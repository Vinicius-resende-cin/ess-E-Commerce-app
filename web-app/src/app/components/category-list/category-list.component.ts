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

  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.getCategorias();
  }

  criarCategoria() {
    this.router.navigate(['home', 'criacao-nova-categoria']);
  }

  editarCategoria(id: String, descricao: String) {
    this.categoriaService.setInfo(id, descricao);
    this.router.navigate(['home', 'categoria', id]);
  }

  getCategorias(): void {
    this.categoriaService.getCategories().subscribe((data) => {
      this.categorias = data as Categoria[];
    });
  }
}
