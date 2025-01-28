import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export default function About() {
  return (
    <section id="about" className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">About My Channel</h2>
          <p className="text-muted-foreground mb-8">
            I create educational content focused on software development, sharing practical tips,
            tutorials, and insights from my experience in the tech industry.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card border hover:border-primary transition-colors"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const stats = [
  { value: "100K+", label: "Subscribers" },
  { value: "500+", label: "Videos Created" },
  { value: "1M+", label: "Views Monthly" },
];
