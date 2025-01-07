import { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const iconPlugin = {
    install(app: App, ...options: any[]) {
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}
