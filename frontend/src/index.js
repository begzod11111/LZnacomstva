import React from 'react';
import ReactDOM from 'react-dom/client';
import Banners from "./components/main-component";
import DatingLocation from "./components/DatingLocation";
import './css/style.css';
import './css/sing_up.css'
import { MdEmail } from "react-icons/md";
import axios from "axios";
import banner_1 from './img/banner_3.svg'
import banner_2 from './img/banner_4.svg'
import Header from "./components/header";
import reportWebVitals from './reportWebVitals';
import MainFormCt from "./components/mainForm";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainInput from "./components/UI/MainInput";

class SingIn extends React.Component {
    render() {
        return (
            <React.Fragment>
                <DatingLocation/>
                <Header/>
                <Banners class='banner_1' photo={banner_1}/>
                <Banners class='banner_2' photo={banner_2}/>
                <MainFormCt hText='Знакомства без преград' pText='Для современного мира сплочённость команды профессионалов однозначно фиксирует необходимость системы обучения кадров, соответствующей насущным потребностям.'/>
            </React.Fragment>
        )
    }
}

class SingUp extends React.Component {
    render() {
        return (
            <React.Fragment>
                <DatingLocation/>
                <Header/>
                <Banners class='banner_1' photo={banner_1}/>
                <Banners class='banner_2' photo={banner_2}/>
                <MainFormCt hText='Создай новый аккаунт' pText='Присоединяйся к сообществу из 518 млн человек!'/>
            </React.Fragment>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('main-container'));
root.render(
    <SingIn/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
