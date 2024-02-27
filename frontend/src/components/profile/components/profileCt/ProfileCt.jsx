import classes from "./profileCt.module.css";

function ProfileCt({children, ...props}) {
    return (
        <form {...props} className={classes.profileCt}>
            {children}
        </form>
    )
}

export default ProfileCt