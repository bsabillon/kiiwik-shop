import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public cartItems!: number;
  
  constructor(
    private dataApi: ProductsService,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private _snackBar: MatSnackBar,
    ) { }
  public  products: any = [];
  public store: any =[];
  public havePhoto: boolean =false;
  public storeDomain="mitienda";
  breakpoint: any;
  public searchText = '';
  control: FormControl = new FormControl('');
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ngOnInit() {
      this.getProducts();
      
      this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
    }
  
    getProducts(){
      this.dataApi.getProducts(this.storeDomain).subscribe(store=>{
        this.store=store;
        this.products= this.store.products;
        this.products.forEach((product: { qtd: number; }) => {
          product.qtd = 1;
        });
        console.log(this.products);
      })
    }
  
    navigate(url: any, event: { toggle: () => void; } | null) {
      if (event != null) {
        event.toggle();
      }
      this.router.navigate([`${url}`])
    }
    
    onResize(event: any) {
      this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
    }
 
    checkPhoto(product: any){
      if(product.photoURL==""){
        product.photoURL="https://firebasestorage.googleapis.com/v0/b/inventorygp-3f83c.appspot.com/o/product.png?alt=media&token=6fe41bd2-67ee-4ac1-bcc9-027eec471f42"
      }
    }

    countCartItems() {
      var orderArrayCart = JSON.parse(localStorage.getItem('orderCart')|| '{}');
      console.log(orderArrayCart);
      if (orderArrayCart != null) {
        this.cartItems = orderArrayCart.length;
        console.log(this.cartItems);
      }
    }

    saveToCart(order: any) {
      var orderArrayCart = JSON.parse(localStorage.getItem('orderCart')|| '{}');
      console.log(orderArrayCart);
      if (orderArrayCart == null) {
        const orderArray = [];
        orderArray.push(order);
        localStorage.setItem('orderCart', JSON.stringify(orderArray));
        this.countCartItems();
      } else {
        
        const filter1 = orderArrayCart.filter((x: any ) => x.id == order.id);
        if (filter1.length === 0) {
          const orderArray = orderArrayCart;
          orderArray.push(order);
          localStorage.setItem('orderCart', JSON.stringify(orderArray));
          this.countCartItems();
        } else {
          filter1[0].qtd = filter1[0].qtd + order.qtd;
          const filter2 = orderArrayCart.filter((x:  any) => x.id != order.id);
          filter2.push(filter1[0]);
          const orderArray = filter2;
          localStorage.setItem('orderCart', JSON.stringify(orderArray));
          this.countCartItems();
        }
      }
      this.openSnackBar('¡Producto agregado al carrito!', 'Ok')
      console.log(order);
    }




    addCuantity(index: any) {
      this.products[index].qtd++;
    }
  
    minusCuantity(index:any) {
      if (this.products[index].qtd > 1) {
        this.products[index].qtd--;
      }
    }

   

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }


  }