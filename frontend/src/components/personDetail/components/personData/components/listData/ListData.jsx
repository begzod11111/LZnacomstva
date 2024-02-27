import classes from './listData.module.css'


function ListEl({catName, catValue, ...props}) {
    const prefills = {
        'weight': 'кг',
        'height': 'см'
    }
    return (
        <li className={classes.lineElement}>
            <span>{catName}</span>
            <span>
                {(catValue === null || catValue === 'Not Answer') ? 'Не указан' : catValue}
                {(catName in Object.keys(prefills)) ? prefills[catName] : ''}
            </span>
        </li>
    )
}


function ListData({listData, ...props}) {
    const fieldsName = {
        "height": "Рост",
        "weight": "Вес",
        "eye_color": "Цвет волос",
        "hair_color": "Цель глаз",
        'name': 'Цель знакомства'
    }
    const fieldsValue = listData
    const keys = Object.keys(fieldsName)
    return (
        <ul className={classes.listData}>
            {
                keys.map(key => <ListEl
                    catName={fieldsName[key]}
                    catValue={fieldsValue[key]}
                    key={key}
                />)
            }
        </ul>
    )
}

export default ListData;
