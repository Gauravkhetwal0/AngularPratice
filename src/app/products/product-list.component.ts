import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { HostListener } from "@angular/core"; 

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = true;
  errorMessage = '';
  screenWidth: any;
  _listFilter = '';


  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService) { 
    
        this.getScreenSize();
  }



   @HostListener('window:resize', ['$event'])
    getScreenSize() {
          // this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          // console.log( this.screenWidth);
    }
  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // Checks both the product name and tags
  performFilter2(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        (product.tags && product.tags.some(tag => tag.toLocaleLowerCase().indexOf(filterBy) !== -1)));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  onChange(checkEvent:any){

    var className = document.getElementsByClassName('hide_Column');
    if(checkEvent.target.checked)
    {
      // console.log(className);
      for(let i = 0;i<className.length;i++)
      {
        className[i].classList.add("hide");
      }
      this.showImage = !this.showImage;
      
    }
    else{
      
      for(let i = 0;i<className.length;i++)
      {
        className[i].classList.remove("hide");
      }
      this.showImage = !this.showImage;
    }

  }


}
