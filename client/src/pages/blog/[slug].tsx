import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { format } from "date-fns";
import { useRoute } from "wouter";
import type { BlogPost } from "@db/schema";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${params?.slug}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-1/4 mb-8" />
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <article className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <time className="text-muted-foreground">
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </time>
          </header>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
      </article>
    </main>
  );
}
