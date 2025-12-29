import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Customers } from './components/customers/customers';
import { Warehouse } from './components/warehouse/warehouse';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'products', component: Products },
    { path: 'customers', component: Customers },
    { path: 'warehouse', component: Warehouse }
];
