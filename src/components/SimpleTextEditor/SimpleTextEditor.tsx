import { forwardRef, useEffect, useRef } from 'react';
import styles from './SimpleTextEditor.module.css';
import { PrimaryButton } from '@commercetools-frontend/ui-kit';

interface SimpleTextEditorProps {
  value: string | null;
  onValueChange: (value: string | null) => void;
  eventKey: string | null;
  rowIndex?: number;
  column?: string;
  initialValue: string;
  stopEditing: () => void;
}

export const SimpleTextEditor = forwardRef<
  HTMLInputElement,
  SimpleTextEditorProps
>((props, ref) => {
  const { value, onValueChange, eventKey } = props;
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

  const refInput = useRef<HTMLTextAreaElement>(null);

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
