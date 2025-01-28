import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export default function SocialProof() {
  return (
    <section id="testimonials" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What People Say</h2>
          <p className="text-muted-foreground">
            Testimonials from the tech community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={index * 0.1}
            >
              <Card className="h-full backdrop-blur-sm bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Alex Chen",
    title: "Senior Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    content: "Your tutorials have helped me level up my coding skills significantly. The way you explain complex concepts is amazing!"
  },
  {
    name: "Sarah Johnson",
    title: "Tech Lead",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "I've been following your channel for years. The quality of content and practical examples are unmatched."
  },
  {
    name: "Mike Peterson",
    title: "Junior Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    content: "Thanks to your channel, I landed my first dev job! Your career advice videos were incredibly helpful."
  }
];
