const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const tileSize = 128;
const cols = 15;
const rows = 10;
const width = cols * tileSize;
const height = rows * tileSize;

async function stitchDungeon(dungeonName) {
  const texDir = path.join(__dirname, 'MythicDungeonTools', 'Midnight', 'Textures', dungeonName);
  if (!fs.existsSync(texDir)) return;

  const files = fs.readdirSync(texDir).filter(f => f.startsWith('1_') && f.endsWith('.png'));
  if (files.length === 0) return;

  console.log(`Stitching ${dungeonName} (${files.length} tiles)...`);

  const image = new Jimp({ width, height, color: 0x00000000 });

  const tasks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tileIndex = r * cols + c + 1;
      const tilePath = path.join(texDir, `1_${tileIndex}.png`);
      tasks.push({ r, c, tilePath, tileIndex });
    }
  }

  const loadedTiles = await Promise.all(
    tasks.map(async t => {
      if (fs.existsSync(t.tilePath)) {
        try {
          const tile = await Jimp.read(t.tilePath);
          return { r: t.r, c: t.c, tile };
        } catch (e) {
          console.error(`Error reading tile ${t.tileIndex}:`, e.message);
        }
      }
      return null;
    })
  );

  for (const item of loadedTiles) {
    if (item && item.tile) {
      image.composite(item.tile, item.c * tileSize, item.r * tileSize);
    }
  }

  const outDir = path.join(__dirname, '..', 'images', 'maps');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1200x800 keeps the exact 15:10 (3:2) aspect ratio with crisp rendering
  image.resize({ w: 1200, h: 800 });

  const outPath = path.join(outDir, `${dungeonName}.jpg`);
  await image.write(outPath, { quality: 80 });
  console.log(`Saved ${outPath}`);
}

async function main() {
  const dungeons = [
    'MurderRow',
    'DenOfNalorakk',
    'TheBlindingVale',
    'VoidscarArena',
    'AltarOfFangs',
    'RubyLifePools',
    'TempleOfSethraliss',
    'KingsRest'
  ];

  for (const d of dungeons) {
    await stitchDungeon(d);
  }
}

main().catch(console.error);
