import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'button[angularTrpcButton]',
  standalone: true,
})
export class ButtonDirective {
  @HostBinding('class') className =
    'bg-primary disabled:bg-light cursor-pointer px-6 py-3 rounded text-white disabled:cursor-not-allowed text-xl';
}
