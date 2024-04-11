export const CANVAS_BG_OPTIONS = [
  'white',
  'black',
  'green',
  '#FF00FF',
  'var(--color-gray-100)',
  '#303030',
  'url("/images/bg/paintnet-bg.png")',
  'url("/images/bg/firefox-bg-noise.png")',
  'url("/images/bg/868a8222.JPG")',
  // 'url("/images/bg/4e72c8a4.JPG")',
  'url("/images/bg/6e68fae8.jpg")',
  'url("/images/bg/9A5C5436.JPG")',
  'url("/images/bg/9bb50b09.JPG")',
  'url("/images/bg/9e1ac834.JPG")',
  'url("/images/bg/18c8f89c.JPG")',
] as const satisfies string[];

export const PRE_LOAD_IMAGE_BGS = () => {
  CANVAS_BG_OPTIONS.forEach(bg => {
    if (bg.startsWith('url("') && bg.endsWith('")')) {
      const imageUrl = bg.slice(5, -2); // Extract the URL inside url("")
      const image = new Image();
      image.src = imageUrl;
    }
  });
};
