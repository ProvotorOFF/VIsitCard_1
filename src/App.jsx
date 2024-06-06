import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
import JournalList from './components/JournalList/JournalList'
import Body from './components/layouts/Body/Body'
import LeftPanel from './components/layouts/LeftPanel/LeftPanel'
import { UserContextProvider } from './context/UserContextProvider'
import { useLocalStorage } from './hooks/use-localstorage.hook'

function mapItems(items) {
	if (!items) {
		return []
	}
	return items.map(i => ({ ...i, date: new Date(i.date) }))
}


function App() {
	const [data, setData] = useLocalStorage('data')
	const [selectedItem, setSelectedItem] = useState(null)


	const updateData = newItem => {
		if (!newItem.id)
			setData([...mapItems(data), {
				...newItem,
				date: new Date(newItem.date),
				id: (new Date()).getTime()
			}])
		else setData([...mapItems(data).map(item => {
			if (item.id == newItem.id) return {
				...newItem
			}
			else return item
		})])
	}

	const deleteItem = (id) => {
		setData([...data.filter(item => item.id != id)])
	}


	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList items={mapItems(data)} setItem={setSelectedItem} />
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={updateData} data={selectedItem} onDelete={deleteItem}/>
				</Body>
			</div>
		</UserContextProvider>
	)
}

export default App
