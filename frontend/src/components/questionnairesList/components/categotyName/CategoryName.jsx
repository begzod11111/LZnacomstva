import classes from './categoryName.module.css'

function CategoryName(props) {
    return (
        <p className={classes.categoryName}>{props.category}</p>
    )
}

export default CategoryName