
import styles from './JournalForm.module.css'
import Button from '../Button/Button'
import { useContext, useEffect, useReducer, useRef } from 'react'
import classNames from 'classnames'
import calendarImg from '../../assets/calendar.svg'
import folderImg from '../../assets/folder.svg'
import { INITIAL_STATE, formReducer } from './JournalForm.state'
import Input from '../Input/Input'
import { UserContext } from '../../context/UserContextProvider'
import trashBin from '../../assets/trashbin.svg'

export default function JournalForm({ onSubmit, data, onDelete }) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
	const { isValid, isFormReadyToSubmit, values } = formState
	const titleRef = useRef()
	const dateRef = useRef()
	const postRef = useRef()
	const { userId } = useContext(UserContext)

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus()
			break
		case !isValid.date:
			dateRef.current.focus()
			break
		case !isValid.post:
			postRef.current.focus()
			break
		}
	}

	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'CLEAR' })
			dispatchForm({ type: 'SET_VALUE', payload: { userId } })
		}  
		dispatchForm({ type: 'SET_VALUE', payload: { ...data } })
	}, [data, userId])

	useEffect(() => {
		let timerId = null
		if (!isValid.title || !isValid.text || !isValid.date) {
			focusError(isValid)
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' })
			}, 2000)
		}
		return () => {
			clearTimeout(timerId)
			timerId = null
		}
	}, [isValid])

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values)
			dispatchForm({ type: 'CLEAR' })
			dispatchForm({ type: 'SET_VALUE', payload: { userId } })
		}
	}, [isFormReadyToSubmit, onSubmit, values, userId])

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId } })
	}, [userId])

	const addJournalItem = e => {
		e.preventDefault()
		dispatchForm({ type: 'SUBMIT' })
	}

	const onChange = e => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } })
	}
	
	const deleteItem = () => {
		onDelete(data.id)
		dispatchForm({ type: 'CLEAR' })
		dispatchForm({ type: 'SET_VALUE', payload: { userId } })
	}

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input type='text' ref={titleRef} onChange={onChange} name='title' value={values.title} appearence='title' isValid={isValid.title} />
				{data?.id &&
					<button className={styles['delete']} type='button' onClick={() => deleteItem()}>
						<img src={trashBin} alt='Кнопка удалить' />
					</button>
				}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src={calendarImg} alt='Иконка календаря' />
					<span>Дата</span>
				</label>
				<Input type='date' ref={dateRef} onChange={onChange} id='date' value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} name='date' isValid={isValid.date} />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src={folderImg} alt='Иконка папки' />
					<span>Метки</span>
				</label>
				<Input type='text' onChange={onChange} name='tag' id='tag' value={values.tag} />
			</div>
			<textarea name='text' ref={postRef} onChange={onChange} cols={30} rows={10} value={values.text} className={classNames(styles['input'], { [styles.invalid]: !isValid.text })}></textarea>
			<Button>Сохранить</Button>
		</form>
	)
}