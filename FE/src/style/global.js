import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}
	
	body {
		width: 100vw;
		height: 100vh;
		background: ${({ theme }) => theme.bgColor};
		color: ${({ theme }) => theme.textColor};
		margin: 0 auto;
	}

	input {
		border: none;
		outline: none;
		background-color: transparent;
	}

	button {
		border: none;
		cursor: pointer;
		background: none;
	}
`;
