import React from "react";
import MainBt from "./UI/button/mainBt";
import MainInput from "./UI/input/MainInput";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import CheckBoxsGender from "./UI/checkboxGender/checkboxGender";


class MainForm extends React.Component {
    method = this.props.method
    typeForm = this.props.typeForm

    singInFunc = () => {
        axios({
            method: "post",
            url: 'http://127.0.0.1:8000/api/v1/auth/token/login/',
            data: {
        email: "tbegi50@gmail.com",
        password: "qazx12345"
                }
        })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    render() {
        if (!this.typeForm){
            return (
                <h1>Тип формы не выбран</h1>
            )
        }
        else if (this.typeForm === 'sing_in'){
            return (
                <form action="" method={this.method !== "" ? this.method : 'post'}>
                    <MainInput icon={<MdEmail/>} placeholder='Введите электронную почту'/>
                    <MainInput icon={<RiLockPasswordFill/>} placeholder='Введите пароль' type='password'/>
                    <MainBt onClick={this.singInFunc} type='button'>Войти</MainBt>
                    <button className="changePassword" id="change-password" type='button' >Я не помню пароль</button>
                </form>
            )
        }
        return (
            <form action="" method={this.method !== "" ? this.method : 'post'}>
                <MainInput icon={<FaUser/>} placeholder='Ваше имя'/>
                <span className='date-span'>Дата рождения</span>
                <MainInput type='dataTime'/>
                <CheckBoxsGender/>
                <MainInput icon={<MdEmail/>} placeholder='Введите электронную почту'/>
                <MainInput icon={<RiLockPasswordFill/>} placeholder='Введите пароль' type='password'/>
                <MainBt text='Войти'/>
            </form>
        )
    }

}

export default class MainFormCt extends React.Component {
    hText;
    pText;
    render() {
        return (
            <div className="centerFormCt">
                <h1>{this.props.hText}</h1>
                <p>{this.props.pText}</p>
                <MainForm typeForm='sing_in'/>
            </div>
        )
    }
}





// 'http://127.0.0.1:8000/api/v1/auth/token/login/',