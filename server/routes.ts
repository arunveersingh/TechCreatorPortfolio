import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { messages, subscribers, blogPosts } from "@db/schema";
import { desc, eq } from "drizzle-orm";
import passport from "passport";
import { requireAuth } from "./auth";
import session from "express-session";
import MemoryStore from "memorystore";

export function registerRoutes(app: Express): Server {
  // Session setup
  const SessionStore = MemoryStore(session);
  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
      store: new SessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Existing routes
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
      if ((error as any)?.code === "23505") {
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

  // Admin routes
  app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
    res.json({ success: true });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      // @ts-ignore
      const { password, ...user } = req.user;
      res.json(user);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.json({ success: true });
    });
  });

  // Protected admin routes
  app.post("/api/blog", requireAuth, async (req, res) => {
    try {
      const { title, slug, excerpt, content } = req.body;
      await db.insert(blogPosts).values({
        title,
        slug,
        excerpt,
        content,
      });
      res.json({ success: true });
    } catch (error) {
      if ((error as any)?.code === "23505") {
        res.status(400).json({ error: "Slug must be unique" });
      } else {
        res.status(500).json({ error: "Failed to create blog post" });
      }
    }
  });

  app.put("/api/blog/:id", requireAuth, async (req, res) => {
    try {
      const { title, slug, excerpt, content } = req.body;
      await db
        .update(blogPosts)
        .set({
          title,
          slug,
          excerpt,
          content,
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.id, parseInt(req.params.id)));
      res.json({ success: true });
    } catch (error) {
      if ((error as any)?.code === "23505") {
        res.status(400).json({ error: "Slug must be unique" });
      } else {
        res.status(500).json({ error: "Failed to update blog post" });
      }
    }
  });

  app.delete("/api/blog/:id", requireAuth, async (req, res) => {
    try {
      await db
        .delete(blogPosts)
        .where(eq(blogPosts.id, parseInt(req.params.id)));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}