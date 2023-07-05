import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'angular-trpc-feature-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-home.component.html',
  styleUrls: ['./feature-home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureHomeComponent {}
