import classes from './errors.module.css'
import {BiSolidError} from "react-icons/bi";


const ErrorCt = ({errorMessage, errorHeader, ...props}) => {
  return (
      <div className={classes.error}>
        <h3>{<BiSolidError />}Ощибка</h3>
        <p>Page not found</p>
      </div>
  )
}

export default ErrorCt