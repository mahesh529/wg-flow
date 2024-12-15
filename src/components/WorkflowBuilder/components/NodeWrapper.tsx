import React from 'react';
import { Settings2, Trash2 } from 'lucide-react';
import { useWorkflowStore } from '../../../store/workflowStore';

interface NodeWrapperProps {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  onConfigClick?: () => void;
}

export function NodeWrapper({
  id,
  title,
  description,
  icon,
  className = '',
  children,
  onConfigClick,
}: NodeWrapperProps) {
  const { removeNode } = useWorkflowStore();

  return (
    <div className={`px-4 py-2 rounded-lg shadow-md border-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <h3 className="font-semibold">{title}</h3>
            {description && <p className="text-sm text-gray-600">{description}</p>}
          </div>
        </div>
        
        <div className="flex gap-2">
          {onConfigClick && (
            <button
              onClick={onConfigClick}
              className="p-1 hover:bg-gray-200 rounded-full"
              title="Settings"
            >
              <Settings2 size={16} />
            </button>
          )}
          <button
            onClick={() => removeNode(id)}
            className="p-1 hover:bg-gray-200 rounded-full"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}