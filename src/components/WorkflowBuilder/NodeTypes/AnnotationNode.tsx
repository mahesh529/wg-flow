import React from 'react';
import { Handle, Position } from 'reactflow';
import { PenTool } from 'lucide-react';
import { BaseNode } from './BaseNode';

export function AnnotationNode({ data, id }: { data: any; id: string }) {
  return (
    <BaseNode
      icon={<PenTool size={20} />}
      title={data.label}
      description={data.description}
      type="annotation"
      id={id}
      className="bg-blue-50 border-blue-500"
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </BaseNode>
  );
}