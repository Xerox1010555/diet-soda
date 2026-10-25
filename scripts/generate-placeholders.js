#!/usr/bin/env node
// Asset placeholder generator
// Run this to create placeholder assets for development

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public/assets');
const dirs = ['models', 'textures', 'images', 'fonts'];

dirs.forEach((dir) => {
  const fullPath = path.join(assetsDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${fullPath}`);
  }
});

// Create placeholder SVG for bubble
const bubbleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
  <ellipse cx="35" cy="35" rx="8" ry="6" fill="rgba(255,255,255,0.4)"/>
  <ellipse cx="60" cy="55" rx="4" ry="3" fill="rgba(255,255,255,0.3)"/>
</svg>`;

fs.writeFileSync(path.join(assetsDir, 'images/bubble.svg'), bubbleSvg);
console.log('Created: public/assets/images/bubble.svg');

// Create placeholder for OG image
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0b8a78"/>
      <stop offset="50%" style="stop-color:#044e3b"/>
      <stop offset="100%" style="stop-color:#011411"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">Diet Soda</text>
  <text x="600" y="360" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.8)" text-anchor="middle">Pure Zero Refreshment</text>
  <circle cx="600" cy="480" r="60" fill="#fbcfe8"/>
  <text x="600" y="495" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#011411" text-anchor="middle">🥤</text>
</svg>`;

fs.writeFileSync(path.join(assetsDir, 'images/og-default.svg'), ogSvg);
console.log('Created: public/assets/images/og-default.svg');

console.log('\nAsset placeholders created!');
console.log('Replace with actual optimized assets for production.');