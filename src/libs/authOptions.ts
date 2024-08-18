// import { NextAuthOptions, Session, User } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
// import Credentials from 'next-auth/providers/credentials';
// import { otpVerification } from '@/apis/auth/auth';

// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: '/login',
//     newUser: '/register',
//   },
//   providers: [
//     Credentials({
//       name: 'Credentials',
//       credentials: {
//         mobileNumber: { label: 'mobileNumber', type: 'text', placeholder: 'joe' },
//         otp: { label: 'otp', type: 'text' },
//       },
//       async authorize(credentials, req): Promise<User | null> {
//         if (!credentials?.mobileNumber || !credentials?.otp) return null;

//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, trigger, session }: any) {
//       if (trigger === 'update' && session?.name) {
//         token.fullName = session.name;
//         token.user.navigateToRegisterInfo = false;
//       }
//       user && (token.user = user);
//       return token;
//     },
//     async session({
//       session,
//       token,
//       trigger,
//       newSession,
//     }: {
//       session: Session;
//       token: JWT;
//       trigger: any;
//       newSession: any;
//     }) {
//       session.user = {
//         ...session,
//         ...(token && token.user),
//       };

//       if (trigger === 'update') {
//         session.user.fullName = newSession.name;
//         session.user.navigateToRegisterInfo = newSession?.navigateToRegisterInfo;
//       }

//       return session;
//     },
//   },
// };
