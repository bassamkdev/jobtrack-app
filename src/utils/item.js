import {queryCache, useMutation, useQuery} from 'react-query'
import {useFetchContext} from 'context/fetch-context'

function useListItems(listId) {
  const {authAxios} = useFetchContext()
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
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
  return useMutation(({itemId}) => authAxios.delete(`item/${itemId}`), {
    onSettled: () => queryCache.invalidateQueries('list-items'),
    ...options,
  })
}

export {useListItems, useListItem, useRemoveListItem}
