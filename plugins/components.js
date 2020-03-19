import Vue from 'vue'

import chrysan from '~/components/Chrysan.vue';
import StateLabel from '~/components/StateLabel.vue';
import Markdown from '~/components/Markdown.vue'

Vue.component('chrysan', chrysan)
Vue.component('toast', StateLabel)
Vue.component('markdown', Markdown)