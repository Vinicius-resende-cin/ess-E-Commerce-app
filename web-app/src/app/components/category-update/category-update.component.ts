import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Categoria } from 'src/app/common/global-types';
import { CategoriaService } from 'src/app/services/categoria.service';

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

  editCategoria(categoria: Categoria): void {
    this.categoriaService
      .editCategory(categoria.nome_categoria, categoria.descricao_categoria)
      .subscribe(
        (categoriaEditada) => {
          this.alertMessage = 'Descrição alterada com sucesso';
          this.alertCategoria = true;
        },
        (erro) => {
          if (erro.error.message === 'Mesma descricao') {
            this.alertMessage = 'Descrição não pode ser a mesma';
          } else if (erro.error.message === "Categoria inexistente") {
            this.alertMessage = 'Categoria não existe';
          }
          this.alertCategoria = true;
        }
      );
  }

  sairDaCriacao(): void {
    this.router.navigate(['home', 'categoria']);
  }
}
