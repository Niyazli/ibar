import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexBoxComponent } from './components/flex-box/flex-box.component';

const components = [FlexBoxComponent];

@NgModule({
    declarations: components,
    imports: [CommonModule],
    exports: [
        FlexBoxComponent
    ]
})
export class SharedModule {}
