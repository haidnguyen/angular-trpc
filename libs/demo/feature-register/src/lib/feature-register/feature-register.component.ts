import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'angular-trpc-feature-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-register.component.html',
  styleUrls: ['./feature-register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRegisterComponent {}
