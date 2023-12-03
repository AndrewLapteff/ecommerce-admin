import { UserButton } from '@clerk/nextjs'

const UserButtonLazy = () => {
  return <UserButton afterSignOutUrl="/" />
}

export default UserButtonLazy
