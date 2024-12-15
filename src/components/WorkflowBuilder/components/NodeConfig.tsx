import React from 'react';
import { X } from 'lucide-react';
import { NodeType } from '../../../types/workflow';

interface NodeConfigProps {
  isOpen: boolean;
  onClose: () => void;
  nodeType: NodeType;
  initialConfig?: Record<string, any>;
  onSave: (config: Record<string, any>) => void;
}

export function NodeConfig({
  isOpen,
  onClose,
  nodeType,
  initialConfig = {},
  onSave,
}: NodeConfigProps) {
  const [config, setConfig] = React.useState(initialConfig);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Configure {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Add configuration fields based on node type */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
}