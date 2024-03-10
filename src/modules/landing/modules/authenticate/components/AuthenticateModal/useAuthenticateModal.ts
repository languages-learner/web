import { defineAsyncComponent } from 'vue'
import { type ModalReactive } from 'naive-ui'
import { type ModalApiInjection } from 'naive-ui/lib/modal/src/ModalProvider'
import { type EAuthenticateModalType } from '@/modules/landing/modules/authenticate/components/AuthenticateModal/EAuthenticateModalType'
const AuthenticateModal = defineAsyncComponent(() => import('@/modules/landing/modules/authenticate/components/AuthenticateModal/AuthenticateModal.vue'))

export const useAuthenticateModal = (modal: ModalApiInjection) => {
    const { t } = useI18n()
    const modalInst = ref<ModalReactive>()

    const openAuthenticateModal  = (type: EAuthenticateModalType) => {
        modalInst.value = modal.create({
            title: t('authentication'),
            content: () => h(AuthenticateModal, { type }),
            preset: 'dialog',
            transformOrigin: 'center',
            showIcon: false,
        })
    }

    return {
        openAuthenticateModal,
    }
}
