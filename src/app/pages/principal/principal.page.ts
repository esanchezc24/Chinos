import {Component, OnInit} from '@angular/core';
import {FactoryService} from "../../services/factory.service";
import {LoadingController} from "@ionic/angular";
import {LoadingService} from "../../services/loading.service";
import {environment} from "../../../environments/environment";
import {ParamsService} from "../../services/params.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-principal',
    templateUrl: './principal.page.html',
    styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
    slideOptsOne = {
        initialSlide: 0,
        slidesPerView: 3,
        autoplay: true,
        spaceBetween: 10,
        speed: 1000
    };
    sliderProduct = {
        initialSlide: 0,
        slidesPerView: 2,
        autoplay: true,
        spaceBetween: 10,
        speed: 1500
    };
    offers = [];
    products = [];
    filters: any = {};
    environment = environment;
    constructor(
        private http: FactoryService,
        private loadingService: LoadingService,
        private paramsService: ParamsService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.initialLoad();
    }

    private initialLoad() {
        this.loadingService.presentLoading();
        this.http.setModule('products');
        this.filters.offer = 'SI';
        this.http.get(this.filters).then((res: any) => {
            this.offers = res.data;
            const num = this.offers.length < 3 ? 3 - this.offers.length : this.offers.length;
            for (let i = 0; i < num; i++) {
                this.offers.push({});
            }
            this.offers.forEach((product, i) => {
                this.offers[i].qty = 1;
            });
        }).finally(() => {
            this.loadingService.closeLoading();
        });
        this.filters.offer = 'NO';
        this.http.get(this.filters).then((res: any) => {
            this.products = res.data;
            const num = this.products.length < 2 ? 2 - this.products.length : this.products.length;
            for (let i = 0; i < num; i++) {
                this.products.push({});
            }
            this.products.forEach((product, i) => {
                this.products[i].qty = 1;
            });
        }).finally(() => {
            this.loadingService.closeLoading();
        });
    }

    goDetail(product){
        const params = this.paramsService.getParams();
        params.product = product;
        this.router.navigate(['/tabs/detalle']);
    }
}
