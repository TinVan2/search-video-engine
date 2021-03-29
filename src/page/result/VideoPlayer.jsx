import React, { useCallback, useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import { parseSync } from 'subtitle';

const trackfile = `WEBVTT
00:00:00.000 --> 00:00:00.500

00:00:02.000 --> 00:00:05.900
This is example of video captions. 

00:00:07.045 --> 00:00:12.900
Captions (subtitles) can be supplied with XML file in Web Video Text Track (VTT) format. 

00:00:13.000 --> 00:00:19.900
<i>Captions can be formatted with basic HTML styles. </i>

00:00:20.378 --> 00:00:26.900
<b>You can set captions font Bold </b>

00:00:26.100 --> 00:00:31.000
<i>You can set captions font style Italic </i>

00:00:31.100 --> 00:00:35.000
<u>You can set captions text underlined! </u>

00:00:35.100 --> 00:00:39.000
You can use multiple formatting types for single caption!
Now you see <i>italic</i> <b>bold</b> text. 

00:00:39.100 --> 00:00:43.000
Multi
Lines
Supported 

00:00:43.100 --> 00:00:48.000
Captions settings panel allows to define captions colors, background, font, shadow etc. 

00:00:48.100 --> 00:00:54.000
Copyright 2008-2019 Nuevolab.com`;

const generateSubtitle = (nodeTitle, currentTime, onClick) =>
    nodeTitle
        .filter((node) => node && node.type !== 'header')
        .map((caption) => {
            const { data } = caption;
            const { start, end, text } = data;
            const isActive = currentTime * 1000 >= start && currentTime * 1000 < end;

            return (
                <>
                    {isActive ? (
                        <span
                            key={text}
                            style={{ color: 'rebeccapurple' }}
                            dangerouslySetInnerHTML={{
                                __html: text
                            }}
                        />
                    ) : (
                        <span
                            key={text}
                            onClick={onClick}
                            data-start={start / 1000}
                            dangerouslySetInnerHTML={{
                                __html: text
                            }}
                        />
                    )}
                </>
            );
        });

const VideoPlayer = (props) => {
    const videoRef = useRef();
    const playerRef = useRef();
    const [currentTime, setCurrentTime] = useState(0);
    const [nodeTitle, setNodeTitle] = useState([]);

    useEffect(() => {
        const arrCaptions = parseSync(trackfile);
        setNodeTitle(arrCaptions);
        console.log('arrCaptions', arrCaptions);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            playerRef.current = videojs(videoRef.current, props, () => {
                console.log('your player is ready', playerRef.current);
                // auto play video
                playerRef.current.play();

                // event listener
                playerRef.current.on('ended', () => {
                    videojs.log('Awww over so soon?');
                });

                playerRef.current.on('timeupdate', () => {
                    const time = playerRef.current.currentTime();
                    setCurrentTime(time);
                    videojs.log('currentTime', playerRef.current.currentTime());
                });
            });
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856

    const loadVideoAtTime = useCallback((event) => {
        const { start } = event.currentTarget.dataset;
        setCurrentTime(start);
        playerRef.current.currentTime(start);
    }, []);

    const subtitle = generateSubtitle(nodeTitle, currentTime, loadVideoAtTime);

    return (
        <div>
            <div data-vjs-player>
                <video
                    id="video-search-engine"
                    ref={videoRef}
                    className="video-js mx-auto"
                    controls
                    preload="auto"
                    width="640"
                    height="360"
                >
                    <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
                    <track
                        label="English"
                        kind="captions"
                        srclang="en"
                        src="https://kot-politiken.s3-eu-west-1.amazonaws.com/2019/114_en.vtt.txt"
                        default
                    />
                </video>
            </div>
            <div className="mt-3">{subtitle}</div>
        </div>
    );
};

export default VideoPlayer;
