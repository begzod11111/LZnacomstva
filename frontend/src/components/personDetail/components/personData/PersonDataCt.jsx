import classes from "./personDataCt.module.css"
import MainBt from "../../../UI/button/mainBt";
import ListData from "./components/listData/ListData";


function PersonDataCt({personData, name, dateJoined, ...props}) {
    if (Object.keys(personData).length) {
        return (
            <div className={classes.personDataCt}>
                <div>
                    <span>{name} {personData['age']}<i className="personActive"></i></span>
                    <MainBt>Нравиться</MainBt>
                </div>
                <p>Данные</p>
                <ListData listData={{
                    'height': personData['height'],
                    'weight': personData['weight'],
                    'eyeСolor': personData['eyeColor'],
                    'hairСolor': personData['hairColor'],
                    'name': personData['goalMeeting']['name']
                }}/>
                <p>О себе</p>
                <div className={classes.aboutMeCt}>
                    {personData['aboutMe']? personData['aboutMe'] : 'Не указан'}
                </div>
                <span>На сайте с {dateJoined}</span>
            </div>
        )
    }
}

export default PersonDataCt