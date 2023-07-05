import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'angular-trpc-feature-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-login.component.html',
  styleUrls: ['./feature-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureLoginComponent {}
