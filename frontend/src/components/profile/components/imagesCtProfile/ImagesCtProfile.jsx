import classes from './imagesCtProfile.module.css'
import ImageInput from "../../../UI/input/ImageInput";

function ImagesCtProfile(props) {
    return (
        <div className={classes.imagesCt}>
            <h2>Профиль</h2>
            <ImageInput className={classes.mainImage}/>
            <ImageInput/>
            <ImageInput/>
            <ImageInput/>
        </div>
    )
}

export default ImagesCtProfile