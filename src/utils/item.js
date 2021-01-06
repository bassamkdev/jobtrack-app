import {useQuery} from 'react-query'
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
  const lists = useListItems()
  return lists.find(li => li.id === id) ?? null
}

export {useListItems, useListItem}
