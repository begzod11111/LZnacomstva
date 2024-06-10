import classes from './mainInput.module.css'
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {useEffect, useState} from "react";
import classNames from "classnames";

function ImageInput({className, imeSrc, ...props}) {
    const [selectedFile, setSelectedFile] = useState(imeSrc || '');
    const [active, setActive] = useState(false)
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result);
            };
            reader.readAsDataURL(file);
            setActive(true)
        }
    };
    // Если imeSrc изменился и существует, обновляем selectedFile
    useEffect(() => {
        if (imeSrc) {
            setSelectedFile(imeSrc);
            setActive(true);
        }
    }, [imeSrc]);
    let labelClasses = className ? classNames(classes.imageInputLabel, className) : classes.imageInputLabel
    let SVGClasses = classes.imageInputSVG
    let InputClasses = active ? classes.imageActive : ""
    if (active){
        if (className){
            labelClasses = classNames(classes.imageInputLabel, classes.disActiveLabelB, className)
        }
        else {
            labelClasses = classNames(classes.imageInputLabel, classes.disActiveLabelB)
        }
        SVGClasses = classes.disActiveSVG
        InputClasses = classes.imageActive
    }
    return (
        <label className={labelClasses} >
            <input type='file' onChange={handleFileChange}/>
            <img src={selectedFile} className={InputClasses} alt="Photo profile"/>
            <MdOutlineAddPhotoAlternate className={SVGClasses} />
        </label>
    )
}

export default ImageInput