import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './components/products/home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';


import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {MatExpansionModule} from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgMatSearchBarModule } from 'ng-mat-search-bar';


import { FilterPipe } from './pipes/filter.pipe';



import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    SidenavComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,MatIconModule,MatButtonModule,MatTableModule,MatExpansionModule,
    MatFormFieldModule,MatCardModule,MatInputModule,MatSidenavModule,MatBadgeModule,HttpClientModule,LayoutModule,MatListModule,
    MatPaginatorModule,MatGridListModule,MatSnackBarModule,MatDialogModule,MatAutocompleteModule,NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
