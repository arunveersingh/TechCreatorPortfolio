import { Button } from "@/components/ui/button";
import { SiYoutube, SiX, SiLinkedin, SiDiscord } from "react-icons/si";

interface SocialIconsProps {
  className?: string;
  size?: "default" | "lg";
}

export function SocialIcons({ className = "", size = "default" }: SocialIconsProps) {
  const socials = [
    {
      icon: SiYoutube,
      href: "https://youtube.com/@techtuber",
      label: "YouTube",
    },
    {
      icon: SiX,
      href: "https://x.com/@techtuber",
      label: "X (Twitter)",
    },
    {
      icon: SiLinkedin,
      href: "https://linkedin.com/in/techtuber",
      label: "LinkedIn",
    },
    {
      icon: SiDiscord,
      href: "https://discord.gg/techtuber",
      label: "Discord",
    },
  ];

  return (
    <div className={`flex gap-2 ${className}`}>
      {socials.map((social) => (
        <Button
          key={social.label}
          variant="ghost"
          size={size}
          className="w-10 h-10 p-0"
          asChild
        >
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5" />
          </a>
        </Button>
      ))}
    </div>
  );
}