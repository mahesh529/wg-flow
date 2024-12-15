import React from 'react';
import { Save, Undo, Redo, ZoomIn, ZoomOut } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import { useReactFlow } from 'reactflow';

interface WorkflowToolbarProps {
  onSave?: (workflow: any) => void;
}

export function WorkflowToolbar({ onSave }: WorkflowToolbarProps) {
  const { currentWorkflow } = useWorkflowStore();
  const { zoomIn, zoomOut } = useReactFlow();

  const handleSave = () => {
    if (currentWorkflow && onSave) {
      onSave({
        nodes: currentWorkflow.nodes,
        edges: currentWorkflow.edges,
      });
    }
  };

  return (
    <div className="p-4 border-b bg-white flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => zoomIn()}
          className="p-2 hover:bg-gray-100 rounded-md"
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={() => zoomOut()}
          className="p-2 hover:bg-gray-100 rounded-md"
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <div className="h-6 w-px bg-gray-300 mx-2" />
        <button
          onClick={() => {/* Implement undo */}}
          className="p-2 hover:bg-gray-100 rounded-md"
          title="Undo"
        >
          <Undo size={20} />
        </button>
        <button
          onClick={() => {/* Implement redo */}}
          className="p-2 hover:bg-gray-100 rounded-md"
          title="Redo"
        >
          <Redo size={20} />
        </button>
      </div>
      
      <button
        onClick={handleSave}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Workflow
      </button>
    </div>
  );
}