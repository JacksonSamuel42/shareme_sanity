import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from "react-router-dom"
import { UserAuth } from '../context/AuthContext'
import { shareVideo, logoWhite } from "../assets"
import { client } from '../lib/sanityClient'

const Login = () => {
    const { googleSignIn, user } = UserAuth()
    const navigate = useNavigate()


    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (user !== null) {
            localStorage.setItem('user', JSON.stringify(user))
            const { displayName, uid, photoURL } = user

            const doc = {
                _id: uid,
                _type: 'user',
                userName: displayName,
                image: photoURL
            }

            client.createIfNotExists(doc)
            .then(() => {
                navigate('/', { replace: true })
            })
        }
    }, [user])

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />

                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logoWhite} width="130px" alt="logo" />
                    </div>
                    <div className="shadow-2xl">
                        <button
                            className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                            type='button' 
                            onClick={handleGoogleSignIn}
                        >
                            <FcGoogle className="mr-4" /> Sign in with google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login