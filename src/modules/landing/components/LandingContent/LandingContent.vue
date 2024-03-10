<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import LandingAbout from '@/modules/landing/components/LandingAbout/LandingAbout.vue'
import PreviewProfilePageMobile from '@/assets/images/preview-profile-page-mobile.webp'
import PreviewDictionaryPageMobile from '@/assets/images/preview-dictionary-page-mobile.webp'

const { isTablet, isMobile } = useAppBreakpoints()

const container = ref(null)
const descriptionBlock = ref(null)
const carouselHeight = ref(0)

const { height: containerHeight } = useElementSize(container)
const { height: descriptionBlockHeight } = useElementSize(descriptionBlock)
const updateCarouselHeight = () => {
    const newValue = unref(containerHeight) - unref(descriptionBlockHeight) - 30 - 50
    carouselHeight.value = newValue >= 250 ? newValue : 0
}
watch(containerHeight, () => updateCarouselHeight())

const carouselStyle = computed(() => unref(isTablet) || unref(isMobile) ?
    {
        'display': unref(carouselHeight) > 0 ? 'block' : 'none',
        'max-height': `${unref(carouselHeight)}px`,
    }
    : {
        'max-height': `${unref(containerHeight)}px`,
    })
</script>

<template>
    <div class="landing-content">
        <n-grid
            ref="container"
            class="landing-content__container"
            cols="2"
            item-responsive
            responsive="screen">
            <n-grid-item
                span="2 m:1"
                class="landing-content__description">
                <div ref="descriptionBlock">
                    <n-h1>
                        <n-gradient-text type="success">
                            Languages<br/>
                            Learner
                        </n-gradient-text>
                    </n-h1>

                    <div>
                        <n-h2><n-text depth="2">{{ $t('web_application_for_learning_languages') }}</n-text></n-h2>
                    </div>

                    <LandingAbout class="landing-content__description__about"/>
                </div>
            </n-grid-item>
            <n-grid-item
                :style="carouselStyle"
                span="2 m:1"
                class="landing-content__carousel">
                <n-carousel
                    autoplay
                    centered-slides>
                    <n-carousel-item>
                        <img
                            :src="PreviewDictionaryPageMobile"
                            alt="preview-dictionary-page-mobile"/>
                    </n-carousel-item>
                    <n-carousel-item>
                        <img
                            :src="PreviewProfilePageMobile"
                            alt="preview-profile-page-mobile"/>
                    </n-carousel-item>
                </n-carousel>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<style lang="scss" scoped>
@import "landing-content";
</style>
