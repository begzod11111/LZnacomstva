import classes from './imagesCtProfile.module.css'
import ImageInput from "../../../UI/input/ImageInput/ImageInput";
import { useEffect, useState } from "react";

function ImagesCtProfile({ imagesArr, setFormData }) {
    const images = imagesArr?.images || [];
    const [files, setFiles] = useState([]);

    // Обновляем formData при изменении files
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            images: files
        }));

    }, [files, setFormData]);

    if (!imagesArr) {
        return null;
    }

    const inputs = Array(5).fill(null);

    return (
        <div className={classes.imagesCt}>
            <h2>Профиль</h2>
            {inputs.map((_, index) => {
                const image = images[index] || null;

                return (
                    <ImageInput
                        key={index}
                        imeSrc={image?.url} // Предполагается, что это начальное значение изображения
                        className={image?.isMain ? classes.mainImage : ''}
                        callBack={(file) => {
                            if (file) {
                                let result = {};
                                if (images[index]) {
                                    result['isNew'] = false;
                                    result['id'] = images[index]._id;
                                } else {
                                    result['isNew'] = true;
                                }
                                result['file'] = file.file;
                                setFiles(prev => [...prev.slice(0, index), result, ...prev.slice(index + 1)]);
                            }
                        }}
                    />
                );
            })}
        </div>
    );
}

export default ImagesCtProfile;