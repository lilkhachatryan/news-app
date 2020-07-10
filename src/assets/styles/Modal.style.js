import styled from 'styled-components';

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    
    overflow: hidden;
	width: 100%;
	height: 100vh;
	background-color: #969da24a;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1499;
`;

export const ModalContainer = styled.div`
	position: relative;
	z-index: 1500;
	width: 50%;
	height: 80%;
	background-color: #fff;
	border: 0.1rem solid #80808059;
	outline: 0;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	box-shadow: 3px 3px #80808059;
	border-radius: 10px;
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem;
`;

export const ModalTitle = styled.div`
	font-size: 2.5rem;
`;

export const ModalBody = styled.div`
	padding: 2rem;
	display: flex;
	justify-content: center;
`;
