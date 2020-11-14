import React, { CSSProperties, ReactNode } from 'react';
import { Badge } from 'antd';
import './index.less';

interface StatusProps {
  className?: string;
  style?: CSSProperties;
  // title?: ReactNode;
  color?: ReactNode;
}

/**
 * 快捷操作，用于快速的展示一个状态
 */
const Status: {
  Success: React.FC<StatusProps>;
  Error: React.FC<StatusProps>;
  Processing: React.FC<StatusProps>;
  Default: React.FC<StatusProps>;
  Warning: React.FC<StatusProps>;
  Custom: React.FC<StatusProps>;
} = {
  Success: ({ children, title }) => <Badge status="success" text={children} />,
  Error: ({ children, title }) => <Badge status="error" text={children} />,
  Default: ({ children, title }) => <Badge status="default" text={children} />,
  Processing: ({ children, title }) => <Badge status="processing" text={children} />,
  Warning: ({ children, title }) => <Badge status="warning" text={children} />,
  Custom: ({ children, title, color }) => <Badge color={color as string} text={children} />,
};

export type StatusType = keyof typeof Status;

export default Status;
