
import { forwardRef, useEffect, useRef } from 'react';
import styles from './SimpleTextEditor.module.css';

export const SimpleTextEditor =  forwardRef(({ value, onValueChange, eventKey, rowIndex, column }, ref) => {
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
        <textarea value={value || ''}
            ref={refInput}
            onChange={(event) => updateValue(event.target.value)}
            className={`${styles.mySimpleEditor}`} />
    );
})