import type { Request, Response } from "express";

export const healthController = {
  ping: (_req: Request, res: Response) => {
    res.json({ ok: true, service: "backend-node-ts", ts: new Date().toISOString() });
  }
};