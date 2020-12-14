import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

type PropsType = {
    template?: string,
    color?: string
}

const Preloader: React.FC<PropsType> = ({template, color = '#383333'}) => {
    const FULL_SCREEN = 'FULL_SCREEN';
    const preloader = <Wrapper color={ color }><div></div><div></div></Wrapper>;

    switch (template) {
        case FULL_SCREEN: {
            return (
                <Container>
                    { preloader }
                </Container>
            )
        }
        default: {
            return (
                preloader
            )
        }
    }
}

export default Preloader;


const animation = keyframes `
    0% {
        top: 72px;
        left: 72px;
        width: 0;
        height: 0;
        opacity: 1;
        }
    100% {
        top: 0px;
        left: 0px;
        width: 144px;
        height: 144px;
        opacity: 0;
    }
`

const Wrapper = styled.div `
    display: inline-block;
    position: relative;
    width: 144px;
    height: 144px;
    & div {
        position: absolute;
        border: 4px solid ${ props => props.color };
        opacity: 1;
        border-radius: 50%;
        animation: ${ animation } 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    & div:nth-child(2) {
        animation-delay: -0.5s;
    }

`
const Container = styled.div `
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`