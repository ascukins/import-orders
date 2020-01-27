import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isBusy = true;
  title = 'import-orders';

  constructor(
    private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.isLoading.subscribe((busy: number) => {
      if (busy === 0) {
        setTimeout(() => this.isBusy = false);
      } else if (busy === 1) {
        setTimeout(() => {
          if (this.spinner.isLoading.value > 0) {
            this.isBusy = true;
          } else {
            this.isBusy = false;
          }
        }, 200);
      }
    });
  }
}
