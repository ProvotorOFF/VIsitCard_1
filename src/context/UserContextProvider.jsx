import { createContext, useState } from 'react'

export const UserContext = createContext({
	userId: 1
})


export const UserContextProvider = ({ children }) => {
	const [userId, setUserId] = useState(2)

	return <UserContext.Provider value={{ userId, setUserId }}>
		{children}
	</UserContext.Provider>
} 