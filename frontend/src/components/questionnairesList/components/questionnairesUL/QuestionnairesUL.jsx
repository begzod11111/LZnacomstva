import MainBt from "../../../UI/button/mainBt";
import classes from './questionnairesUL.module.css'

function QuestionnairesLItem(props) {
    let questionnaire = props['questionnaire'];
    let images = questionnaire.profile.images
    let mainImageUrl;
    let countryImageUrl;
    if (images.length){
        mainImageUrl = 'http://127.0.0.1:8000' + images[0]['image']
        countryImageUrl = 'http://127.0.0.1:8000' + questionnaire.profile['country']['flag']
    }
    return (
        <li>
            <img src={mainImageUrl} alt=''/>
            <div>
                <span className="user-active"></span>
                <h3>{questionnaire.username} {questionnaire.profile.age}</h3>
                <div className="icon-country">
                    <img src={countryImageUrl} alt=""/>
                </div>
                <span className="name-country">{questionnaire.profile['country']['name']}</span>
            </div>
            <MainBt>Cvayp</MainBt>
        </li>
    )
}


function QuestionnairesUL(props) {
    return (
        <ul className={classes.peopleList}>
            {props['questionnaires'].map(item =>
                <QuestionnairesLItem questionnaire={item} key={item.id}/>
            )}
        </ul>
    )
}

export default QuestionnairesUL