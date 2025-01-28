import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { messages, subscribers } from "@db/schema";

export function registerRoutes(app: Express): Server {
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      await db.insert(messages).values({ name, email, message });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save message" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      await db.insert(subscribers).values({ email });
      res.json({ success: true });
    } catch (error) {
      if ((error as any)?.code === "23505") { // Unique constraint violation
        res.status(400).json({ error: "Email already subscribed" });
      } else {
        res.status(500).json({ error: "Failed to subscribe" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
