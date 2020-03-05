import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Subject, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

/** NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.State>,
  ) { }

  ngOnInit(): void {
    // TODO: unsubscribe
    this.store.pipe(
      select(fromProduct.getCurrentProduct),
    ).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: (err: any) => this.errorMessage = err.error
    // });

    this.store.dispatch(new productActions.LoadProducts());
    // this.store.pipe(effe
    //   select(fromProduct.getProducts),
    //   takeUntil(this.ngUnsubscribe),
    // ).subscribe(products => this.products = products);

    this.products$ = this.store.pipe(
      select(fromProduct.getProducts),
    );

    this.errorMessage$ = this.store.pipe(
      select(fromProduct.getError),
    );

    // TODO: Unsubscribe
    this.store.pipe(
      select(fromProduct.getShowProductCode)
    ).subscribe(showProductCode => this.displayCode = showProductCode);

  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
