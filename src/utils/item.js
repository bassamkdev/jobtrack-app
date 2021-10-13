import {queryCache, useMutation, useQuery} from 'react-query'
import {useFetchContext} from 'context/fetch-context'

function useItems() {
  const {authAxios} = useFetchContext()
  const {data: items} = useQuery({
    queryKey: 'items',
    queryFn: () => {
      return authAxios.get('item').then(response => response.data)
    },
  })
  return items ?? []
}

function useListItems(listId) {
  const {authAxios} = useFetchContext()
  const {data: listItems} = useQuery({
    queryKey: ['items', {listId}],
    queryFn: async () => {
      return authAxios
        .get(`list-items/${listId}`)
        .then(response => response.data)
    },
  })

  return listItems ?? []
}

function useListItem(id) {
  const listItems = useListItems()
  return listItems.find(item => item._id === id) ?? null
}

function useRemoveListItem(options) {
  const {authAxios} = useFetchContext()
  return useMutation(({id}) => authAxios.delete(`item/${id}`), {
    onSettled: () => queryCache.invalidateQueries('items'),
    ...options,
  })
}

function useCreateListItem(options) {
  const {authAxios} = useFetchContext()
  return useMutation(data => authAxios.post('item', data), {
    onSettled: () => queryCache.invalidateQueries('items'),
    ...options,
  })
}

function useUpdateListItem(options) {
  const {authAxios} = useFetchContext()
  return useMutation(updates => authAxios.put(`item/${updates.id}`, updates), {
    onSettled: () => queryCache.invalidateQueries('items'),
  })
}

export {
  useListItems,
  useListItem,
  useRemoveListItem,
  useCreateListItem,
  useUpdateListItem,
  useItems,
}
