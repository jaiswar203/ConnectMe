import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongo'

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise)
    ,
    session: {
        jwt: true
    },
    secret:process.env.secret,
    providers:[
        GoogleProvider({
            clientId: process.env.googleClientId,
            clientSecret: process.env.googleClientSecret
        }),  
    ],
    callbacks:{
        async jwt(token, account) {
            if (account?.accessToken) {
              token.accessToken = account.accessToken
            }
            return token;
          },
    }
})