import { useCallback } from 'react';
import { Connection, useReactFlow } from 'reactflow';
import { useWorkflowStore } from '../../../store/workflowStore';
import { NodeType } from '../../../types/workflow';
import { useWorkflowNode } from './useWorkflowNode';

export function useWorkflowCanvas() {
  const { project } = useReactFlow();
  const { addEdge: addWorkflowEdge } = useWorkflowStore();
  const { createNode } = useWorkflowNode();

  const handleConnect = useCallback(
    (connection: Connection) => {
      const newEdge = {
        id: `e${connection.source}-${connection.target}`,
        source: connection.source!,
        target: connection.target!,
      };
      addWorkflowEdge(newEdge);
    },
    [addWorkflowEdge]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent, bounds: DOMRect) => {
      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      if (type) {
        const position = project({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });

        createNode(type, position);
      }
    },
    [project, createNode]
  );

  return {
    handleConnect,
    handleDrop,
  };
}