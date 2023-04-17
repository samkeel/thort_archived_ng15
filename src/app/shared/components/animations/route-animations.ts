import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const routeFadeStateTrigger = trigger('routeFadeState', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate('750ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('0ms'),
    style({
      opacity: 0
    }),
  ]),
]);
