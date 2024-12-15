import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateTaskAnnotations, submitTask } from '../../api/annotator';
import { FormPreview } from '../../components/FormBuilder/FormPreview';
import { Save, CheckCircle, ArrowLeft } from 'lucide-react';

export function TaskView() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [annotations, setAnnotations] = useState<Record<string, any>>({});

  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById(taskId!),
  });

  const { mutate: saveAnnotations, isLoading: isSaving } = useMutation({
    mutationFn: () => updateTaskAnnotations({ taskId: taskId!, annotations }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
    },
  });

  const { mutate: completeTask, isLoading: isSubmitting } = useMutation({
    mutationFn: () => submitTask(taskId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate('/annotator');
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleAnnotationChange = (fieldId: string, value: any) => {
    setAnnotations((prev) => ({
      ...prev,
      [fieldId]: {
        value,
        timestamp: new Date().toISOString(),
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/annotator')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{task.project.name}</h1>
            <p className="text-gray-600 mt-1">Task ID: {taskId}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => saveAnnotations()}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Progress
            </button>
            <button
              onClick={() => completeTask()}
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Task
            </button>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Annotation Form</h2>
          <FormPreview
            config={task.form}
            onChange={handleAnnotationChange}
            initialValues={task.annotations.reduce(
              (acc: Record<string, any>, curr: any) => ({
                ...acc,
                [curr.fieldId]: curr.value,
              }),
              {}
            )}
          />
        </div>
      </div>
    </div>
  );
}