import { Resvg } from '@resvg/resvg-js';

export function svgToBuffer(svg: string): Buffer {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  return resvg.render().asPng();
}
