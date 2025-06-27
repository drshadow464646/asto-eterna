
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
            we don’t just follow the path — we redefine it.
          </p>
          <div className="text-center text-primary/60 tracking-widest">──────</div>
          <p>
            We blend design, code, and cutting-edge technology <br />
            to craft digital experiences that aren’t just original — they’re transformative.
          </p>
          <blockquote className="text-xl md:text-2xl italic text-secondary font-medium py-4 border-t border-b border-secondary/20 text-glow-blue">
            “Defined by ideas, not categories.”
          </blockquote>
        </CardContent>
      </div>
    </section>
  );
}

