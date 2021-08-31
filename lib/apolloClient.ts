import gql, {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import 'cross-fetch/polyfill'

// export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined


const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_URL, // Server URL (must be absolute)
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY
      }
    }),
    cache: new InMemoryCache()
  })
}

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  if (typeof window === 'undefined') return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}
