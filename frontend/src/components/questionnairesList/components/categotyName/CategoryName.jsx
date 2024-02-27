import classes from './categoryName.module.css'
import { Link } from 'react-router-dom'

function CategoryName(props) {
    const url = `/goal-meeting/${props['url']}`
    return (
        <Link to={url} className={classes.categoryName}>{props.category}</Link>
    )
}

export default CategoryName