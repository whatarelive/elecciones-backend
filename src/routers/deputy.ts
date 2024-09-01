import { Router } from "express";

export const deputyRouter = Router();

deputyRouter.get('/', (_req, res) => {
    res.json({
        ok: true,
        message: 'Diputados'
    })
}); 