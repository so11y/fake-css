export  const scriptStart = "<script>"
export  const scriptEnd = "</script>"

export const code22 = `
<template>
<div>Hello {{world}} <input v-model='world'/></div>
</template>
<script>
export default defineComponent({
setup(){
    const world =  ref('world');
    watch(world,()=>{
        console.log('update',world.value);
    })
    return {world}
}
})
`