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
		margin: 0;
		overflow-x: hidden;
		background: ${({ theme }) => theme.mode.bgColor};
		color: ${({ theme }) => theme.mode.textColor};
		transition-property: background-color, color;
		transition-duration: 0.5s;
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
		font-family: 'Gamja Flower';
		box-sizing: border-box;
	}

	button {
		border: none;
		cursor: pointer;
		background: none;
		font-family: 'Gamja Flower';
		padding: 0;
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
