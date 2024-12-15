import React from 'react';
import { Handle, Position } from 'reactflow';
import { FileOutput } from 'lucide-react';
import { BaseNode } from './BaseNode';

export function ExportNode({ data, id }: { data: any; id: string }) {
  return (
    <BaseNode
      icon={<FileOutput size={20} />}
      title={data.label}
      description={data.description}
      type="export"
      id={id}
      className="bg-red-50 border-red-500"
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
    </BaseNode>
  );
}