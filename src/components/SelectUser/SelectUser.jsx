import { useContext } from 'react'
import { UserContext } from '../../context/UserContextProvider'
import styles from './SelectUser.module.css'

export default function SelectUser() {

	const { userId, setUserId } = useContext(UserContext)

	const changeUser = e => {
		setUserId(+e.target.value)
	}

	return (
		<select className={styles['select']} name='user' id='user' value={userId} onChange={changeUser}>
			<option value='1'>Антон</option>
			<option value='2'>Вася</option>
		</select>)
}