import React from 'react';

type PreludeStepsProps = {
  children: React.ReactNode;
};

export default function PreludeSteps({ children }: PreludeStepsProps) {
  return (
    <div className="flex flex-col items-start space-y-1">
      {children}
    </div>
  );
}
