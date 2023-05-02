import React from 'react'
import { Wrapper } from '../../style/global_syle'
import { Background, FormWrap } from './background_login_style'
import { Route , Routes} from 'react-router-dom'
import Login from '../../components/Login'
// import { Switch } from '@mui/material'
// import Login from '../Auth/Login';
// import Verify from '../Auth/Verify';
// import Forgot from '../Auth/Forgot'
// import {Background,FormWrap} from './Style'

export default function Index() {
    const langDirection = "ltr"
    return (
      
        <Wrapper dir={langDirection}>
            <Background>
                <FormWrap>
                    <Routes>
                        <Route  path="/verify" element={"Verify"} exact  />
                        <Route  path="/forgot" element={"Forgot"} exact  />
                        <Route path="/" Component={Login} exact />
                        {/* <Redirect to="/" /> */}
                        </Routes>
                </FormWrap>
            </Background>
        </Wrapper>
    )
}




