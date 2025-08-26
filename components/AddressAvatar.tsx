"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { keccak_256 } from "js-sha3";

// Put punks.png into /public then import like this so Next.js optimizes it
import punks from "@/public/punks.png";

// Export the Blockie component
export function Blockie({ address, size = 8, grid = 5 }: { address: string; size?: number; grid?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const seed = (address || "").trim().toLowerCase();

  useEffect(() => {
    drawBlockie(canvasRef.current, seed, size, grid);
  }, [address, size, grid, seed]);

  return (
    <canvas
      ref={canvasRef}
      width={grid * size}
      height={grid * size}
      className="rounded-lg"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

/** Convert an address (or any string) to a number in [0, 10000). */
function calculatePunkIndex(input: string | undefined): number {
  const s = (input || "").trim().toLowerCase();
  if (!s) return 0;
  // keccak256 hex string (no 0x prefix, 64 hex chars)
  const hex = keccak_256(s);
  // Use the first 8 hex chars (32 bits) -> number
  const n = Number.parseInt(hex.slice(0, 8), 16);
  return n % 10000;
}

/**
 * Ethereum Address Avatar Playground with Wagmi integration
 */
export function AvatarPlayground({
  address,
}: {
  address?: string | undefined;
}) {
  const punkIndex = calculatePunkIndex(address);
  
  return (
    <div className="">
      <div className="">
        <PunkPreview punkIndex={punkIndex} />
      </div>
    </div>
  );
}

/**
 * Draw a simple symmetric blockie on the given canvas.
 * sizePx: size of each block (pixel multiplier)
 * grid: grid dimension
 */
function drawBlockie(
  canvas: HTMLCanvasElement | null,
  seed: string,
  sizePx = 8,
  grid = 5
) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Seeded PRNG (xorshift32-ish from string)
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const rand = () => ((h = (h ^ (h >>> 13)) >>> 0), (h = Math.imul(h, 1597334677)), (h ^ (h >>> 16)) >>> 0) / 0xffffffff;

  const color = hslToCss(rand() * 360, 0.6, 0.55);
  const bg = hslToCss(rand() * 360, 0.4, 0.12);
  const spot = hslToCss(rand() * 360, 0.7, 0.65);

  // background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, grid * sizePx, grid * sizePx);

  // build half-grid then mirror
  const half = Math.ceil(grid / 2);
  const data: number[][] = [];
  for (let y = 0; y < grid; y++) {
    const row: number[] = [];
    for (let x = 0; x < half; x++) {
      row[x] = Math.floor(rand() * 2.3); // 0,1,2 (2 = spot)
    }
    data[y] = row.concat(row.slice(0, grid - half).reverse());
  }

  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      if (data[y][x] === 0) continue;
      ctx.fillStyle = data[y][x] === 1 ? color : spot;
      ctx.fillRect(x * sizePx, y * sizePx, sizePx, sizePx);
    }
  }
}

function hslToCss(h: number, s: number, l: number) {
  const hs = Math.round(s * 100);
  const hl = Math.round(l * 100);
  return `hsl(${h.toFixed(0)} ${hs}% ${hl}%)`;
}

function PunkPreview({ punkIndex }: { punkIndex: number }) {
  // Sprite sheet constants
  const TILE = 60; // px
  const GRID = 100; // 100x100
  const SHEET_SIZE = TILE * GRID; // 12500

  // compute col/row
  const col = punkIndex % GRID;
  const row = Math.floor(punkIndex / GRID);

  const bgPosX = -col * TILE;
  const bgPosY = -row * TILE;

  return (
    <div className="flex justify-center">
      <div
        className="w-13 h-14"
        style={{
          backgroundImage: `url(${(punks as unknown as { src: string }).src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${SHEET_SIZE}px ${SHEET_SIZE}px`,
          backgroundPosition: `${bgPosX}px ${bgPosY}px`,
          imageRendering: "pixelated",
        }}
        title={`Punk #${punkIndex}`}
      />
    </div>
  );
}

export default AvatarPlayground;