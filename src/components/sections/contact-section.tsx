'use client';

import * as React from 'react';
import { useActionState } from 'react'; // Changed from 'react-dom'
import { useFormStatus } from 'react-dom';
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
      suppressHydrationWarning // Added to suppress hydration warnings
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
      suppressHydrationWarning // Added to suppress hydration warnings
    >
      <Icon className="h-5 w-5" />
    </Button>
  </Link>
);


export function ContactSection() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(sendEmailAction, initialState); // Changed from useFormState

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    // Ensure that if state.fields is populated due to an error, the form reflects those values.
    // This might be redundant if sendEmailAction correctly populates fields on error.
    values: state.fields as ContactFormValues | undefined,
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
    // This part was attempting to set errors based on state.issues.
    // If sendEmailAction returns field-specific errors in state.fields,
    // react-hook-form's resolver might handle it.
    // If state.issues is meant for general non-field errors, this is fine.
    // If state.issues contains field-specific error messages, ensure they are mapped correctly.
    if (state.issues && !state.success) {
       const fieldErrors = parsedErrorToFieldErrors(state.issues, formSchema);
       Object.entries(fieldErrors).forEach(([fieldName, message]) => {
         form.setError(fieldName as keyof ContactFormValues, { type: "manual", message });
       });
    }

  }, [state, toast, form]);

  // Helper function to map Zod-like issues to field errors
  // This is a simplified example, adjust based on actual `state.issues` structure
  function parsedErrorToFieldErrors(issues: string[], schema: typeof formSchema) {
    const fieldErrors: Record<string, string> = {};
    issues.forEach(issue => {
      // Attempt to infer field name from issue message. This is brittle.
      // A better approach is if `sendEmailAction` returns structured field errors.
      if (issue.toLowerCase().includes("name")) fieldErrors.name = issue;
      else if (issue.toLowerCase().includes("email")) fieldErrors.email = issue;
      else if (issue.toLowerCase().includes("message")) fieldErrors.message = issue;
    });
    return fieldErrors;
  }


  return (
    <section id="contact" className="py-20 md:py-32 w-full bg-gradient-to-b from-black via-indigo-950/10 to-black" suppressHydrationWarning>
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
                        suppressHydrationWarning // Added to suppress hydration warnings
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
                        suppressHydrationWarning // Added to suppress hydration warnings
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
                      suppressHydrationWarning // Added to suppress hydration warnings
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
          <SocialIcon href="https://play.google.com/store" icon={Smartphone} label="Play Store" />
          <SocialIcon href="https://x.com" icon={Twitter} label="Twitter" />
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
