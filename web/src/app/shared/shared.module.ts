import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackgroundContainerComponent } from './containers/background-container.component';

@NgModule({
  declarations: [
    BackgroundContainerComponent,
  ],
  imports: [RouterModule],
  exports: [
    BackgroundContainerComponent,
  ]
})
export class SharedModule {}
