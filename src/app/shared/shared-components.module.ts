import {NgModule} from '@angular/core';
import {ControlMessageComponent} from "./control-message/control-message.component";
import {SharedModule} from "../shared.module";


@NgModule({
    declarations: [
        ControlMessageComponent,
    ],
    exports: [
        ControlMessageComponent
    ],
    imports: [
        SharedModule
    ],

})
export class SharedComponentsModule {
}
