import React from 'react';

import { computeProgressPercentage } from '../../utils';
import {
  ProgressBar0,
  ProgressBar25,
  ProgressBar50,
  ProgressBar75,
  ProgressBar100,
} from '../Shared';

export const ProgressBar = ({
  glassesTotalAmount,
  currentGlassesCounter,
}: {
  glassesTotalAmount: number;
  currentGlassesCounter: number;
}) => {
  const percentile = computeProgressPercentage(
    glassesTotalAmount,
    currentGlassesCounter
  );

  switch (percentile) {
    case 0:
      return <ProgressBar0 />;
    case 25:
      return <ProgressBar25 />;
    case 50:
      return <ProgressBar50 />;
    case 75:
      return <ProgressBar75 />;
    case 100:
      return <ProgressBar100 />;
  }
};
