# Ocilar Node.js SDK

Official Node.js/TypeScript client for the [Ocilar API](https://ocilar.com) — CAPTCHA solving and document extraction.

## Install

```bash
npm install @ocilar/sdk
```

## Quick Start

```typescript
import { OcilarClient } from '@ocilar/sdk';
import { readFileSync } from 'fs';

const client = new OcilarClient({ apiKey: 'sk-YOUR_KEY' });

// Test connectivity
console.log(await client.hello());

// Solve SAT CAPTCHA
const img = readFileSync('captcha.png').toString('base64');
const result = await client.solveSat(img);
console.log(result.text);       // "2VBF39"
console.log(result.latency_ms); // 67

// Extract data from CSF
const doc = readFileSync('csf.pdf').toString('base64');
const extracted = await client.extractCsf(doc);
console.log(extracted.data); // { rfc: "XAXX010101000", nombre: "...", ... }
```

## Available Methods

### CAPTCHA Solving
- `solveSat(imageBase64)` — SAT Mexico
- `solveImss(imageBase64)` — IMSS Mexico
- `solveImage(imageBase64)` — Generic image
- `solveRecaptchaV2(siteKey, siteUrl)` — reCAPTCHA v2
- `solveRecaptchaV3(siteKey, siteUrl, action?)` — reCAPTCHA v3
- `solveHcaptcha(siteKey, siteUrl)` — hCaptcha
- `solveCloudflare(siteUrl)` — Cloudflare Turnstile
- `solveAudio(audioBase64)` — Audio CAPTCHA

### Document AI
- `extractCsf(documentBase64)` — Constancia de Situacion Fiscal
- `extractIne(documentBase64)` — INE / Voter ID
- `extractCfdi(documentBase64)` — CFDI Invoice
- `extractCurp(documentBase64)` — CURP
- `extractDomicilio(documentBase64)` — Proof of Address
- `extractNomina(documentBase64)` — Payroll Receipt
- `extractGeneric(documentBase64)` — Generic OCR

### Utilities
- `hello()` — Test API key
- `getBalance()` — Account balance and usage

## Free Tier

Every account gets **1,000 free solves** per CAPTCHA type and **50 free document extractions** per type. No credit card required.

## Links

- [Dashboard](https://console.ocilar.com)
- [API Docs](https://api.ocilar.com/api/v1/docs)
- [Pricing](https://ocilar.com/#pricing)
