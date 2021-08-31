import { VFC } from 'react'
import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

// LocalStateAで作ったものを読みに行く

export const LocalStateB: VFC = () => {
  const todos = useReactiveVar(todoVar)
  return (
    <>
      {todos.map((task, index) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <p className={'mb-3'}>
            {task.title}
          </p>
        )
      })}
      <Link href={'/local-state-a'}>
        <a href="">Back</a>
      </Link>
    </>
  )
}