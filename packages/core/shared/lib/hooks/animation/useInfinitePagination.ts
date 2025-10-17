import { useInfiniteQuery } from '@tanstack/react-query'

export interface PaginationResponse<T> {
  code: number
  message: string
  data: T[]
  paging?: {
    total: number
    lastOffset: number
  }
  totalCount?: number
}

export type PaginationApiFunction<T, P> = (
  params: P & { page: number },
) => Promise<PaginationResponse<T>>

export interface UseInfinitePaginationOptions<T, P> {
  queryKey: (string | number | object)[]
  apiFn: PaginationApiFunction<T, P>
  params: P & { size?: number }
  enabled?: boolean
}

export function useInfinitePagination<T, P = {}>({
  queryKey,
  apiFn,
  params,
  enabled = true,
}: UseInfinitePaginationOptions<T, P>) {
  const size = params.size || 20

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      apiFn({
        ...params,
        page: pageParam,
        size,
      }),
    getNextPageParam: (lastPage: PaginationResponse<T>, allPages) => {
      const currentPage = allPages.length
      const itemsInLastPage = lastPage.data.length

      if (itemsInLastPage < size) {
        return undefined
      }

      if (lastPage.paging) {
        const totalPages = Math.ceil(lastPage.paging.total / size)
        return currentPage < totalPages ? currentPage + 1 : undefined
      }

      if (lastPage.totalCount) {
        const totalPages = Math.ceil(lastPage.totalCount / size)
        return currentPage < totalPages ? currentPage + 1 : undefined
      }

      return currentPage + 1
    },
    initialPageParam: 1,
    select: (data) => {
      const allItems = data.pages.flatMap((page) => page.data)
      const totalCount =
        data.pages[0]?.paging?.total ||
        data.pages[0]?.totalCount ||
        allItems.length

      const lastPage = data.pages[data.pages.length - 1]
      const hasNextPage = lastPage?.data.length
        ? lastPage.data.length >= size
        : false

      return {
        items: allItems,
        totalCount,
        hasNextPage,
      }
    },
    enabled,
  })
}
