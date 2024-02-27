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
                <ListData listData={personData}/>
                <p>О себе</p>
                <div className={classes.aboutMeCt}>
                    {personData['about_me']? personData['about_me'] : 'Не указан'}
                </div>
                <span>На сайте с {dateJoined}</span>
            </div>
        )
    }
}

export default PersonDataCt