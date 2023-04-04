import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';

import { Categoria } from 'src/app/common/global-types';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.scss'],
})
//export class CategoryCreationComponent implements OnInit {
export class CategoryCreationComponent {
  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  categoria: Categoria = {
    nome_categoria: '',
    descricao_categoria: '',
  };
  categorias: Categoria[] = [];
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
            console.log(novaCategoria);
            this.alertMessage = 'Categoria criada com sucesso';
            this.alertCategoria = true;
            this.clearCategoria();
          },
          (erro) => {
            if (erro.error.message === 'A categoria precisa de um nome') {
              this.alertMessage = 'Nome necessário';
              this.alertCategoria = true;
            } else if (
              erro.error.message === 'Já existe uma Categoria com esse nome'
            ) {
              this.alertMessage = 'Categoria existente';
              this.alertCategoria = true;
            } else {
              this.alertMessage = 'Erro ao criar categoria';
              this.alertCategoria = true;
            }
          }
        );
    }
  }

  sairDaCriacao() {
    this.router.navigate(['home', 'categoria']);
  }

  clearCategoria(): void {
    this.categoria.nome_categoria = '';
    this.categoria.descricao_categoria = '';
  }

  cloneCategoria(categoria: Categoria): Categoria {
    return Object.assign({}, categoria);
  }

  clearErros(): void {
    this.alertCategoria = false;
  }
}
