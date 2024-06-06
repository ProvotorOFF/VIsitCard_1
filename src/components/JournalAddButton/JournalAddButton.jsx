import CardButton from '../CardButton/CardButton'
import './JournalAddButton.css'
import plus from '../../assets/plus.svg'


export default function JournalAddButton({clearForm}) {

	return (
		<CardButton className='journal-add' onClick={clearForm}>
			<img className='plus' src={plus} alt='Плюс' />
			Новое воспоминание
		</CardButton>
	)

}