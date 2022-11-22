import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}
	
	html {
		font-size: 10px;	
	}
	
	body {
		width: 100%;
		height: 100%;
		margin: 0;
		background: ${({ theme }) => theme.mode.bgColor};
		color: ${({ theme }) => theme.mode.textColor};
		transition-property: background-color, color;
		transition-duration: 0.5s;
		font-family: 'Gamja Flower';
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
		box-sizing: border-box;
		font-family: 'Gamja Flower';
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
