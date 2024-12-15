import React, { useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore } from '../../store/workflowStore';
import { useWorkflowCanvas } from './hooks/useWorkflowCanvas';
import { nodeTypes } from './constants';

function WorkflowCanvasInner() {
  const { currentWorkflow } = useWorkflowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { handleConnect, handleDrop } = useWorkflowCanvas();

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const bounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (bounds) {
      handleDrop(event, bounds);
    }
  };

  if (!currentWorkflow) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No workflow selected</p>
      </div>
    );
  }

  return (
    <div ref={reactFlowWrapper} className="h-full w-full">
      <ReactFlow
        nodes={currentWorkflow.nodes}
        edges={currentWorkflow.edges}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner />
    </ReactFlowProvider>
  );
}