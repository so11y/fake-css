import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue';

export const pp = ref("pp");

export const useCounter = defineStore({
    id: 'counter',
    state: () => ({
        n: 2200,
        incrementedTimes: 0,
        decrementedTimes: 0,
        numbers: [] as number[],
    }),

    getters: {
        double: (state) => state.n * 2,
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCounter, import.meta.hot))
}
