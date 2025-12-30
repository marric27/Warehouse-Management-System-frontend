import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Warehouse } from './components/warehouse/warehouse';
import { CustomerForm } from './customers/customer-form/customer-form';
import { CustomerDetail } from './customers/customer-detail/customer-detail';
import { CustomerListComponent } from './customers/customer/customer';
import { ProductListComponent } from './products/product/product';
import { ProductDetail } from './products/product-detail/product-detail';
import { ProductForm } from './products/product-form/product-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/new', component: CustomerForm },
  { path: 'customers/:id', component: CustomerDetail },
  { path: 'warehouse', component: Warehouse },

  {path: 'products', component: ProductListComponent},
  { path: 'products/new', component: ProductForm },
  { path: 'products/:id', component: ProductDetail },
];
