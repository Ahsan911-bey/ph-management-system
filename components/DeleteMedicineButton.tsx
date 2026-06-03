'use client';

import { deleteMedicineAction } from '@/app/actions/medicine';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

export function DeleteMedicineButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('id', id.toString());
        const res = await deleteMedicineAction(formData);
        if (res?.error) {
          window.alert(res.error);
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending}
      className="p-2 text-red-600 hover:bg-red-50 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Trash2 size={18} />
    </button>
  );
}
