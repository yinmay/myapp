import React from 'react';
import { Button } from 'antd';

const ToolButtonEdit = props => {
  const { title, icon, iconTrans, loading, ...origin } = props;
  const loadingIcon = (
    <i
      className="fas fa-fw fa-spin fa-spinner"
      style={{ paddingRight: 4 }}
      data-fa-transform={iconTrans || 'shrink-3'}
    />
  );
  return (
    <Button size="small" disabled={loading} {...origin}>
      {(loading && loadingIcon) ||
        (icon && (
          <i
            className={icon}
            style={{ paddingRight: 4 }}
            data-fa-transform={iconTrans || 'shrink-3'}
          />
        ))}
      {title}
    </Button>
  );
};

export default ToolButtonEdit;
