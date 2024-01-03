export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const privatePage = (nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/slots'));
        if (privatePage) {
          if (isLoggedIn) return true;
          return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      return true;
    },
    async jwt({ token, user }) {
        user && (token.user = user)
        return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = token.user
      
      return session
    }
  },
  providers: [], // Add providers with an empty array for now
}