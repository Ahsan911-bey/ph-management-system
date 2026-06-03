'use client';

import { deleteOrderAction } from '@/app/actions/order';
import { CheckCircle } from 'lucide-react';
import { useTransition } from 'react';

export function CompleteOrderButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    if (window.confirm('Mark this order as completed? This will delete the order from the database.')) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('id', id.toString());
        await deleteOrderAction(formData);
      });
    }
  };

  return (
    <button 
      onClick={handleComplete} 
      disabled={isPending}
      className="p-2 text-green-600 hover:bg-green-50 rounded transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
      title="Complete Order"
    >
      <CheckCircle size={18} />
      <span className="hidden sm:inline">Complete</span>
    </button>
  );
}
