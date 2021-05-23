import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Category } from 'src/app/module/category';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public convidat: boolean = true;
  public logged: boolean;
  public rol: string;
  private _categories: Category[];
  public catFilter: Category[];

  constructor(private router: Router, private categoriesService: CategoriesService, private menu: MenuController) {
    this.categoriesService.getParents(0);

    this.categoriesService.categories.subscribe(
      (originalCategory: Category[]) => {
        this._categories = originalCategory;
        this.filterByCategory('0');
      }
    );
  }

  ngOnInit(): void {
  }

  filterByCategory(categoryId){
    this.catFilter = this.categories.filter(category => category.parentId == categoryId)
  }

  get categories(): Category[] {
    return this._categories;
  }

}
