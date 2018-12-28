import React from 'react';
import { Button } from 'antd';

const ToolButton = props => {
  const { title, icon, iconTrans, ...origin } = props;
  return (
    <Button size="small" {...origin}>
      {icon && (
        <i
          className={icon}
          style={{ paddingRight: 4 }}
          data-fa-transform={iconTrans || 'shrink-3'}
        />
      )}
      {title}
    </Button>
  );
};

export default ToolButton;
