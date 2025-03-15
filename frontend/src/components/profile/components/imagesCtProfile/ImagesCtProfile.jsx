import classes from './imagesCtProfile.module.css'
import ImageInput from "../../../UI/input/ImageInput";

function ImagesCtProfile({imagesArr}) {
    if (!imagesArr) {
        return null;
    }

    const images = imagesArr?.images || [];
    // Создаем массив из 5 элементов
    const inputs = Array(5).fill(null);
    return (
        <div className={classes.imagesCt}>
            <h2>Профиль</h2>
            {inputs.map((_, index) => {
                // Получаем изображение по индексу или используем null, если изображение не существует
                const image = images[index] || null;
                // Используем уникальный идентификатор изображения в качестве ключа, если он доступен
                return <ImageInput
                    key={index}
                    imeSrc={image?.url}
                    className={image?.isMain ? classes.mainImage : ''} />;
            })}

        </div>
    )
}

export default ImagesCtProfile