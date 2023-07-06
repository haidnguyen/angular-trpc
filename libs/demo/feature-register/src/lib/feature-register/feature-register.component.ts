import { ButtonDirective, InputDirective } from '@angular-trpc/demo/ui-component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'angular-trpc-feature-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, InputDirective, ButtonDirective],
  templateUrl: './feature-register.component.html',
  styleUrls: ['./feature-register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRegisterComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    const formValue = this.form.getRawValue();
    console.log('submit', { formValue });
  }
}
