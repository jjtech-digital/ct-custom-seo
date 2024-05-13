import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import styles from './SimpleTextEditor.module.css';
import { PrimaryButton } from '@commercetools-frontend/ui-kit';

export const SimpleTextEditor = forwardRef((props, ref) => {
  const { value, onValueChange, eventKey, rowIndex, column } = props;
  const updateValue = (val: string) => {
    onValueChange?.(val === '' ? null : val);
  };

  useEffect(() => {
    let startValue;
    if (eventKey === 'Backspace') {
      startValue = '';
    } else if (eventKey && eventKey.length === 1) {
      startValue = eventKey;
    } else {
      startValue = value;
    }
    if (startValue == null) {
      startValue = '';
    }

    updateValue(startValue);

    refInput.current?.focus();
  }, []);

  const refInput = useRef<HTMLInputElement>(null);

  return (
    <div className={`${styles.mySimpleEditorContainer}`}>
      <textarea
        value={value || ''}
        ref={refInput}
        onChange={(e) => updateValue(e.target.value)}
        className={`${styles.mySimpleEditor}`}
      />

      <PrimaryButton
        label="Cancel"
        onClick={() => {
          updateValue(props.initialValue);
          props.stopEditing();
        }}
      />
    </div>
  );
});
