import { useCallback } from 'react';
import { useWorkflowStore } from '../../../store/workflowStore';
import { NodeType } from '../../../types/workflow';

export function useWorkflowNode() {
  const { addNode } = useWorkflowStore();

  const createNode = useCallback((type: NodeType, position: { x: number; y: number }) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} stage`,
      },
    };

    addNode(newNode);
  }, [addNode]);

  return { createNode };
}