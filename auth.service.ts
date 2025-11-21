import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private storageService: StorageService) {
    const user = this.storageService.getCurrentUser();
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): User | null {
    const user = this.storageService.findUser(email, password);
    if (user) {
      this.storageService.setCurrentUser(user);
      this.currentUserSubject.next(user);
    }
    return user;
  }

  logout(): void {
    this.storageService.clearCurrentUser();
    this.currentUserSubject.next(null);
  }

  register(user: User): boolean {
    const users = this.storageService.getUsers();
    if (users.find(u => u.email === user.email)) {
      return false;
    }
    this.storageService.saveUser(user);
    return true;
  }
}