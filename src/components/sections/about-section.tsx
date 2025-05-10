
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 w-full max-w-4xl mx-auto px-4 flex justify-center items-center">
      <div className="card-glass p-8 md:p-12 relative overflow-hidden">
         {/* Floating shapes placeholder */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/10 rounded-full filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full filter blur-xl animate-pulse delay-500"></div>

        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-3xl md:text-4xl font-bold text-center text-glow-violet uppercase">
            NOT JUST TECH IT'S A VIBE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-center text-foreground/80 text-base md:text-lg space-y-6">
          <p>
            At ASTO ETERNA, we believe innovation doesn’t come from sticking to lanes — it comes from redefining the road itself. We blend design, code, and technology to create digital experiences that are original by intention and impactful by nature.
          </p>
          <blockquote className="text-xl md:text-2xl italic text-secondary font-medium py-4 border-t border-b border-secondary/20 text-glow-blue">
            “Defined by ideas, not categories.”
          </blockquote>
          <p>
            From immersive game worlds to AI-driven tools, we’re building what’s next — not just what’s expected.
          </p>
        </CardContent>
      </div>
    </section>
  );
}

