export interface SolveResult {
  text: string;
  task_id: string;
  latency_ms: number;
  status: string;
}

export interface ExtractResult {
  data: Record<string, any>;
  task_id: string;
  latency_ms: number;
  status: string;
}

export class OcilarError extends Error {
  status: number;
  detail: string;
  constructor(status: number, detail: string) {
    super(`Ocilar API error ${status}: ${detail}`);
    this.status = status;
    this.detail = detail;
  }
}

export interface OcilarConfig {
  apiKey: string;
  baseUrl?: string;
}

export class OcilarClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: OcilarConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = (config.baseUrl || "https://api.ocilar.com/api/v1").replace(/\/$/, "");
  }

  private async post(path: string, body: Record<string, any>): Promise<any> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "X-API-Key": this.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new OcilarError(res.status, data.detail || res.statusText);
    return data;
  }

  private async get(path: string): Promise<any> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: { "X-API-Key": this.apiKey },
    });
    const data = await res.json();
    if (!res.ok) throw new OcilarError(res.status, data.detail || res.statusText);
    return data;
  }

  // ── CAPTCHA Solving ──

  async solveSat(imageBase64: string): Promise<SolveResult> {
    const d = await this.post("/solve/sat", { image: imageBase64 });
    return { text: d.text || "", task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async solveImss(imageBase64: string): Promise<SolveResult> {
    const d = await this.post("/solve/imss", { image: imageBase64 });
    return { text: d.text || "", task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async solveImage(imageBase64: string): Promise<SolveResult> {
    const d = await this.post("/solve/image", { image: imageBase64 });
    return { text: d.text || "", task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async solveRecaptchaV2(siteKey: string, siteUrl: string): Promise<SolveResult> {
    const d = await this.post("/solve/recaptcha-v2", { site_key: siteKey, site_url: siteUrl });
    return { text: d.token || d.text || "", task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async solveRecaptchaV3(siteKey: string, siteUrl: string, action = "verify"): Promise<SolveResult> {
    const d = await this.post("/solve/recaptcha-v3", { site_key: siteKey, site_url: siteUrl, action });
    return { text: d.token || d.text || "", task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async solveHcaptcha(siteKey: string, siteUrl: string): Promise<SolveResult> {
    const d = await this.post("/solve/hcaptcha", { site_key: siteKey, site_url: siteUrl });
    return { text: d.token || d.text || "", task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async solveCloudflare(siteUrl: string): Promise<SolveResult> {
    const d = await this.post("/solve/cloudflare", { site_url: siteUrl });
    return { text: d.token || d.text || "", task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async solveAudio(audioBase64: string): Promise<SolveResult> {
    const d = await this.post("/solve/audio", { audio: audioBase64 });
    return { text: d.text || "", task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  // ── Document AI ──

  async extractCsf(documentBase64: string): Promise<ExtractResult> {
    const d = await this.post("/solve/extract_csf", { document: documentBase64 });
    return { data: d.data || {}, task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async extractIne(documentBase64: string): Promise<ExtractResult> {
    const d = await this.post("/solve/extract_ine", { document: documentBase64 });
    return { data: d.data || {}, task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async extractCfdi(documentBase64: string): Promise<ExtractResult> {
    const d = await this.post("/solve/extract_cfdi", { document: documentBase64 });
    return { data: d.data || {}, task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async extractCurp(documentBase64: string): Promise<ExtractResult> {
    const d = await this.post("/solve/extract_curp", { document: documentBase64 });
    return { data: d.data || {}, task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async extractDomicilio(documentBase64: string): Promise<ExtractResult> {
    const d = await this.post("/solve/extract_domicilio", { document: documentBase64 });
    return { data: d.data || {}, task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async extractNomina(documentBase64: string): Promise<ExtractResult> {
    const d = await this.post("/solve/extract_nomina", { document: documentBase64 });
    return { data: d.data || {}, task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  async extractGeneric(documentBase64: string): Promise<ExtractResult> {
    const d = await this.post("/solve/extract_generic", { document: documentBase64 });
    return { data: d.data || {}, task_id: d.task_id || "", latency_ms: d.latency_ms || 0, status: d.status || "" };
  }

  // ── Utilities ──

  async hello(): Promise<Record<string, any>> {
    return this.post("/hello", {});
  }

  async getBalance(): Promise<Record<string, any>> {
    return this.get("/balance");
  }
}
