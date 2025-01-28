import { Button } from "@/components/ui/button";
import { SocialIcons } from "@/components/ui/social-icons";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="min-h-screen pt-16 flex items-center">
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={slideIn('left')}
          className="flex flex-col gap-6"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold"
          >
            Tech Content Creator <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              & Software Engineer
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-lg text-muted-foreground"
          >
            Sharing my journey and knowledge in software development through engaging video content
          </motion.p>

          <motion.div 
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
            <SocialIcons size="lg" />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideIn('right')}
          className="relative aspect-video rounded-lg overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1605379399843-5870eea9b74e"
            alt="Workspace setup"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
