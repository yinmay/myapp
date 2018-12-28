import React from 'react';

import ToolButton from './ToolButton';
import styles from './TriggerButton.cssmodule.scss';

const TriggerButton = props => {
  const { actived, title, ...origin } = props;

  return (
    <div className={styles.root}>
      <ToolButton
        title={
          <span>
            {title}
            {actived ? (
              <i className="fas fa-fw fa-sort-up" data-fa-transform="down-2" />
            ) : (
              <i className="fas fa-fw fa-sort-down" data-fa-transform="up-4" />
            )}
          </span>
        }
        {...origin}
      />
    </div>
  );
};

export default TriggerButton;
