import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

/*
 * Instead of using providedIn, could add it in app.module.ts providers array
 *  
 */

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    // private ts creates a private property copy of http that is provided as the arg
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ng-course-recipe-65e4b.firebaseio.com/recipes.json', recipes).subscribe(response => {
            console.log(response)
        });
    }

    fetchRecipes() {
        return this.http.get('https://ng-course-recipe-65e4b.firebaseio.com/recipes.json')
        .pipe(
            map((recipes: Recipe[]) => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                }) 
            }),
            tap(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            )
        )
    }
}
