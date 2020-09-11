import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {LoadingService} from '../../services/loading.service';
import {FactoryService} from '../../services/factory.service';
import {environment} from '../../../environments/environment';
import {ParamsService} from '../../services/params.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-buscador',
    templateUrl: './buscador.page.html',
    styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    products = [];
    filters: any = {limit: 0, per_page: 20};
    total;
    environment = environment;
    constructor(public modal: ModalController,
                private loading: LoadingService,
                private http: FactoryService,
                private paramsService: ParamsService,
                private router: Router) {
    }

    ngOnInit() {
    }

    search(ev) {
        if (ev.target.value) {
            this.filters.name = ev.target.value;
            this.getProducts(true);
        } else {
            this.filters.limit = 0;
            this.products = [];
            this.infiniteScroll.disabled = false;
        }

    }

    getProducts(clear) {
        if (clear) {
            this.filters.limit = 0;
            this.products = [];
            if (this.infiniteScroll) {
                this.infiniteScroll.disabled = false;
            }
        }
        this.loading.presentLoading();
        this.http.setModule('products');
        this.http.get(this.filters).then((res: any) => {
            this.total = res.total;
            res.data.forEach((product, i) => {
                product.qty = 1;
                this.products.push(product);
            });
        }).finally(() => {
            this.loading.closeLoading();
        });
    }
    loadData(event) {
        if (this.products.length === this.total) {
            event.target.complete();
            this.infiniteScroll.disabled = true;
        } else {
            this.filters.limit += 20;
            this.getProducts(false);
        }
        event.target.complete();
    }
    goDetail(product) {
        const params = this.paramsService.getParams();
        params.product = product;
        params.urlBack = btoa(this.router.url);
        this.modal.dismiss(product);
        this.router.navigate(['/tabs/detalle']);
    }
}
