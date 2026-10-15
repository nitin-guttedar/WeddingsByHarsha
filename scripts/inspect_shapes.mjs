import fs from 'fs';
import path from 'path';

const folders = ['Weddings', 'Engagement', 'Haldi', 'HouseWarming', 'BabyShower', 'NamingCeremony', 'Birthdays', 'GraduationDay', 'Logistics', 'Clients&Vips'];

folders.forEach(f => {
  const p = path.resolve('assets', f);
  if (!fs.existsSync(p)) {
    console.log(`Folder missing: ${f}`);
    return;
  }
  const files = fs.readdirSync(p).filter(x => /\.(jpe?g|png)$/i.test(x));
  console.log(`\n=== ${f} (${files.length} images) ===`);
  files.forEach(file => {
    console.log(`  "${file}"`);
  });
});
