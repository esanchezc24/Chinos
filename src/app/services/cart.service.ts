import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../interface/product.interface';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private subject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
    private cart = [];

    constructor() {
        this.subject.subscribe(data => this.cart = data);
    }

    addProduct(product: any) {
        if (!this.searchProduct(product)) {
            this.subject.next([...this.cart, product]);
        }
    }

    getCart() {
        return this.cart;
    }

    searchProduct(product): Boolean {
        return !!this.cart.find(k => k.id === product.id);
    }

    removeProduct(product) {
        const i = this.cart.indexOf(product);
        if (i > -1) {
            this.cart.splice(i, 1);
        }
        return this.cart;
    }

    cartTotal() {
        let total = 0;
        this.cart.forEach((product: any) => {
            total = total + (product.price * product.qty);
        });
        return total;
    }

    countCart() {
        return this.cart.length;
    }

    clearCart() {
        this.cart = [];
    }
}
