import MainBt from "../../../UI/button/mainBt";
import classes from './personImagesCt.module.css'
import { FcLikePlaceholder } from "react-icons/fc";
import { RiBookmarkLine } from "react-icons/ri";


function PersonImagesCt({images, ...props}) {
    if (images){
        return (
            <div className={classes.personImageCt}>
                <button className={classes.bookmark} type="button"><RiBookmarkLine /></button>
                <MainBt><FcLikePlaceholder className={classes.icon} /></MainBt>

                {images.map(image =>
                    <img className={image['isMain'] ? classes.mainPhoto : ''}
                         src={image['url']}
                         key={image['_id']}
                         alt=""
                    />
                )}
            </div>
        )
    }
}

export default PersonImagesCt