import { ChangeDetectorRef, Component, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChildren('filter') filteredItems: any = [];
  public cartItems!: number;
  public storeDomain = '';
  storeName: String = '';
  storeImage: String = '';
  storeEmail: String = '';
  storePhone: String = '';
  storeAddress: String = '';
  isLoading: boolean = true;
  isAStore: boolean = false;
  public products: any = [];
  public categories: any = [];
  public store: any = [];
  public havePhoto: boolean = false;
  breakpoint: any;
  public searchText = '';
  control: FormControl = new FormControl('');

  constructor(
    private dataApi: ProductsService,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    let id = this._route.snapshot.paramMap.get('id');
    this.storeDomain = `${id}`;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.isLoading = true;
    this.getProducts();
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 850) ? 2 : (window.innerWidth <= 1050) ? 3 : 4;
  }

  getProducts() {
    this.dataApi.getProducts(this.storeDomain).subscribe((store: any) => {
      this.store = store;
      console.log(store)
      this.storeName = store['storeName'];
      this.storeImage = (store['photoURL'] == null || store['photoURL'] == '') ? '../../assets/kiiwik.png' : store['photoURL'];
      this.storeEmail = (store['email'] == null || store['email'] == '') ? 'Muy Pronto' : store['email'];
      this.storePhone = (store['phone'] == null || store['phone'] == '') ? 'Muy Pronto' : store['phone'];
      this.storeAddress = (store['address'] == null || store['address'] == '') ? 'Muy Pronto' : store['address'];
      this.products = this.store.products;
      this.products.forEach((product: { qtd: number; category: { name: string; } | null; }) => {
        product.qtd = 1;
        if (product.category == null) {
          product.category = { name: 'Sin Categoría' };
        }
      });
      this.categories = this.store.categories;
      this.isAStore = true;
      this.isLoading = false;
      console.log(this.store.products);
    }, (error: any) => {
      this.isAStore = false;
      this.isLoading = false;
      this.storeName = 'Kiiwik-Shop';
      this.storeEmail = 'kiiwik@gmail.com';
      this.storePhone = '3196-9817 / 3177-3335';
      this.storeAddress = 'Muy Pronto'
      this.storeImage = '../../assets/kiiwik.png'
      console.log(error);
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

  checkPhoto(product: any) {
    if (product.photoURL == "") {
      product.photoURL = "../../../../assets/product.png"
    }
  }

  filterCategory(text: string) {
    this.searchText = text;
  }

  countCartItems() {
    var orderArrayCart = JSON.parse(localStorage.getItem('orderCart') || '{}');
    console.log(orderArrayCart);
    if (orderArrayCart != null) {
      this.cartItems = orderArrayCart.length;
      console.log(this.cartItems);
    }
  }

  saveToCart(order: any) {
    var orderArrayCart = JSON.parse(localStorage.getItem('orderCart') || '{}');
    console.log(orderArrayCart);
    if (orderArrayCart == null) {
      const orderArray = [];
      orderArray.push(order);
      localStorage.setItem('orderCart', JSON.stringify(orderArray));
      this.countCartItems();
    } else {

      const filter1 = orderArrayCart.filter((x: any) => x.id == order.id);
      if (filter1.length === 0) {
        const orderArray = orderArrayCart;
        orderArray.push(order);
        localStorage.setItem('orderCart', JSON.stringify(orderArray));
        this.countCartItems();
      } else {
        filter1[0].qtd = filter1[0].qtd + order.qtd;
        const filter2 = orderArrayCart.filter((x: any) => x.id != order.id);
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

  minusCuantity(index: any) {
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