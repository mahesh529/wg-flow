import React from 'react';
import { Handle, Position } from 'reactflow';
import { FileInput } from 'lucide-react';
import { BaseNode } from './BaseNode';

export function InputNode({ data, id }: { data: any; id: string }) {
  return (
    <BaseNode
      icon={<FileInput size={20} />}
      title={data.label}
      description={data.description}
      type="input"
      id={id}
      className="bg-green-50 border-green-500"
    >
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </BaseNode>
  );
}