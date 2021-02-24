//Everuthi
import {coloursCode} from '@src/constants'

  export const determineColorIntensity = (userColor: string): 'light' | 'dark' => {
    let color:RegExpMatchArray | string | number | null = userColor
    // Variables for red, green, blue values
    let r:number, g:number, b:number, hsp:number
    if (coloursCode.hasOwnProperty(color)) {
        color = coloursCode[color]
    }
      // Check the format of the color, HEX or RGB?
      if (color.match(/^rgb/)) {
          // If HEX --> store the red, green, blue values in separate variables
          color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/) || ''
          r = parseInt(color[1])
          g = parseInt(color[2])
          b = parseInt(color[3])
      } 
      else { 
          // If RGB --> Convert it to HEX: http://gist.github.com/983661
          color = +("0x" + color.slice(1).replace(color.length < 5 && /./g || '', '$&$&'));
          r = color >> 16;
          g = color >> 8 & 255;
          b = color & 255;
      }
      // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
      hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
      );
      // Using the HSP value, determine whether the color is light or dark
      if (hsp>127.5)  return 'light';
      else  return 'dark';    
  }



