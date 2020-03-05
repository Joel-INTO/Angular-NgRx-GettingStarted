import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { Injectable } from '@angular/core';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

    constructor (
        private actions$: Actions,
        private productService: ProductService,
    ) { }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.LoadProducts),
        mergeMap(action => this.productService.getProducts().pipe(
            map(products => new productActions.LoadProductsSuccess(products)),
            catchError(err => of(new productActions.LoadProductsFail(err))),
        )),
    );
}
