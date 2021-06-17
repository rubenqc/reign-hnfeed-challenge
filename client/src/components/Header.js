
const headerTitle = 'HN Feed'
const headerSubtitle = 'We <3 hacker news!'

const headerStyle = {
	backgroundColor: 'black',
	padding: '30px 25px',
	color: 'white'
}

const titleStyle = {
	fontSize: '60px',
	margin: '20px 0'
}

const Header = () => (
	<header style={headerStyle}>
		<h1 style={titleStyle}>{headerTitle}</h1>
		<h3>{headerSubtitle}</h3>
	</header>
)

export default Header
