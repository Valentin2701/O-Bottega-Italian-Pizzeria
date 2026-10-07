import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/Product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "/api/products";

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getSingleProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getRecentProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/recent`);
  }

  createProduct(product: Product) {
    return this.http.post<void>(`${this.apiUrl}`, product);
  }

  editProduct(product: Product, productId: string) {
    return this.http.put<void>(`${this.apiUrl}/${productId}`, product);
  }

  deleteProduct(productId: string | undefined) {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, {});
  }

  buyProducts(products: Product[]) {
    return this.http.post<void>(`${this.apiUrl}/buy`, {products});
  }

  searchProducts(search: string) {
    return this.http.post<Product[]>(`${this.apiUrl}/search`, { search });
  }

  addProductToCart(productId: string | undefined) {
    return this.http.post<void>(`${this.apiUrl}/cart`, { productId });
  }

  getFromCart(){
    return this.http.get<Product[]>(`${this.apiUrl}/cart`);
  }

  removeFromCart(productId: string){
    return this.http.delete<void>(`${this.apiUrl}/cart/${productId}`, {});
  }
}
