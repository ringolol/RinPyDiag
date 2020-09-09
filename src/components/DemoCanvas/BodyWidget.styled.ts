import styled from '@emotion/styled';

export const Body = styled.div`
flex-grow: 1;
display: flex;
flex-direction: column;
min-height: 100%;
`;

export const Header = styled.div`
display: flex;
background: rgb(30, 30, 30);
flex-grow: 0;
flex-shrink: 0;
color: white;
font-family: Helvetica, Arial, sans-serif;
padding: 10px;
align-items: center;
`;

export const Content = styled.div`
display: flex;
flex-grow: 1;
`;

export const Layer = styled.div`
position: relative;
flex-grow: 1;
`;

export const Title = styled.div`
color: white;
font-family: Helvetica, Arial;
padding: 10px;
`;