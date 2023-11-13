import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUser } from "./app/lib/server/get-data";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // const parsedCredentials = z.safeParse(credentials);
        // if (parsedCredentials.success) {// }
        const { email, password }: any = credentials;
        const user = await getUser(email);
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // 로그인 성공 시 user 정보가 전달됩니다.
        token = { ...user };
        token.accessToken = user.accessToken; // 이 때 accessToken을 token에 추가합니다.
      }
      return token;
      // return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});
