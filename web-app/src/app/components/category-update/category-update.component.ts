import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';

import { Categoria } from 'src/app/common/global-types';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss'],
})
export class CategoryUpdateComponent {
  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  categoria: Categoria = {
    nome_categoria: this.categoriaService.getName(),
    descricao_categoria: this.categoriaService.getDescription(),
  };
  alertCategoria: boolean = false;
  alertMessage: string = '';

  editCategoria(categoria: Categoria) {
    this.categoriaService
      .editCategory(categoria.nome_categoria, categoria.descricao_categoria)
      .subscribe(
        (categoriaEditada) => {
          this.alertMessage = 'Descrição alterada com sucesso';
          this.alertCategoria = true;
          this.clearCategoria();
        },
        (erro) => {
          if (erro.error.message === 'Mesma descricao') {
            this.alertMessage = 'Descrição não pode ser a mesma';
            this.alertCategoria = true;
          } else if (erro.error.message === "Categoria inexistente") {
            this.alertMessage = 'Categoria não existe';
            this.alertCategoria = true;
          }
        }
      );
  }

  sairDaCriacao() {
    this.router.navigate(['home', 'categoria']);
  }

  clearCategoria(): void {
    this.categoria.descricao_categoria = '';
  }

  clearErros(): void {
    this.alertCategoria = false;
  }
}
