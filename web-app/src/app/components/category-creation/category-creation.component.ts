import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Categoria } from 'src/app/common/global-types';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.scss'],
})
export class CategoryCreationComponent {
  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  categoria: Categoria = {
    nome_categoria: '',
    descricao_categoria: '',
  };
  alertCategoria: boolean = false;
  alertMessage: string = '';

  createCategoria(categoria: Categoria) {
    if (!categoria.nome_categoria || categoria.nome_categoria.trim() === '') {
      this.alertMessage = 'Nome necessário';
      this.alertCategoria = true;
    } else {
      this.categoriaService
        .createCategory(categoria.nome_categoria, categoria.descricao_categoria)
        .subscribe(
          (novaCategoria) => {
            this.alertMessage = 'Categoria criada com sucesso';
            this.alertCategoria = true;
          },
          (erro) => {
            if (erro.error.message === 'A categoria precisa de um nome') {
              this.alertMessage = 'Nome necessário';
            } else if (erro.error.message === 'Já existe uma Categoria com esse nome') {
              this.alertMessage = 'Categoria já existe';
            } else {
              this.alertMessage = 'Erro ao criar categoria';
            }
            this.alertCategoria = true;
          }
        );
    }
  }

  sairDaCriacao() {
    this.router.navigate(['home', 'categoria']);
  }
}
