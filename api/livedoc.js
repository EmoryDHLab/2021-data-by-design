import express, { Router } from "express";

const router = Router();

router.use(express.static("docs"));

export default router;
