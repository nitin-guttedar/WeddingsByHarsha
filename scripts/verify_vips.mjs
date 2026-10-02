import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
let outsideGallery = 0;
let insideGallery = 0;
let inGallery = false;

lines.forEach((l, i) => {
  if (l.includes('id="view-gallery"')) inGallery = true;
  if (l.includes('id="view-areas"')) inGallery = false;
  
  if (l.includes('Clients&Vips')) {
    if (inGallery) {
      insideGallery++;
      console.log(`INSIDE GALLERY (Line ${i+1}): ${l.trim()}`);
    } else {
      outsideGallery++;
      console.log(`OUTSIDE GALLERY (Line ${i+1}): ${l.trim()}`);
    }
  }
});

console.log('--- SUMMARY ---');
console.log('Inside Gallery count:', insideGallery);
console.log('Outside Gallery count:', outsideGallery);
