import {Component, Input, OnInit} from '@angular/core';
import {ParamsService} from '../../services/params.service';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {BuscadorPage} from "../../pages/buscador/buscador.page";

@Component({
    selector: 'app-headermenu',
    templateUrl: './headermenu.component.html',
    styleUrls: ['./headermenu.component.scss'],
})
export class HeadermenuComponent implements OnInit {
    @Input() back: boolean;

    constructor(
        private paramsService: ParamsService,
        private router: Router,
        public modal: ModalController
    ) {
    }

    ngOnInit() {
    }

    goPedido() {
        const params = this.paramsService.getParams();
        params.urlProductBack = btoa(this.router.url);
        this.router.navigate(['/tabs/pedido']);
    }

    async goBuscador(){
        const modal = await this.modal.create({
            component: BuscadorPage,
            cssClass: 'my-custom-class'
        });
        return await modal.present();
    }

}
