import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}
	
	html {
		font-size: 10px;	
	}
	
	body {
		width: 100vw;
		height: 100vh;
		background: ${({ theme }) => theme.mode.bgColor};
		color: ${({ theme }) => theme.mode.textColor};
	}
	
	.app {
		@media screen and ${({ theme }) => theme.device.tablet} {
			width: 80%;
			min-width: 768px;
		}

		@media screen and ${({ theme }) => theme.device.laptop} {
			width: 90%;
			max-width: 1824px;
		}
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
	
	a {
		text-decoration: none;
		color: inherit;
		&:focus,
		&:hover,
		&:visited,
		&:link,
		&:active {
			text-decoration: none;
		}
	}
	
`;
