import React, { useState } from 'react';
import { NodeWrapper } from '../components/NodeWrapper';
import { NodeConfig } from '../components/NodeConfig';

interface BaseNodeProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  type: string;
  id: string;
  className?: string;
  children?: React.ReactNode;
}

export function BaseNode({
  icon,
  title,
  description,
  type,
  id,
  className = '',
  children,
}: BaseNodeProps) {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <>
      <NodeWrapper
        id={id}
        title={title}
        description={description}
        icon={icon}
        className={className}
        onConfigClick={() => setShowConfig(true)}
      >
        {children}
      </NodeWrapper>

      <NodeConfig
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
        nodeType={type}
        onSave={(config) => {
          // Handle config save
          setShowConfig(false);
        }}
      />
    </>
  );
}