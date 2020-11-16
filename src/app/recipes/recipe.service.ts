import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  constructor(private shoppingService: ShoppingListService) { };
  recipesChanged = new Subject<Recipe[]>();

  /*
  private recipes: Recipe[] = [
    new Recipe(
      'Recipe #1',
      'This is a test for the first recipe',
      'https://usamin.info/img/cards/300111.png',
      [
        new Ingredient('Mika', 1),
        new Ingredient('Imouto', 1),
        new Ingredient('Gyaru', 2)
      ]
    ),
    new Recipe(
      'Recipe #2',
      'This is a desc for recipe # 2',
      'https://usamin.info/img/cards/300279.png',
      [
        new Ingredient('Mika', 1),
        new Ingredient('Night Sky', 1),
        new Ingredient('Gyaru', 1)
      ]
    ),
    new Recipe(
      'Recipe #3',
      'This is the third recipe',
      'https://usamin.info/img/cards/300537.png',
      [
        new Ingredient('Mika', 1),
        new Ingredient('Swim Suits', 3),
        new Ingredient('Gyaru', 3)
      ]
    )
  ];
  */

  private recipes: Recipe[] = [];

  getRecipes(): Recipe[] {
    // return a copy of the array
    return this.recipes.slice();
  }

  addRecipeIngredientsToShoppingList(ingredients: Ingredient[]): void {
    ingredients.forEach(
      (ingredient) => {
        this.shoppingService.addIngredient(ingredient);
      });
  }

  getRecipeByIndex(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  };
}
