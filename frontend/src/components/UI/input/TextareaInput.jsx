import classes from './mainInput.module.css'

function TextareaInput({children, ...props}) {
    return (
        <textarea {...props} className={classes.textareaInput}/>
    )
}

export default TextareaInput