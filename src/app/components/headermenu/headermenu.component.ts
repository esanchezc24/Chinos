import {Component, Input, OnInit} from '@angular/core';
import {ParamsService} from "../../services/params.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-headermenu',
    templateUrl: './headermenu.component.html',
    styleUrls: ['./headermenu.component.scss'],
})
export class HeadermenuComponent implements OnInit {
    @Input() back: boolean;

    constructor(
        private paramsService: ParamsService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    goPedido() {
        const params = this.paramsService.getParams();
        params.urlProductBack = btoa(this.router.url);
        this.router.navigate(['/tabs/pedido']);
    }

}
