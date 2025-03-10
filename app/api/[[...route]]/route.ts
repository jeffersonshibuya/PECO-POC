/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import lead from "./lead";
import contract from "./contract";
import notes from "./notes";

const app = new Hono().basePath("/api");

const routes = app
  .route("lead", lead)
  .route("contract", contract)
  .route("notes", notes);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
