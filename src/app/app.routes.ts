import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { CustomerForm } from './customers/customer-form/customer-form';
import { CustomerDetail } from './customers/customer-detail/customer-detail';
import { CustomerListComponent } from './customers/customer/customer';
import { ProductListComponent } from './products/product/product';
import { ProductDetail } from './products/product-detail/product-detail';
import { ProductForm } from './products/product-form/product-form';
import { SlotList } from './warehouse/slot-list/slot-list';
import { SlotForm } from './warehouse/slot-form/slot-form';
import { SlotDetail } from './warehouse/slot-detail/slot-detail';
import { GrnList } from './receiving/grn-list/grn-list';
import { GrnDetail } from './receiving/grn-detail/grn-detail';
import { GrnForm } from './receiving/grn-form/grn-form';
import { StockunitForm } from './goodsin/stockunit-form/stockunit-form';
import { ItemForm } from './receiving/item-form/item-form';
import { NotFound } from './common/error/not-found/not-found';
import { ItemDetail } from './receiving/item-detail/item-detail';
import { PutawayForm } from './putaway/putaway-form/putaway-form';
import { OrderForm } from './outbound/order-form/order-form';
import { Login } from './login/login';
import { authenticationGuard } from './authentication-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    canActivate: [authenticationGuard],
    children: [
      { path: '', redirectTo: '/homepage', pathMatch: 'full' },
      { path: 'homepage', component: Home },

      { path: 'customers', component: CustomerListComponent },
      { path: 'customers/new', component: CustomerForm },
      { path: 'customers/:id', component: CustomerDetail },

      { path: 'slots', component: SlotList },
      { path: 'slots/new', component: SlotForm },
      { path: 'slots/:id', component: SlotDetail },

      { path: 'products', component: ProductListComponent },
      { path: 'products/new', component: ProductForm },
      { path: 'products/:id', component: ProductDetail },

      { path: 'grns', component: GrnList },
      { path: 'grns/new', component: GrnForm },
      { path: 'grns/:id', component: GrnDetail },

      { path: 'add-grn-item/:id', component: ItemForm },
      { path: 'grns/:grnId/items/:itemId', component: ItemDetail },

      { path: 'create-stock-unit/:grnId/:itemId', component: StockunitForm },

      { path: 'putaway', component: PutawayForm },

      { path: 'orders', component: OrderForm },
      { path: 'orders/new', component: OrderForm },
    ],
  },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '/404' },
];
