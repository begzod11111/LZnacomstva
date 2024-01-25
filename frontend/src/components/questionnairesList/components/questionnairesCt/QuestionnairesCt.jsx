import classes from './questionnairesCt.module.css'

function QuestionnairesCt({children, ...props}) {
    return (
        <div className={classes.peopleListCt}>
            {children}
        </div>
    )
}

export default QuestionnairesCt