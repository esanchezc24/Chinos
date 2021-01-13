import {Component, OnInit, ViewChild} from '@angular/core';
import {FactoryService} from "../../services/factory.service";
import {IonInfiniteScroll, LoadingController} from "@ionic/angular";
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
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    sliderOpt = {
        autoplay: true,
        speed: 1000
    };
    slideOptsOne = {
        slidesPerView: 3,
        autoplay: true,
        spaceBetween: 10,
        speed: 1000,
        autoplayDisableOnInteraction: false
    };
    sliderProduct = {
        slidesPerView: 2,
        autoplay: true,
        spaceBetween: 10,
        speed: 1500,
        autoplayDisableOnInteraction: false
    };
    offers = [];
    products = [];
    filters: any = {limit: 0, per_page: 6};
    environment = environment;
    sliders = [];
    total;
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

    ionViewWillEnter() {
        if (this.products.length || this.offers.length) {
            this.loadingService.presentLoading();
            this.getOffers();
        }

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

            this.offers.forEach((product, i) => {
                this.offers[i].qty = 1;
            });
            this.filters.per_page = 20;
            this.getProduct();
        }).catch(error => {
            this.loadingService.closeLoading();
        });
    }

    getProduct(clear = true) {
        if (clear) {
            this.filters.limit = 0;
            this.products = [];
            if (this.infiniteScroll) {
                this.infiniteScroll.disabled = false;
            }

        }else{
            this.loadingService.presentLoading();
        }
        this.filters.offer = 'NO';
        this.http.get(this.filters).then((res: any) => {
            this.total = res.total;
            res.data.forEach((product) => {
                product.qty = 1;
                this.products.push(product);
            });
            console.log(this.products);
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

    loadData(event) {
        console.log(this.products.length , this.total);
        if (this.products.length === this.total) {
            event.target.complete();
            this.infiniteScroll.disabled = true;
        } else if (this.products.length) {
            this.filters.limit += 20;
            this.getProduct(false);
        }
        event.target.complete();
    }
}
