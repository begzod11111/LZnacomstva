import classes from './BasicInformationCt.module.css'
import MainInput from "../../../UI/input/MainInput";
import DataTimeInput from "../../../UI/input/DataTimeInput";
import CheckBoxsGender from "../../../UI/checkboxGender/checkboxGender";
import TextareaInput from "../../../UI/input/TextareaInput";
import SelectInput from "../../../UI/input/SelectInput";
import MainBt from "../../../UI/button/mainBt";

function BasicInformationCt({profileData, colorChoices, ...props}) {
    if (!profileData || !colorChoices) {
        return null;
    }
    const foo = (date) => {
      return null
    }
    function passDateTimeToObject(dataTime) {
        let monthNumber = Number(dataTime[1])
        let date = new Date(2000, monthNumber - 1, 1);

    // Используем toLocaleString для получения названия месяца на английском
        return {
            day: Number(dataTime[2]),
            month: date.toLocaleString('en', { month: 'long' }),
            year: Number(dataTime[0])
        };
    }
    let profile = profileData['profile'];
    let date_of_birth = profile['date_of_birth'].split('-');
    return (
        <div className={classes.basicInformationCt}>
                <p>Основная информация</p>
                <span>Имя</span>
                <MainInput defaultValue={profileData['first_name']}/>
                <span>Фамилия</span>
                <MainInput defaultValue={profileData['last_name']}/>
                <span>Дата рождения</span>
                <DataTimeInput defaultValue={passDateTimeToObject(date_of_birth)} collBackFunc={foo}/>
                <span>Пол</span>
                <CheckBoxsGender defaultValue={profileData['gender']}/>
                <p>Личная информация</p>
                <span>Рост</span>
                <MainInput defaultValue={profile['height']}/>
                <span>Вес</span>
                <MainInput defaultValue={profile['weight']}/>
                <span>Цвет волос</span>
                <SelectInput optionsData={colorChoices['hair_colors']} defaultValue={profile['hair_color']}/>
                <span>Цвет глаз</span>
                <SelectInput optionsData={colorChoices['eye_colors']} defaultValue={profile['eye_color']}/>
                <span>Цель знакомства</span>
                <SelectInput/>
                <span>О себе</span>
                <TextareaInput placeholder={profile['about_me'] ? profile['about_me'] : 'Не указанно'}/>
                <p>Аккаунт</p>
                <span>E-mail</span>
                <MainInput defaultValue={profileData['email']}/>
                <span>Пароль</span>
                <MainInput defaultValue='********'/>
                <MainBt>Сохранить</MainBt>
        </div>
    )
}

export default BasicInformationCt