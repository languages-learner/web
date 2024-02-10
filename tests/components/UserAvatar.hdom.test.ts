import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest'
import { mount } from '@vue/test-utils'
import { type Router } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { useMocks } from '@@/tests/support/useMocks'
import UserAvatar from '@/modules/workspace/components/UserAvatar/UserAvatar.vue'
import { type State } from '@/store/modules/user'

const { mockServices, mockI18n, routerBeforeEach } = useMocks()
mockI18n()
mockServices()

describe('component/UserAvatar', () => {
    let router: Router
    beforeEach(async () => {
        router = await routerBeforeEach()
    })

    const getWrapper = (profileData: Partial<State['profileData']>) => {
        return mount(UserAvatar, {
            global: {
                plugins: [
                    router,
                    createTestingPinia({
                        createSpy: vi.fn,
                        initialState: {
                            user: {
                                profileData: profileData,
                            },
                        },
                    }),
                ],
            },
        })
    }

    it('should display first letter of the user\'s display name', () => {
        const wrapper = getWrapper({ displayName: 'displayName' })
        expect(wrapper.text()).toContain('d')
    })

    it('should display first letter of email if display name is not set', () => {
        const wrapper = getWrapper({ displayName: undefined, email: 'email@gmail.com' })
        expect(wrapper.text()).toContain('e')
    })

    it('should display "U" if display name and email are not set', () => {
        const wrapper = getWrapper({ displayName: undefined, email: undefined })
        expect(wrapper.text()).toContain('U')
    })
})
