import styled from 'styled-components';

export const ModalBackground = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

export const ModalContainer = styled.div`
	position: relative;
	z-index: 10;
	width: 50%;
	height: 80%;
	background-color: #fff;
	border: 0.1rem solid grey;
	outline: 0;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	box-shadow: 3px 3px 3px solid grey;
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 0.1rem solid grey;
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
