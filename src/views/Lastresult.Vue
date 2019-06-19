<template>
    <div>
        <TabMenu />
        <Imagelist />
    </div>
</template>

<script>
import TabMenu from './TabMenu.vue'
import Imagelist from './Imagelist.vue'
import { mapState } from 'vuex'

export default {
    components: {
        TabMenu,
        Imagelist
    }
}
</script>

<style>

</style>
