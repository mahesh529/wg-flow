import { create } from 'zustand';
import { Node, Edge } from 'reactflow';
import { Workflow } from '../types/workflow';

interface WorkflowState {
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  addWorkflow: (workflow: Workflow) => void;
  setCurrentWorkflow: (workflow: Workflow) => void;
  addNode: (node: Node) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;
  updateEdge: (id: string, updates: Partial<Edge>) => void;
  clear: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  workflows: [],
  currentWorkflow: null,
  
  addWorkflow: (workflow) =>
    set((state) => ({ workflows: [...state.workflows, workflow] })),
  
  setCurrentWorkflow: (workflow) => set({ currentWorkflow: workflow }),
  
  addNode: (node) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            nodes: [...state.currentWorkflow.nodes, node],
          }
        : null,
    })),
  
  updateNode: (id, updates) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            nodes: state.currentWorkflow.nodes.map((node) =>
              node.id === id ? { ...node, ...updates } : node
            ),
          }
        : null,
    })),
  
  removeNode: (id) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            nodes: state.currentWorkflow.nodes.filter((node) => node.id !== id),
            edges: state.currentWorkflow.edges.filter(
              (edge) => edge.source !== id && edge.target !== id
            ),
          }
        : null,
    })),
  
  addEdge: (edge) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            edges: [...state.currentWorkflow.edges, edge],
          }
        : null,
    })),
  
  updateEdge: (id, updates) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            edges: state.currentWorkflow.edges.map((edge) =>
              edge.id === id ? { ...edge, ...updates } : edge
            ),
          }
        : null,
    })),
  
  removeEdge: (id) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            edges: state.currentWorkflow.edges.filter((edge) => edge.id !== id),
          }
        : null,
    })),
  
  clear: () => set({ currentWorkflow: null }),
}));