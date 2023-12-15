import create from 'zustand'

type UserState = {
  username: string
  email: string
  isLoggedIn: boolean
  login: (username: string, email: string) => void
  logout: () => void
}

const useAuth = create<UserState>((set) => ({
  username: '',
  email: '',
  isLoggedIn: false,
  login: (username, email) => {
    set({ username, email, isLoggedIn: true })
  },
  logout: () => {
    set({ username: '', email: '', isLoggedIn: false })
  },
}))

export default useAuth
