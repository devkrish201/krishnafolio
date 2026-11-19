const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const raw = fs.readFileSync('public/krishna-cutout.jpg');
const img = jpeg.decode(raw);
const { width, height } = img;

const isBg = new Uint8Array(width * height);
const visited = new Uint8Array(width * height);
const queue = [];

const isLight = (r, g, b) => {
  return r > 220 && g > 220 && b > 220;
};

// Seed from top, left, right edges
for (let x = 0; x < width; x++) {
  const i0 = (0 * width + x) * 4;
  if (isLight(img.data[i0], img.data[i0 + 1], img.data[i0 + 2])) {
    queue.push(x, 0);
    visited[0 * width + x] = 1;
  }
}
for (let y = 0; y < height; y++) {
  const iL = (y * width + 0) * 4;
  if (isLight(img.data[iL], img.data[iL + 1], img.data[iL + 2])) {
    queue.push(0, y);
    visited[y * width + 0] = 1;
  }
  const iR = (y * width + (width - 1)) * 4;
  if (isLight(img.data[iR], img.data[iR + 1], img.data[iR + 2])) {
    queue.push(width - 1, y);
    visited[y * width + (width - 1)] = 1;
  }
}

// Flood fill
let head = 0;
while (head < queue.length) {
  const x = queue[head++];
  const y = queue[head++];
  const idx = y * width + x;
  isBg[idx] = 1;

  const neighbors = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1]
  ];

  for (const [nx, ny] of neighbors) {
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const nIdx = ny * width + nx;
      if (!visited[nIdx]) {
        visited[nIdx] = 1;
        const p = nIdx * 4;
        const r = img.data[p];
        const g = img.data[p + 1];
        const b = img.data[p + 2];
        if (isLight(r, g, b)) {
          queue.push(nx, ny);
        }
      }
    }
  }
}

console.log('Background flood fill pixels marked:', queue.length / 2);

// Create PNG
const png = new PNG({ width, height });

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    const p = idx * 4;
    const r = img.data[p];
    const g = img.data[p + 1];
    const b = img.data[p + 2];

    if (isBg[idx]) {
      // 100% transparent
      png.data[p] = 0;
      png.data[p + 1] = 0;
      png.data[p + 2] = 0;
      png.data[p + 3] = 0;
    } else {
      // Check if neighboring any background pixel for anti-aliasing
      let bgNeighbors = 0;
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && isBg[ny * width + nx]) {
          bgNeighbors++;
        }
      }

      if (bgNeighbors > 0 && r > 200 && g > 200 && b > 200) {
        // Feather edge
        const brightness = (r + g + b) / 3;
        const alpha = Math.max(0, Math.min(255, Math.round(255 * (1 - (brightness - 200) / 55))));
        png.data[p] = r;
        png.data[p + 1] = g;
        png.data[p + 2] = b;
        png.data[p + 3] = alpha;
      } else {
        png.data[p] = r;
        png.data[p + 1] = g;
        png.data[p + 2] = b;
        png.data[p + 3] = 255;
      }
    }
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('public/krishna-cutout.png', buffer);
console.log('Generated true transparent PNG: public/krishna-cutout.png, size:', buffer.length);

