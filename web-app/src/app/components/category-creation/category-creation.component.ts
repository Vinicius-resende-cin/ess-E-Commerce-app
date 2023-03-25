import { Component, OnInit  } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

import { Categoria } from 'src/app/common/global-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.scss']
})
//export class CategoryCreationComponent implements OnInit {
export class CategoryCreationComponent{
  categoria: Categoria = {
    nome_categoria: "",
    descricao_categoria: ""
  };
  categorias: Categoria[] = [];
  categoriaDuplicada: boolean = false;
  nomeInvalido: boolean = false;

  //constructor(private categoryService: CategoryService) {}

  /*createCategoria(categoria: Categoria): void {
    this.categoryService.createCategory(categoria)
      .subscribe(
        categoriaRetornada => {
          if (categoriaRetornada) {
            this.categorias.push(categoriaRetornada);
            this.categoria.nome_categoria = "";
            this.categoria.descricao_categoria = "";
          } else {
            this.categoriaDuplicada = true;
          } 
        },
        msg => { alert(msg.message); }
      );
  }*/

  createCategoria(categoria: Categoria): void {
    if (!(this.categorias.find(ctg => ctg.nome_categoria === categoria.nome_categoria))) {
      if (categoria.nome_categoria != "") {
        this.categorias.push(this.cloneCategoria(categoria));
        this.clear_categoria();
      }
      else {
        this.nomeInvalido = true;
      }
    }
    else {
      this.categoriaDuplicada = true;
    }
  }

  /*ngOnInit(): void {
    this.categoryService.getCategories()
          .subscribe(
            catg => { this.categorias = catg; },
            msg => { alert(msg.message); }
           );
  }*/

  onMove(): void {
    this.categoriaDuplicada = false;
    this.nomeInvalido = false;
  }

  clear_categoria(): void {
   this.categoria.nome_categoria = "";
   this.categoria.descricao_categoria = "";
  }

  cloneCategoria(categoria: Categoria): Categoria {
    return Object.assign({}, categoria);
  }
}
