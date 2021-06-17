import {useState} from "react";
import { BsFillTrashFill } from 'react-icons/bs'
import moment from 'moment'

const Row = ({_id, story_title, title, story_url, author, created_at, onDeleteStory = f => f}) => {
	const [color, setColor] = useState('#fff')
	const [displayTrash, setDisplayTrash] = useState('none')

	const onMouseOver = () => {
		setColor('#fafafa')
		setDisplayTrash('block')
	}
	const onMouseLeave = () => {
		setColor('#fff')
		setDisplayTrash('none')
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		const today = new Date()
		let yesterday = new Date()
		yesterday = yesterday.setDate(yesterday.getDate() - 1)

		const getOnlyDate = (anyDate) => {
			const anyDateFormatted = new Date(anyDate)
			anyDateFormatted.setHours(0)
			anyDateFormatted.setMinutes(0)
			anyDateFormatted.setSeconds(0, 0)
			return  anyDateFormatted
		}

		// today
		if(getOnlyDate(today).getTime() === getOnlyDate(date).getTime()){
			return moment(date).format('h:mm a')
		}

		// yesterday
		if(getOnlyDate(yesterday).getTime() === getOnlyDate(date).getTime()){
			return 'Yesterday'
		}

		// any day
		return moment(date).format('MMM DD')
	}
	const openInNewTab = (url) => {
		window.open(url, '_blank', 'noopener,noreferrer')
	}

	const style = {
		row: {
			padding: '20px',
			borderBottom: '1px #ccc solid',
			backgroundColor: color,
			margin: '0 20px',
			cursor: 'pointer'
		},
		titleTime: {
			color: '#333',
			fontSize: '13pt',
		},
		author: {
			color: '#999'
		},
		leftColumn: {
			width: '75%', display: 'inline-block',
		},
		middleColumn: {
			width: '20%', display: 'inline-block', textAlign: 'center'

		},
		rightColumn: {
			width: '5%', display: 'inline-block',
			textAlign: 'center'
		},
		iconTrash: {
			display: displayTrash,
		}
	}

	return (
		<div style={style.row} onMouseOver={() => onMouseOver()} onMouseLeave={() => onMouseLeave()} onClick={() => openInNewTab(story_url)}>
			<div style={style.leftColumn}>
				<span style={style.titleTime}>{story_title || title}.</span> <span style={style.author}>- {author} -</span>
			</div>
			<div style={style.middleColumn}>
				<span style={style.titleTime}>{formatDate(created_at)}</span>
			</div>
			<div style={style.rightColumn}>
				<BsFillTrashFill style={style.iconTrash} onClick={() => onDeleteStory(_id)}  />
			</div>
		</div>
	)
}

export default Row
