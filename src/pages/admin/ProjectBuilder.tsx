import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getProjectById, updateProject } from '../../api/admin';
import { WorkflowBuilder } from '../../components/WorkflowBuilder';
import { FormBuilder } from '../../components/FormBuilder';
import { Save, ArrowLeft } from 'lucide-react';

export function ProjectBuilder() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'workflow' | 'forms'>('workflow');

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId!),
    enabled: !!projectId,
  });

  const { mutate: saveProject, isLoading: isSaving } = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      // Show success notification
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </button>
          <h1 className="text-2xl font-bold">{project?.name || 'New Project'}</h1>
        </div>
        <button
          onClick={() => saveProject(project!)}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Project
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('workflow')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'workflow'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Workflow Builder
        </button>
        <button
          onClick={() => setActiveTab('forms')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'forms'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Form Builder
        </button>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
        {activeTab === 'workflow' ? (
          <WorkflowBuilder
            workflow={project?.workflow}
            onChange={(workflow) =>
              saveProject({ ...project!, workflow })
            }
          />
        ) : (
          <FormBuilder
            forms={project?.forms}
            onChange={(forms) =>
              saveProject({ ...project!, forms })
            }
          />
        )}
      </div>
    </div>
  );
}