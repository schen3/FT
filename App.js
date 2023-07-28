import React, { FC, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, View } from 'react-native';
import FU from './src/uploader';
import SelectLang from './src/selectLang';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google';


export default function App() {

  const languageConfig = {
    fileFrom: {
      label: 'FROM',
      countriesFlag: ["US", "ES", "CN", "TW", "FR", "DE", "IT"],
      countryLables: { US: "English", FR: "Français", DE: "Deutsch", IT: "italiano", CN: '中文-简体', TW: '中文-繁體', ES: 'español' },
      placeholder: 'Select source language'
    },
    fileTo: {
      label: 'TO',
      countriesFlag: ["US", "ES", "CN", "TW", "FR", "DE", "IT"],
      countryLables: { US: "English", FR: "Français", DE: "Deutsch", IT: "italiano", CN: '中文-简体', TW: '中文-繁體', ES: 'español' },
      placeholder: 'Select target language'
    }
  }

  const myClientId = '816621343277-1kiue8qkfg9mj8rf93p5kojint9s47ks.apps.googleusercontent.com';
  // const myClientId = '425055892841-lsac708643gco29t9la1ecq1nt0f8pkt.apps.googleusercontent.com'
  const langFromAndTo = (from, lang) => {
    console.log('DataCollection', from, lang);
  };
  const parseJwt = (token) => {
    debugger;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  const [userInfo, setUserInfo] = useState(null);
  const [profileInfo, setProfileInfo] = useState([]);

  return (
    <GoogleOAuthProvider clientId={myClientId}>
      <View style={styles.container} >
        <ImageBackground source={require('/assets/images/bgFT.png')} resizeMode="cover" style={styles.image}>
          <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" style={{ background: 'black', opacity:'90%' }}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  {/* <MenuIcon /> */}
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  File Translate
                </Typography>


                {userInfo ?
                  <div>{userInfo.name}</div>
                  : <Button color="inherit">
                      <GoogleLogin
                        onSuccess={credentialResponse => {
                          const detail = parseJwt(credentialResponse.credential);
                          console.log('userDetail', detail);
                          setUserInfo({ name: detail.name, email: detail.email })
                        }}
                        onError={() => {
                          console.log('Login Failed');
                        }}
                        useOneTap
                      />
                   </Button>}

                <Button
                  color="inherit"
                  onClick={() => {
                    console.log('google logout')
                    googleLogout();
                    setUserInfo(null);
                  }}
                  >
                  Logout<pre>    v5</pre>
                </Button>

              </Toolbar>
            </AppBar>
            {/* <Text style={styles.baseText}></Text> */}
            <div style={styles.selectArea}>
              <SelectLang collection={languageConfig.fileFrom} handleOnSelect={(e) => { langFromAndTo(languageConfig.fileFrom.label, e) }} />
              <SelectLang collection={languageConfig.fileTo} handleOnSelect={(e) => { langFromAndTo(languageConfig.fileTo.label, e) }} />
            </div>
            <div style={{padding: '10px 30px'}}><FU></FU></div>
            <StatusBar style="auto" />
          </Box>          
        </ImageBackground>

      </View >
    </GoogleOAuthProvider >


  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'system-ui',
    width: '100%',
  },
  image: {
    height: '100%'
  },
  baseText: {
    fontSize: 30
  },
  selectArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    width: '100%'
  }
});


