'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { subscribeToNewsletter } from '@/app/actions';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  label?: string;
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive' | 'default';
  className?: string;
  fullWidth?: boolean;
}

function SubmitButton({ label = 'Subscribe →', variant = 'primary', className, fullWidth }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      size="lg" 
      type="submit" 
      variant={variant as any} 
      disabled={pending}
      className={`${className} ${fullWidth ? 'w-full' : ''}`}
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Subscribing...' : label}
    </Button>
  );
}

interface NewsletterFormProps {
  source?: string;
  buttonLabel?: string;
  buttonVariant?: 'primary' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive' | 'default';
  className?: string;
  layout?: 'row' | 'column';
}

export function NewsletterForm({ 
  source = 'website', 
  buttonLabel = 'Subscribe →', 
  buttonVariant = 'primary', 
  className = '',
  layout = 'row'
}: NewsletterFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  async function clientAction(formData: FormData) {
    const result = await subscribeToNewsletter(null, formData);
    setMessage(result.message);
    setIsSuccess(result.success);
  }

  if (isSuccess) {
     return (
        <div className={`text-center p-4 bg-green-50/10 border border-green-500/20 rounded-lg text-green-600 ${className}`}>
            <p className="font-medium">{message}</p>
        </div>
     );
  }

  return (
    <form 
      action={clientAction} 
      className={`flex ${layout === 'column' ? 'flex-col' : 'flex-col sm:flex-row'} gap-4 ${className}`}
    >
      <input type="hidden" name="source" value={source} />
      <div className="flex-1 w-full">
        <input 
            type="email" 
            name="email"
            placeholder="Your Email Address" 
            className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            required 
        />
        {message && !isSuccess && (
            <p className="text-red-500 text-sm mt-2">{message}</p>
        )}
      </div>
      <SubmitButton 
        label={buttonLabel} 
        variant={buttonVariant} 
        fullWidth={layout === 'column'}
      />
    </form>
  );
}
