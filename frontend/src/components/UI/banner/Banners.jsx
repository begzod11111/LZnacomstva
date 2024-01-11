import classes from './banner.module.css'

export default function Banners(props) {
    return (
        <div className={classes.bannersCt}>
            <img src={props['leftBanner']} alt='banner'/>
            <img src={props['rightBanner']} alt='banner'/>
        </div>
    )

}