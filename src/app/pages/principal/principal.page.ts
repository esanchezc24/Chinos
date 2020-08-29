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
    sliderOpt = {
        autoplay: true,
        speed: 1000
    };
    slideOptsOne = {
        slidesPerView: 3,
        autoplay: true,
        spaceBetween: 10,
        speed: 1000,
    };
    sliderProduct = {
        slidesPerView: 2,
        autoplay: true,
        spaceBetween: 10,
        speed: 1500
    };
    offers = [];
    products = [];
    filters: any = {limit: 0, per_page: 6};
    environment = environment;
    sliders = [];

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
        this.http.setModule('sliders');
        this.http.get().then((res: any) => {
            this.sliders = res.data;
            console.log(this.sliders);
            this.getOffers();
        }).catch(error => {
            this.loadingService.closeLoading();
        });


    }

    getOffers() {
        this.http.setModule('products');
        this.filters.offer = 'SI';
        this.http.get(this.filters).then((res: any) => {
            this.offers = res.data;
            // if (this.offers.length < 3) {
            //     const num = this.offers.length < 3 ? 3 - this.offers.length : this.offers.length;
            //     for (let i = 0; i < num; i++) {
            //         this.offers.push({});
            //     }
            // }

            this.offers.forEach((product, i) => {
                this.offers[i].qty = 1;
            });
            this.getProduct();
        }).catch(error => {
            this.loadingService.closeLoading();
        });
    }

    getProduct() {
        this.filters.offer = 'NO';
        this.http.get(this.filters).then((res: any) => {
            this.products = res.data;
            // const num = this.products.length < 2 ? 2 - this.products.length : this.products.length;
            // if (this.products.length < 2) {
            //     for (let i = 0; i < num; i++) {
            //         this.products.push({});
            //     }
            // }
            this.products.forEach((product, i) => {
                this.products[i].qty = 1;
            });
        }).finally(() => {
            this.loadingService.closeLoading();
        });
    }


    goDetail(product) {
        const params = this.paramsService.getParams();
        params.product = product;
        params.urlBack = btoa(this.router.url);
        this.router.navigate(['/tabs/detalle']);
    }

    goProducts(name) {
        const params = this.paramsService.getParams();
        params.name = name;
        this.router.navigate(['/tabs/productos']);
    }
}
