import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppReducer} from './app.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot(AppReducer),
  ],
  exports: [
    StoreModule,
  ],
})
export class CoreStoreModule {

}
