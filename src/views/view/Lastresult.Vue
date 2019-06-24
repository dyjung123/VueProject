<template>
    <div>
        <TabMenu />
        <Imagelist />
    </div>
</template>

<script>
import TabMenu from '../component/TabMenu.vue'
import Imagelist from '../component/Imagelist.vue'
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
