import React from 'react';
import { Handle, Position } from 'reactflow';
import { ShieldCheck } from 'lucide-react';
import { BaseNode } from './BaseNode';

export function ValidationNode({ data, id }: { data: any; id: string }) {
  return (
    <BaseNode
      icon={<ShieldCheck size={20} />}
      title={data.label}
      description={data.description}
      type="validation"
      id={id}
      className="bg-purple-50 border-purple-500"
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </BaseNode>
  );
}