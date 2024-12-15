import { useCallback, useRef } from 'react';
import { Node, Edge } from 'reactflow';
import { useWorkflowStore } from '../../../store/workflowStore';

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

export function useWorkflowHistory() {
  const history = useRef<HistoryState[]>([]);
  const currentIndex = useRef(-1);
  const { currentWorkflow, setCurrentWorkflow } = useWorkflowStore();

  const pushHistory = useCallback(() => {
    if (!currentWorkflow) return;

    currentIndex.current++;
    history.current = history.current.slice(0, currentIndex.current);
    history.current.push({
      nodes: currentWorkflow.nodes,
      edges: currentWorkflow.edges,
    });
  }, [currentWorkflow]);

  const undo = useCallback(() => {
    if (currentIndex.current <= 0) return;

    currentIndex.current--;
    const previousState = history.current[currentIndex.current];
    setCurrentWorkflow({
      ...currentWorkflow!,
      nodes: previousState.nodes,
      edges: previousState.edges,
    });
  }, [currentWorkflow, setCurrentWorkflow]);

  const redo = useCallback(() => {
    if (currentIndex.current >= history.current.length - 1) return;

    currentIndex.current++;
    const nextState = history.current[currentIndex.current];
    setCurrentWorkflow({
      ...currentWorkflow!,
      nodes: nextState.nodes,
      edges: nextState.edges,
    });
  }, [currentWorkflow, setCurrentWorkflow]);

  return { pushHistory, undo, redo };
}