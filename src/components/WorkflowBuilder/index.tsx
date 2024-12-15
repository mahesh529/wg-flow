import React from 'react';
import { WorkflowCanvas } from './WorkflowCanvas';
import { NodePalette } from './NodePalette';
import { WorkflowToolbar } from './WorkflowToolbar';
import { useWorkflowStore } from '../../store/workflowStore';

interface WorkflowBuilderProps {
  workflow?: any;
  onChange?: (workflow: any) => void;
}

export function WorkflowBuilder({ workflow, onChange }: WorkflowBuilderProps) {
  const { setCurrentWorkflow } = useWorkflowStore();

  React.useEffect(() => {
    if (workflow) {
      setCurrentWorkflow({
        id: workflow.id || 'current',
        name: workflow.name || 'Current Workflow',
        nodes: workflow.nodes || [],
        edges: workflow.edges || [],
      });
    }
  }, [workflow, setCurrentWorkflow]);

  return (
    <div className="h-full flex flex-col">
      <WorkflowToolbar onSave={onChange} />
      <div className="flex-1 flex">
        <div className="w-64 border-r overflow-y-auto">
          <NodePalette />
        </div>
        <div className="flex-1">
          <WorkflowCanvas />
        </div>
      </div>
    </div>
  );
}