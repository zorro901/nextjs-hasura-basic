import { VFC } from 'react'
import { useCreateForm } from '../hooks/useCreateForm'
import { Child } from './Child'

export const CreateUser: VFC = () => {
  const {
    text,
    handleSubmit,
    username,
    usernameChange,
    printMsg,
    handleTextChange
  } = useCreateForm()
  return (
    <>
      {console.log('CreateUser renderd')}
      <p className={'mb-3 font-bold'}>Custom Hook + useCallback + memo</p>
      <div className={'mb-3 flex flex-col justify-center items-center'}>
        <label htmlFor="">Text</label>
        <input className={'px-3 py-2 border border-gray-300'}
               type="text"
               value={text}
               onChange={handleTextChange}/>
      </div>
      <form action=""
            className={'flex flex-col justify-center items-center'}
            onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input type="text"
               className={'mb-3 px-3 py-2 border border-gray-300'}
               placeholder={'New user ?'}
               value={username}
               onChange={usernameChange}/>
        <button
          className={'my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none'}
          type="submit"
        >
          Submit
        </button>
      </form>
      <Child printMsg={printMsg} handleSubmit={handleSubmit}/>
    </>
  )
}