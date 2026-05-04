import satori from 'satori';
import { SITE } from '../lib/config';
import { svgToBuffer } from './generateOgImages';

async function getFont() {
  const inter = await fetch(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-400-normal.woff'
  ).then(res => res.arrayBuffer());
  const interBold = await fetch(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-700-normal.woff'
  ).then(res => res.arrayBuffer());
  return [
    { name: 'Inter', data: inter as ArrayBuffer, weight: 400, style: 'normal' },
    { name: 'Inter', data: interBold as ArrayBuffer, weight: 700, style: 'normal' },
  ];
}

export async function generateSiteOgImage(): Promise<Buffer> {
  const fonts = await getFont();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0f172a',
          padding: '80px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: '80px',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '24px',
                letterSpacing: '-0.04em',
              },
              children: SITE.title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '28px',
                color: '#94a3b8',
                textAlign: 'center',
                maxWidth: '800px',
              },
              children: SITE.description,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '40px',
                fontSize: '20px',
                color: '#475569',
              },
              children: SITE.url,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );

  return svgToBuffer(svg);
}

export async function generatePostOgImage(title: string, description: string): Promise<Buffer> {
  const fonts = await getFont();

  const truncate = (str: string, maxLen: number) =>
    str.length > maxLen ? str.slice(0, maxLen - 1) + '...' : str;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0f172a',
          padding: '80px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: '24px',
                color: '#64748b',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              },
              children: SITE.title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: '700',
                color: '#ffffff',
                textAlign: 'center',
                maxWidth: '900px',
                marginBottom: '24px',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
              },
              children: truncate(title, 60),
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '22px',
                color: '#94a3b8',
                textAlign: 'center',
                maxWidth: '800px',
                lineHeight: 1.5,
              },
              children: truncate(description, 100),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );

  return svgToBuffer(svg);
}
