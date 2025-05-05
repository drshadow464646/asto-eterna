'use client';

import * as React from 'react'; // Import React
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Send, Mail, Code } from "lucide-react"; // Using Lucide temporarily
import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import { useToast } from "@/hooks/use-toast";

// Temporary Social Icon component
const SocialIcon = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <Button variant="outline" size="icon" className="rounded-full border-primary text-primary hover:bg-primary/10 hover:text-primary button-glow-violet transition-all duration-300 ease-out transform hover:scale-110">
      <Icon className="h-5 w-5" />
    </Button>
  </Link>
);

export function ContactSection() {
  const { toast } = useToast();

  // Basic form submission handler placeholder
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add form submission logic here (e.g., using a server action or API endpoint)
     toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. (This is a placeholder)",
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 w-full bg-gradient-to-b from-black via-indigo-950/10 to-black"
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        <SectionTitle title="Let’s build something." glowColor="blue" />

        <form onSubmit={handleSubmit} className="mt-12 space-y-6 card-glass p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-left">
              <Label htmlFor="name" className="text-foreground/80">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your Name" required className="input-glow bg-black/30" />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="email" className="text-foreground/80">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" required className="input-glow bg-black/30" />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="message" className="text-foreground/80">Message</Label>
            <Textarea id="message" name="message" placeholder="What's on your mind?" required rows={5} className="input-glow bg-black/30" />
          </div>
          <Button type="submit" size="lg" className="w-full md:w-auto rounded-full px-10 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90 button-glow-violet transition-all duration-300 transform hover:scale-105">
            Send Message <Send className="ml-2 h-5 w-5" />
          </Button>
        </form>

        <div className="mt-16 flex justify-center items-center gap-6">
          <SocialIcon href="https://github.com" icon={Github} label="GitHub" />
          <SocialIcon href="mailto:example@example.com" icon={Mail} label="Email" />
           {/* Placeholder for Itch.io - replace Code with a better icon if found/created */}
          <SocialIcon href="https://itch.io" icon={Code} label="Itch.io" />
           {/* Placeholder for Instagram - replace Code with a better icon if found/created */}
           {/* <SocialIcon href="https://instagram.com" icon={InstagramIcon} label="Instagram" /> */}
        </div>

        <p className="mt-20 text-xs text-foreground/40 tracking-wider">
          Made with vision, not a template.
        </p>
      </div>
    </section>
  );
}
