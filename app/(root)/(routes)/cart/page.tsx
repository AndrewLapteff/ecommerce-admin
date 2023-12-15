import { auth } from '@/lib/auth'
import Cart from './components/cart'

const CartPage = async () => {
  const session = await auth()
  if (!session) return <div>loading...</div>
  if (!session.user) return <div>loading...</div>

  return <Cart userId={session.user.id} />
}

export default CartPage
