/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'
import { handlers } from '../mock/handlers'
import 'setimmediate'

initTestHelpers()

const server = setupServer(...handlers)
beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})
describe('Hasura SSG Test Cases', () => {
  it('Should render the list of users pre-fetched by getStaticProps', async () => {
    const {page} = await getPage({
      route: '/hasura-ssg'
    })
    render(page)
    expect(await screen.findByText('SSG+ISR')).toBeInTheDocument()
    expect(screen.getByText('Test user A')).toBeInTheDocument()
    expect(screen.getByText('Test user B')).toBeInTheDocument()
    expect(screen.getByText('Test user C')).toBeInTheDocument()
  })
})