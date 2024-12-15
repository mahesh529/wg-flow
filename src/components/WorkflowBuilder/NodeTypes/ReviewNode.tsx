import React from 'react';
import { Handle, Position } from 'reactflow';
import { CheckCircle2 } from 'lucide-react';
import { BaseNode } from './BaseNode';

export function ReviewNode({ data, id }: { data: any; id: string }) {
  return (
    <BaseNode
      icon={<CheckCircle2 size={20} />}
      title={data.label}
      description={data.description}
      type="review"
      id={id}
      className="bg-yellow-50 border-yellow-500"
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </BaseNode>
  );
}