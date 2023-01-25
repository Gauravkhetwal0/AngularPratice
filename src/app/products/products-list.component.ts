import { Component, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";


@Component({
    // selector: 'pm-products',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit, OnChanges,OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = "";
    
    sub!: Subscription;
    // listFilter: string = 'cart';

    //getter and setter for the filter 
    private _listFilter : string = '';

    get listFilter(): string{
        return this._listFilter;
    }

    set listFilter(value: string){
        this._listFilter = value;
        //console.log("In setter: ",value);
        this.filterProducts = this.performFilter(value);
    }

    //filter the product name

    filterProducts: IProduct[] = [];


    //IProduct is the interface which we used for the strong binding
    products: IProduct[]= [];

    constructor(private productService: ProductService){

    }



    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct)=>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    ngOnChanges(changes: SimpleChanges): void {
      console.log("ngOnChanges called!!")
      console.log(SimpleChange)
    }

    ngOnInit(): void {
      this.sub = this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filterProducts = this.products;
          
        },
        error: err=> this.errorMessage = err
      });
      // console.log("ngOnInit called!!")
      //   this.listFilter = 'cart';
    }

ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}