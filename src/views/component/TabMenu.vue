<!-- TabMenu출처: https://vuejsexamples.com/an-easy-way-to-display-tabs-with-vue-js/ -->
<template>
    <div class="TabMenuContainer">
        <tabs>
            <tab id="Day" name="Day">
                <TotalChart class="Day" mid="chartContainer1" @init-chart="attachEvent($event, '#Day')"/>
            </tab>
            <tab id="Month" name="Month">
                <TotalChart class="Month" mid="chartContainer2" @init-chart="attachEvent($event, '#Month')"/>
            </tab>
            <tab id="Half" name="Half">
                <TotalChart class="Half" mid="chartContainer3" @init-chart="attachEvent($event, '#Half')"/>
            </tab>
        </tabs>
    </div>
</template>

<script>
import {Tabs, Tab} from 'vue-tabs-component'
import TotalChart from './TotalChart.vue'

export default {
    components: {
        Tabs,
        Tab,
        TotalChart
    },
    mounted() {
        console.log('this',this)
    },
    methods: {
        renderChart() {
            console.log('TotalChart : ',TotalChart)
        },
        attachEvent (chart, href) {
            let el = document.getElementsByClassName('tabs-component-tab-a')
            for (let i = 0; el.length > i; i++){
                let e = el[i]
                if (e.getAttribute('href') === href) {
                    e.addEventListener('click', e => {
                        chart.render()
                        console.log('clicked')
                    })
                }
            }
        }
    }
}
</script>

<style>
* {
  position: relative;
}

.tabs-component {
  margin: 4em 0;
}

.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
}

@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}

.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}

.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}

.tabs-component-tab:hover {
  color: #666;
}

.tabs-component-tab.is-active {
  color: #000;
}

.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: .5em;
    transform: translateY(2px);
    transition: transform .3s ease;
  }

  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: .75em 1em;
  text-decoration: none;
}

.tabs-component-panels {
  padding: 4em 0;
}

@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    padding: 4em 2em;
  }
}
</style>
