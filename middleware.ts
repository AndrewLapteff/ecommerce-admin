import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [ '/', '/product/((?!.+\\.[\\w]+$|_next).*)' ],
  // ignoredRoutes: [ "/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/" ],
})

export const config = {
  matcher: [ '/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)' ],
}
