import React, { useEffect } from 'react'
import styled from 'styled-components'
import { selectUserName , setUserLogin, setSignOut} from "../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { auth, provider } from '../firebase'
import { useHistory } from 'react-router-dom'

function Header() {
    const userName = useSelector(selectUserName); 
    const history = useHistory()
    const dispatch = useDispatch()
    
    useEffect(() => {
        auth.onAuthStateChanged(async(user) => {
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
            }
            history.push('/')
        })
    },[dispatch,history]);
    
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((res) => {
            let user = res.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
        })
    }
    
    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut());
            history.push('/login')
        })
        history.push('/');
    }
    return (
        <Nav>
            <Logo src='/images/logo.svg' />
            { !userName ? (
                <LoginContainer>
                    <Login onClick={signIn}>Login</Login>
                </LoginContainer>
                 ): 
                <>
                <Navmenu>
                <a href>
                    <img src='/images/home-icon.svg' alt="home-icon"/>
                    <span>HOME</span>
                </a>
                <a href>
                    <img src='/images/search-icon.svg' alt="searchIcon"/>
                    <span>SEARCH</span>
                </a>
                <a href>
                    <img src='/images/watchlist-icon.svg' alt="watchlishtIcon"/>
                    <span>WATCHLIST</span>
                </a>
                <a href>
                    <img src='/images/original-icon.svg' alt="originalIcon"/>
                    <span>ORIGINALS</span>
                </a>
                <a href>
                    <img src='/images/movie-icon.svg' alt="movieIcon"/>
                    <span>MOVIES</span>
                </a>
                <a href>
                    <img src='/images/series-icon.svg' alt="seriesIcon"/>
                    <span>SERIES</span>
                </a>
            </Navmenu>
            <UserImg  onClick={signOut} src='/images/logo.jpg'/>
            </>
            }
            
        </Nav>
    )
}

export default Header

const Nav = styled.nav` 
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px
    overflow-x: hidden;
`
const Logo = styled.img `
    width: 80px;
    margin-left: 5rem;
    cursor:pointer;
`
const Navmenu = styled.div`
    display : flex;
    flex:1;
    margin-left: 4rem;
    align-items: center;
    a {
        display : flex;
        align-items : center;
        padding: 0 12px;
        cursor: pointer;

        img {
            height : 20px
        }

        span {
            font-size: 13px;
            letter-spacing: 1.5px;
            position: relative;
            
            &:after {
                content: '';
                height: 2px;
                background: white;
                position : absolute; 
                opacity : 0;
                left: 0;
                right: 0;
                bottom: -6px;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }
        &:hover{
            span:after{
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`

const UserImg = styled.img`
    cursor: pointer;
    width: 48px;
    Height: 48px;
    margin-right: 5rem;
    border-radius: 50% 
`

const Login = styled.div`
    
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    cursor : pointer;


    &:hover {

        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }

`

const LoginContainer = styled.div`
    display: flex;
    flex : 1;
    justify-content: flex-end;
`