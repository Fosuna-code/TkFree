import { useEffect, useState } from 'react';

import logo from '../assets/perfil-registro/logo.png'
import facebook from '../assets/perfil-registro/facebook.png'
import google from '../assets/perfil-registro/google.png'
import user from '../assets/perfil-registro/usericon.png'
import email from '../assets/perfil-registro/emailicon.png'
import password from '../assets/perfil-registro/passicon.png'
import phone from '../assets/perfil-registro/phoneicon.png'
import background from '../assets/perfil-registro/background.png'

import './Singup.scss'



function SingUp(open:boolean){
  return(
    <div className={`container ${open? '' : 'none'}`}>
        <div className='singUpContainer'>
        <img src={logo} alt="Logo-Image" className='logo' />
        <h1 className='title'>TK-FREE,  experimenta la libertad con seguridad</h1>
        <form action="" className='form'>
          <div className='form_input'>
            <label htmlFor="name" className='form_label'>Nombre <span className='md'>*</span></label>
            <div>
              <input className ='input' id ="name"></input>
              <img src={user} alt="user icon" className='usericon'/>
            </div>
            
          </div>
          <div className='form_input'>
            <label htmlFor="email"className='form_label'>Correo electronico <span className='md'>*</span></label>
            <div>
              <input className ='input' id ="email"></input>
              <img src={email} alt="" className='emailicon'/>
            </div>
          </div>  
          <div className='form_input'>
            <label htmlFor="password"className='form_label'>Contrasena <span className='md'>*</span></label>
            <div>
              <input className ='input' id ="password"></input>
              <img src={password} alt="" className='passicon'/>

            </div>
          </div>
          <div className='form_input'>
            <label htmlFor="tel"className='form_label'>Telefono <span className='md'>*</span></label>
            <div>
              <input className ='input' id ="nombre"></input>
              <img src={phone} alt="" className='phoneicon'/>

            </div>
          </div>
          <div className='form_input'>
            <label htmlFor="address"className='form_label'>Internet identity <span className='md'>*</span></label>
            <input className ='input' id ="address"></input>
          </div>
          <input className ='input' id ="event" placeholder='Eventos de interes'></input>
          <button className='submit'>Crear cuenta</button>
          {/* <p className='alternatives'><hr className='line'/>O registrate en <hr className='line'/></p> */}
          {/* <div className='alternativesContainer'>
            <button className='google alternativeButton'><img className='alternative_icon google' src={google} alt="google"/><span className='iconText'>google</span></button>
            <button className='facebook alternativeButton'><img className='alternative_icon' src={facebook} alt="facebook" /><span className='iconText'>facebook</span></button>
          </div> */}
          
          
        </form>
      </div>
      <img src={background} alt="" className='background'/>
    </div>
  

)}

export default SingUp;