import React, { Component, createRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';

function Camera() {
const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;
    const [fullDesc, setFullDesc] = useState(null)
    const [fecingMode, setFecingMode] = useState(null)
    const webcam = createRef()
    useEffect(() => {
        loadModels();
        setInputDevice();
    }, [])
    const setInputDevice = () => {
        navigator.mediaDevices.enumerateDevices().then(devices => {
        let inputDevice = devices.filter(
            device => device.kind === 'videoinput'
        );
        if (inputDevice.length < 2) {
            setFecingMode('user');
        } else {
            setFecingMode({ exact: 'environment' })
        }
        startCapture();
        });
    };
    const startCapture = () => {
        setInterval(() => {
        capture();
        }, 1500);
    }

    const capture = async () => {
        if (!!webcam.current) {
        console.log(webcam.current.getScreenshot())
        await getFullFaceDescription(
            webcam.current.getScreenshot(),
            inputSize
        ).then(fullDesc => setFullDesc(fullDesc))
        }
    };
    useEffect(() => {
        clearInterval(capture())
    }, [])
    console.log(fullDesc)
    let videoConstraints = null;
    let camera = '';
    if (!!fecingMode) {
        videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: fecingMode
        };
        if (fecingMode === 'user') {
        camera = 'Front';
        } else {
        camera = 'Back';
        }
    }
    return (
        <div>
            <div
        className="Camera"
        style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        }}
    >
        <p>Camera: {camera}</p>
        <div
        style={{
            width: WIDTH,
            height: HEIGHT
        }}
        >
        <div style={{ position: 'relative', width: WIDTH }}>
            {!!videoConstraints ? (
            <div style={{ position: 'absolute' }}>
                <Webcam
                audio={false}
                width={WIDTH}
                height={HEIGHT}
                ref={webcam}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                />
            </div>
            ) : null}
        </div>
        </div>
    </div>
        </div>
    )
}

export default Camera
