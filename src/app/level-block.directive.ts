import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appLevelBlock]'
})
export class LevelBlockDirective {
  // @HostBinding('id') id: string;

  constructor() { }

}
