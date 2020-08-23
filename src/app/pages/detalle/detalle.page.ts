import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {ParamsService} from "../../services/params.service";
import {LoadingService} from "../../services/loading.service";
import {FactoryService} from "../../services/factory.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.page.html',
    styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
    product;
    environment = environment;

    constructor(private paramsService: ParamsService,
                private loadingService: LoadingService,
                private router: Router,
                private cartService: CartService) {
    }

    ionViewWillEnter() {
        this.product = this.paramsService.getParams().product;
    }

    ngOnInit() {
    }

    add(n) {
        this.product.qty += n;
        if (this.product.qty < 1) {
            this.product.qty += 1;
        }
    }

    addCart() {
        this.cartService.addProduct(this.product);
        this.router.navigate(['/tabs/pedido']);
    }
}
