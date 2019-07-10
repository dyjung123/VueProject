<template>
    <div>
        <TabMenu />
        <Imagelist />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import TabMenu from '../component/TabMenu.vue'
import Imagelist from '../component/Imagelist.vue'

export default {
    components: {
        TabMenu,
        Imagelist
    }
}
</script>

<style>

</style>
