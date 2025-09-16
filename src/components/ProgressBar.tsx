import React from 'react';

interface ProgressBarProps
{
  currentSection: number;
  totalSections: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentSection, totalSections }) =>
{
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <div className="bg-slate-200 h-3 rounded-full overflow-hidden ring-1 ring-white/60">
      <div
        className="h-full bg-swiss-red transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
