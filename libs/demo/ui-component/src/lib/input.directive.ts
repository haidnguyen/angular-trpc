import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'input[angularTrpcInput]',
  standalone: true,
})
export class InputDirective {
  @HostBinding('class') className = 'border-light text-default mb-4 rounded border border-solid px-6 py-3 text-xl';
}
