'use client';

import { useState } from 'react';
import { seedDatabase } from './actions';
import { Button } from '@/components/ui/button';

export default function SeedPage() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    setStatus('Seeding...');
    try {
      const result = await seedDatabase();
      setStatus(result.message);
    } catch (error) {
      setStatus('Error seeding database: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Database Setup & Seeding</h1>
      <p className="mb-6 text-gray-400">
        This tool will insert the initial content (Testimonials, Newsletters) into your Supabase database.
        It assumes the tables exist.
      </p>
      
      <Button 
        onClick={handleSeed} 
        disabled={loading}
        className="bg-gold text-black hover:bg-gold/80"
      >
        {loading ? 'Seeding...' : 'Seed Content'}
      </Button>

      {status && (
        <div className="mt-4 p-4 rounded bg-gray-900 border border-gray-700">
          <pre className="whitespace-pre-wrap">{status}</pre>
        </div>
      )}
    </div>
  );
}
