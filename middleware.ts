import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [ '/api/stores' ]
})

export const config = {
  matcher: [ '/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)' ],
}
