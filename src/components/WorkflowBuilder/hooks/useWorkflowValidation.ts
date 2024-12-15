import { useCallback } from 'react';
import { Node, Edge } from 'reactflow';
import { validateWorkflow } from '../../../utils/workflowValidation';

export function useWorkflowValidation() {
  const validate = useCallback((nodes: Node[], edges: Edge[]) => {
    const errors = validateWorkflow(nodes, edges);
    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  return { validate };
}