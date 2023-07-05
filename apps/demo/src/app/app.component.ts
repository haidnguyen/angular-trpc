import { injectTRPC } from '@angular-trpc/data-access/trpc-client';
import { UiLayoutComponent } from '@angular-trpc/demo/ui-layout';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, UiLayoutComponent],
  selector: 'angular-trpc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private readonly client = injectTRPC();

  ngOnInit(): void {
    this.client.user.list.query('wow! rxjs').subscribe(result => {
      console.log({ result });
    });
  }
}
