import { AuthService } from "./../../auth/auth.service";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { Subscription } from "rxjs";
@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"]
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth: boolean;
  authSubs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubs = this.authService.authChange.subscribe(authStatus => {
      console.log(authStatus);
      this.isAuth = authStatus;
    });
  }
  onClose() {
    this.closeSidenav.emit();
  }
  onLogout() {
    this.onClose();
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }
}
