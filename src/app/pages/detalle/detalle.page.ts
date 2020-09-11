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

    constructor(private paramsService: ParamsService,
                private loadingService: LoadingService,
                private router: Router,
                private cartService: CartService,
                public navCtrl: NavController,
                private sanitizer: DomSanitizer) {
    }

    ionViewWillEnter() {
        this.product = null;
        this.product = this.paramsService.getParams().product;
        this.urlBack = atob(this.paramsService.getParams().urlBack);
    }

    ngOnInit() {
    }

    ionViewDidLeave(){
        console.log("ADIOS");
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

    addCart() {
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