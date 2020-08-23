import {Component, OnInit} from '@angular/core';
import {FactoryService} from "../../services/factory.service";
import {LoadingController} from "@ionic/angular";
import {LoadingService} from "../../services/loading.service";
import {environment} from "../../../environments/environment";

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
        private loadingService: LoadingService
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
        }).finally(() => {
            this.loadingService.closeLoading();
        });
        this.filters.offer = 'NO';
        this.http.get(this.filters).then((res: any) => {
            this.products = res.data;
        }).finally(() => {
            this.loadingService.closeLoading();
        });
    }


}
