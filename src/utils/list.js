import {useQuery, useMutation, queryCache} from 'react-query'
import {useFetchContext} from 'context/fetch-context'

function useLists() {
  const {authAxios} = useFetchContext()
  const {data: lists} = useQuery({
    queryKey: 'lists',
    queryFn: async () => {
      return authAxios.get('list').then(response => response.data)
    },
  })

  return lists ?? []
}

function useList(id) {
  const lists = useLists()
  return lists.find(li => li._id === id) ?? null
}

// function useUpdateList() {
//   return useMutation(
//     updates =>
//       client(`list/${updates.id}`, {
//         method: 'PUT',
//         data: updates,
//       }),
//     {
//       onSettled: () => queryCache.invalidateQueries('lists'),
//     },
//   )
// }

function useRemoveList(options) {
  const {authAxios} = useFetchContext()
  return useMutation(({listId}) => authAxios.delete(`list/${listId}`), {
    onSettled: () => queryCache.invalidateQueries('lists'),
    ...options,
  })
}

function useCreateList(options) {
  const {authAxios} = useFetchContext()
  return useMutation(
    ({listName, color}) => authAxios.post('list', {name: listName, color}),
    {
      onSettled: () => queryCache.invalidateQueries('lists'),
      ...options,
    },
  )
}

export {useLists, useList, useCreateList, useRemoveList}
