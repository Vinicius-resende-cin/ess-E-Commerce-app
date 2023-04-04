import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/common/global-types';
import { Observable } from 'rxjs';

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

  categoria: Categoria = {
    nome_categoria: '',
    descricao_categoria: '',
  };
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.getCategorias();
  }

  abrirCriacaoCategoria() {
    this.router.navigate(['home', 'criacao-nova-categoria']);
  }

  getCategorias(): void {
    this.categoriaService.getCategories().subscribe((data) => {
      this.categorias = data as Categoria[];
    });
  }
}
