import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const EASE_OUT = 'power4.out';
export const EASE_IN_OUT = 'power3.inOut';

/** Masked line-by-line reveal for a heading. Returns the SplitText for cleanup. */
export function splitLines(el: Element) {
  return new SplitText(el, {
    type: 'lines',
    linesClass: 'line-inner',
    mask: 'lines',
  });
}
