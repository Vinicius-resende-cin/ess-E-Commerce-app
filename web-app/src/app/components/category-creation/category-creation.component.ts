import { Component, OnInit  } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';

import { Categoria } from 'src/app/common/global-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.scss']
})
//export class CategoryCreationComponent implements OnInit {
export class CategoryCreationComponent{
  constructor(private categoriaService: CategoriaService) {}

  categoria: Categoria = {
    nome_categoria: "",
    descricao_categoria: ""
  };
  categorias: Categoria[] = [];
  categoriaDuplicada: boolean = false;
  nomeInvalido: boolean = false;
  alertMessage: string = "";

  createCategoria(categoria: Categoria): void {
    
    if (!(this.categorias.find(ctg => ctg.nome_categoria === categoria.nome_categoria))) {
      if (categoria.nome_categoria != "") {
        this.categoriaService.createCategory(categoria.nome_categoria, categoria.descricao_categoria);
        this.categorias.push(this.cloneCategoria(categoria));
        this.clear_categoria();
      }
      else {
        this.alertMessage = "ERRO, NOME NECESSÁRIO!!!";
        this.nomeInvalido = true;
      }
    }
    else {
      this.alertMessage = "ERRO, CATEGORIA JÁ EXISTE!!!";
      this.categoriaDuplicada = true;
    }
  }

  /*onMove(): void {
    this.clearErros();
  }*/

  clear_categoria(): void {
   this.categoria.nome_categoria = "";
   this.categoria.descricao_categoria = "";
  }

  cloneCategoria(categoria: Categoria): Categoria {
    return Object.assign({}, categoria);
  }

  clearErros(): void {
    this.categoriaDuplicada = false;
    this.nomeInvalido = false;
  }
}
