import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/products/home/home.component'

const routes: Routes = [

  { path: ':id', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: '**', component: HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
