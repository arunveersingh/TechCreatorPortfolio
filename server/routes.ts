import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { messages, subscribers, blogPosts } from "@db/schema";
import { desc, eq } from "drizzle-orm";

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

  // Blog routes
  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await db.query.blogPosts.findMany({
        orderBy: [desc(blogPosts.publishedAt)],
      });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await db.query.blogPosts.findFirst({
        where: eq(blogPosts.slug, req.params.slug),
      });

      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}