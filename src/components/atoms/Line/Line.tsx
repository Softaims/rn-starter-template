import React from 'react';
import { LineProps } from './Line.types';
import { lineVariants } from './Line.variants';

const Line: React.FC<LineProps> = ({ thickness, color, className }) => {
  return (
    <hr className={`${lineVariants({ thickness, color })} ${className ?? ''}`} />
  );
};

export default Line;
