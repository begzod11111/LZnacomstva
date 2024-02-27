import classes from './BasicInformationCt.module.css'
import MainInput from "../../../UI/input/MainInput";
import DataTimeInput from "../../../UI/input/dataTimeInput";
import CheckBoxsGender from "../../../UI/checkboxGender/checkboxGender";

function BasicInformationCt({...props}) {
    return (
        <div className={classes.basicInformationCt}>
            <p>Основная информация</p>
            <span>Имя</span>
            <MainInput/>
            <span>Дата рождения</span>
            <DataTimeInput/>
            <span>Пол</span>
            <CheckBoxsGender/>
            <p>Личная информация</p>
            <span>Рост</span>
            <MainInput/>
            <span>Рост</span>
            <MainInput/>
            <span>Рост</span>
            <MainInput/>
            <span>Рост</span>
            <MainInput/>
            <span>Рост</span>
            <MainInput/>
        </div>
    )
}

export default BasicInformationCt