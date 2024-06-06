import { useContext, useMemo } from 'react'
import CardButton from '../CardButton/CardButton'
import JournalItem from '../JournalItem/JournalItem'
import './JournalList.css'
import { UserContext } from '../../context/UserContextProvider'

export default function JournalList({ items, setItem }) {

	const { userId } = useContext(UserContext)
	const sortItems = (a, b) => a.date > b.date ? 1 : -1
	const filteredItems = useMemo(() => items.filter(el => el.userId == userId).sort(sortItems), [items, userId]) 

	

	if (items.length) return (
		<div className='journal-list'>
			{
				filteredItems.map(item => <CardButton onClick={() => setItem(item)} key={item.id}>
					<JournalItem
						title={item.title}
						text={item.text}
						date={item.date}
					/>
				</CardButton>)}
		</div>
	)
	else return (
		<div className='journal-list'>
			<p>Нет записей</p>
		</div>
	)


}