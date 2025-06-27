
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';
import { SectionTitle } from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  text: string;
}

const ContactLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label, text }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="group">
    <Button
      variant="ghost"
      className={cn(
        "justify-start text-base px-0 py-2 h-auto hover:bg-transparent hover:text-primary text-foreground/80",
        "transition-colors duration-300 ease-out group-hover:text-glow-violet"
      )}
      suppressHydrationWarning
    >
      <Icon className="mr-3 h-5 w-5 text-primary group-hover:text-glow-violet transition-colors duration-300 ease-out" />
      {text}
    </Button>
  </Link>
);


export function ConnectSection() {
  const [year, setYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <section id="connect" className="py-20 md:py-32 w-full bg-gradient-to-b from-black via-indigo-950/5 to-black" suppressHydrationWarning>
      <div className="max-w-3xl mx-auto px-4 text-center">
        <SectionTitle title="Let's Connect" glowColor="blue" className="mb-12" />
        
        <Card className="card-glass p-8 md:p-10 text-left">
          <CardContent className="p-0 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-glow-violet">About Me</h3>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Hey, I’m Suhani Arya — a high school student by age, but a startup founder by spirit (and caffeine levels).
                </p>
                <p>
                  I build digital things that do things — from games that teach real-life skills to tools that solve problems. Whether it’s an app, a game, or a half-baked prototype at 2 a.m., I love turning wild ideas into useful experiences.
                </p>
                <p>
                  I do stuff with Unity and with a love for storytelling, but now I’m diving deeper into AI, product design, and making tech feel a little more… human.
                </p>
                <p>
                  Basically, if it’s creative, a little chaotic, and possibly life-improving — I’m in.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-2xl font-semibold mb-4 text-glow-violet">Contact Information</h3>
              <div className="space-y-3">
                <ContactLink 
                  href="mailto:suhaniastoeterna@gmail.com"
                  icon={Mail}
                  label="Email Suhani"
                  text="suhaniastoeterna@gmail.com"
                />
                <ContactLink 
                  href="https://www.linkedin.com/in/suhani-arya-b10990364"
                  icon={Linkedin}
                  label="Suhani Arya's LinkedIn Profile"
                  text="linkedin.com/in/suhani-arya-b10990364"
                />
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <p className="text-lg text-secondary text-glow-blue italic">
                “Have a cool idea or want to collaborate on a project? Reach out – I’d love to hear from you.”
              </p>
            </div>
          </CardContent>
        </Card>
        {year && (
          <p className="mt-20 text-xs text-foreground/40 tracking-wider">
            ASTO ETERNA &copy; {year}
          </p>
        )}
      </div>
    </section>
  );
}
