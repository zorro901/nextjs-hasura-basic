import { VFC, useState, FormEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER
} from '../queries/queries'
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation
} from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const HasuraCRUD: VFC = () => {
  const {data, error} = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network'
  })
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER)
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, {data: {insert_users_one}}) {
      const cacheId = cache.identify(insert_users_one)
      cache.modify({
        fields: {
          users(existingUsers, {toReference}) {
            return [toReference(cacheId), ...existingUsers]
          }
        }
      })
    }
  })
  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, {data: {delete_users_by_pk}}) {
      cache.modify({
        fields: {
          users(existingUsers, {readField}) {
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField('id', user)
            )
          }
        }
      })
    }
  })


  return (
    <Layout title={'Hasura CRUD'}>
      <p className={'mb-3 font-bold'}>Hasura CRUD</p>
    </Layout>

  )
}