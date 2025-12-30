import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Product } from './components/product/product';
import { Warehouse } from './components/warehouse/warehouse';
import { CustomerForm } from './customers/customer-form/customer-form';
import { CustomerDetail } from './customers/customer-detail/customer-detail';
import { CustomerListComponent } from './customers/customer/customer';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Product },
  { path: 'customers', component: CustomerListComponent },
  { path: 'warehouse', component: Warehouse },
  { path: 'customers/new', component: CustomerForm },
  { path: 'customers/:id', component: CustomerDetail },
];
