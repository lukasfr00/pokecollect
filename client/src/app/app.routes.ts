import { Routes } from '@angular/router';
import { ShopComponent } from './sites/shop/shop.component';
import { CollectionComponent } from './sites/collection/collection.component';
import { HomeComponent } from './sites/home/home.component';
import { PackComponent } from './sites/shop/pack/pack.component';
import { LoginComponent } from './sites/auth/login/login.component';
import { RegisterComponent } from './sites/auth/register/register.component';
import { AuthGuard } from './sites/auth/auth.guard';
import { UserComponent } from './sites/user/user.component';
import { PokemonDetailComponent } from './sites/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { title: 'Start' },
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [AuthGuard],
    data: { title: 'Shop' },
  },
  { path: 'pack/:id', component: PackComponent, canActivate: [AuthGuard] },
  {
    path: 'collection',
    component: CollectionComponent,
    canActivate: [AuthGuard],
    data: { title: 'Deine Sammlung' },
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
