import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonSlides, NavController} from '@ionic/angular';
import {ParamsService} from '../../services/params.service';
import {LoadingService} from '../../services/loading.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {CartService} from '../../services/cart.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.page.html',
    styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
    @ViewChild('slides') slides: IonSlides;

    product;
    environment = environment;
    urlBack;
    sliderOpt = {
        initialSlide: 0,
        autoplay: true,
        speed: 1000,
        // loop: true
    };
    colorId;

    constructor(private paramsService: ParamsService,
                private loadingService: LoadingService,
                private router: Router,
                private cartService: CartService,
                public navCtrl: NavController) {
    }

    ionViewWillEnter() {
        this.product = null;
        this.product = this.paramsService.getParams().product;
        this.urlBack = atob(this.paramsService.getParams().urlBack);
    }

    ngOnInit() {
    }

    ionViewDidLeave() {
        if (this.slides) {
            this.slides.slideTo(0);
        }
    }

    add(n) {
        this.product.qty += n;
        if (this.product.qty < 1) {
            this.product.qty += 1;
        }
    }

    selectColor(e) {
        if (e) {
            console.log(e.detail.value);
        }
    }

    addCart() {
        if (this.product.colors.length && !this.colorId) {
            return;
        }
        if (this.product.colors.length) {
            const color = this.product.colors.find(k => k.id === this.colorId);
            this.product.color_id = color.id;
            this.product.code = color.code;
        }
        this.cartService.addProduct(this.product);
        const params = this.paramsService.getParams();
        params.urlProductBack = btoa(this.router.url);
        this.router.navigate(['/tabs/pedido']);
    }


    eveDetail(product) {
        if (product) {
            if (this.slides) {
                this.slides.slideTo(0);
            }
            const params = this.paramsService.getParams();
            params.product = product;
            this.product = product;
        }

    }

}