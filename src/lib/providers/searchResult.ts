import type { Ref } from 'vue'
import { useMessage } from 'naive-ui'
import { createWSClient } from '@/lib/plugins'
import { isEmpty } from 'lodash-es'

const searchResultSymbol = Symbol()

interface SearchResultCtx {
  resultLoading: Ref<boolean>
  resultData: Ref<DNS[]>
  // shallowData: Ref<Nullable<DNS[]>>
  // deepData: Ref<Nullable<DNS[]>>
  fetchSearchResult: () => Promise<void>
  onInputEnterKeyup: (event: KeyboardEvent) => Promise<void>
}

export function provideSearchResult(
  multipleKeyword: Ref<string[]>
): SearchResultCtx {
  const wsClient = shallowRef<Nullable<WebSocket>>(null)

  const resultLoading = ref<boolean>(false)
  const resultData = ref<DNS[]>([])

  const messageCtx = useMessage()

  const handlers = {
    async fetchSearchResult() {
      // 检索校验
      if (isEmpty(multipleKeyword.value)) return
      const reqData = {
        type: 'create',
        data: multipleKeyword.value,
      }

      if (resultLoading && wsClient.value) {
        // 之前的探测仍在进行，则强制打断原来的检测
        wsClient.value.close()
        wsClient.value = null
      }

      // WS
      if (!wsClient.value) {
        try {
          const url = import.meta.env.PROD
            ? 'ws://47.104.21.0:7248/dns'
            : 'ws://47.104.21.0:7248/dns'
          wsClient.value = await createWSClient(url)
        } catch (err: any) {
          messageCtx.error(err)
          return
        }
      }

      // 检索
      if (wsClient.value?.readyState === WebSocket.OPEN) {
        try {
          resultLoading.value = true
          wsClient.value.send(JSON.stringify(reqData))
          // resultData.value = await receiveWSMessage(wsClient.value)
          wsClient.value.onmessage = (event) => {
            if (event.data) {
              const object = JSON.parse(event.data)
              if (object.type === 'items') {
                resultData.value = resultData.value?.concat(
                  object?.data
                ) as DNS[]
              } else if (object.type === 'done') {
                resultLoading.value = false
              }
            }
          }
        } catch (err) {
          resultLoading.value = false
        }
        // resultLoading.value = false
      }
    },
    async onInputEnterKeyup(event: KeyboardEvent): Promise<void> {
      // 拦截回车事件
      if (event.target !== event.currentTarget) return
      if (event.shiftKey || event.key !== 'Enter') return
      event.stopPropagation()
      event.preventDefault()
      // 回车检索事件处理
      await handlers.fetchSearchResult()
    },
  }

  provide(searchResultSymbol, {
    resultLoading,
    resultData,
    // deepData,
    // shallowData,
    ...handlers,
  })

  return {
    resultLoading,
    resultData,
    // deepData,
    // shallowData,
    ...handlers,
  }
}

export function useSearchResult(): SearchResultCtx {
  return inject(searchResultSymbol) as SearchResultCtx
}
