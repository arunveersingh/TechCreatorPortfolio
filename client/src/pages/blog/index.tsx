import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";
import { format } from "date-fns";
import type { BlogPost } from "@db/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-4 bg-muted rounded w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Tech Blog</h1>
          <p className="text-muted-foreground">
            Insights, tutorials, and thoughts on software development
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <motion.div
              key={post.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Link href={`/blog/${post.slug}`}>
                <a>
                  <Card className="h-full hover:border-primary transition-colors">
                    <CardHeader>
                      <h2 className="text-xl font-semibold">{post.title}</h2>
                      <time className="text-sm text-muted-foreground">
                        {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                      </time>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
