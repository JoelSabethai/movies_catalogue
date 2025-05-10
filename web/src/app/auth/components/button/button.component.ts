import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-component',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
    @Input() type!: 'primary' | 'secondary';
    @Input() buttonType: 'submit' | 'button' = 'button';
    @Input() text!: string;
    @Input() class!: string;
    @Input() redirectTo!: string;
    @Input() isLoading: boolean = false;
    @Input() disabled: boolean = false;
}