import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'angular-trpc-ui-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './ui-layout.component.html',
  styleUrls: ['./ui-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLayoutComponent {}
