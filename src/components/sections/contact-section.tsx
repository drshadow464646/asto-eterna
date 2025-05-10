
'use client';

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { Instagram, Twitter, Youtube, Smartphone, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionTitle } from '@/components/section-title';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { sendEmailAction, type SendEmailFormState } from '@/app/actions/send-email';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const initialState: SendEmailFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full md:w-auto rounded-xl px-10 py-3 text-lg button-glow-violet transition-all duration-300 transform hover:scale-105"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? 'Sending...' : 'Send Message'}
      {!pending && <Send className="ml-2 h-5 w-5" />}
    </Button>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SocialIcon: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <Button
      variant="outline"
      size="icon"
      className="rounded-full border-primary text-primary hover:bg-primary/10 hover:text-primary button-glow-violet transition-all duration-300 ease-out transform hover:scale-110"
    >
      <Icon className="h-5 w-5" />
    </Button>
  </Link>
);


export function ContactSection() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(sendEmailAction, initialState);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  React.useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        form.reset();
      }
    }
    if (state.issues) {
       state.issues.forEach(issue => {
         const fieldName = issue.includes("Name") ? "name" : issue.includes("Email") ? "email" : "message";
         form.setError(fieldName as keyof ContactFormValues, { type: "manual", message: issue });
       });
    }
  }, [state, toast, form]);


  return (
    <section id="contact" className="py-20 md:py-32 w-full bg-gradient-to-b from-black via-indigo-950/10 to-black">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <SectionTitle title="Let Us Build Together" glowColor="blue" />
        
        <Form {...form}>
          <form
            action={formAction}
            className="mt-12 space-y-6 card-glass p-8 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2 text-left">
                    <FormLabel htmlFor="name" className="text-foreground/80">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        required
                        className="input-glow bg-black/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2 text-left">
                    <FormLabel htmlFor="email" className="text-foreground/80">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        className="input-glow bg-black/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-2 text-left">
                  <FormLabel htmlFor="message" className="text-foreground/80">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      id="message"
                      placeholder="What's on your mind?"
                      required
                      rows={5}
                      className="input-glow bg-black/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton />
          </form>
        </Form>

        <div className="mt-16 flex justify-center items-center gap-6">
          <SocialIcon href="https://play.google.com" icon={Smartphone} label="Play Store" />
          <SocialIcon href="https://twitter.com" icon={Twitter} label="Twitter" />
          <SocialIcon href="https://instagram.com" icon={Instagram} label="Instagram" />
          <SocialIcon href="https://youtube.com" icon={Youtube} label="YouTube" />
        </div>
        <p className="mt-20 text-xs text-foreground/40 tracking-wider">
          Made with vision, not a template.
        </p>
      </div>
    </section>
  );
}
