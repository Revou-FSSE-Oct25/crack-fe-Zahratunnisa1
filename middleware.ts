import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {},
  {
    callbacks: {
      authorized: ({ token }) => {
        return token?.role === "ADMIN"
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard"],
}
