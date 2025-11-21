import { Injectable } from '@angular/core';
import { User, Product, Purchase } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private USERS_KEY = 'users';
  private CURRENT_USER_KEY = 'currentUser';
  private CART_KEY = 'cart';
  private PURCHASES_KEY = 'purchases';

  constructor() { }

  // Métodos para usuarios
  saveUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  findUser(email: string, password: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.email === email && u.password === password) || null;
  }

  // Usuario actual
  setCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  clearCurrentUser(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Carrito
  addToCart(product: Product): void {
    const cart = this.getCart();
    cart.push(product);
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  getCart(): Product[] {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  clearCart(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify([]));
  }

  // Compras
  savePurchase(purchase: Purchase): void {
    const purchases = this.getPurchases();
    purchases.push(purchase);
    localStorage.setItem(this.PURCHASES_KEY, JSON.stringify(purchases));
  }

  getPurchases(): Purchase[] {
    const purchases = localStorage.getItem(this.PURCHASES_KEY);
    return purchases ? JSON.parse(purchases) : [];
  }

  getUserPurchases(userId: string): Purchase[] {
    const purchases = this.getPurchases();
    return purchases.filter(p => p.userId === userId);
  }
}