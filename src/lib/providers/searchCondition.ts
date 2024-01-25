import type { Ref } from 'vue'

const searchConditionSymbol = Symbol()

interface SearchConditionCtx {
  multipleKeyword: Ref<string[]>
}

export function provideSearchCondition(): SearchConditionCtx {
  const multipleKeyword = ref<string[]>([])

  provide(searchConditionSymbol, {
    multipleKeyword,
  })

  return {
    multipleKeyword,
  }
}

export function useSearchCondition(): SearchConditionCtx {
  return inject(searchConditionSymbol) as SearchConditionCtx
}
