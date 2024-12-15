import { InputNode } from './NodeTypes/InputNode';
import { AnnotationNode } from './NodeTypes/AnnotationNode';
import { ReviewNode } from './NodeTypes/ReviewNode';
import { ValidationNode } from './NodeTypes/ValidationNode';
import { ExportNode } from './NodeTypes/ExportNode';

export const nodeTypes = {
  input: InputNode,
  annotation: AnnotationNode,
  review: ReviewNode,
  validation: ValidationNode,
  export: ExportNode,
};