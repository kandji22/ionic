import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PickerComponent } from './picker/picker.component';
import { MapperComponent } from './mapping/mapper/mapper.component';

@NgModule({
    declarations: [MapperComponent,PickerComponent],
    exports: [ MapperComponent,PickerComponent ],
    imports: [CommonModule,IonicModule],
    entryComponents: [MapperComponent]

})
export class CarteModule {}