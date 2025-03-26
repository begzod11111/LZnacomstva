import React from 'react';
import classes from './TextareaInput.module.css';

const TextareaInput = React.forwardRef(({ defaultValue, onChange, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            defaultValue={defaultValue || ''}
            onChange={onChange}
            className={classes.textareaInput}
            {...props}
        />
    );
});

export default TextareaInput;