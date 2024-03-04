import defaultConfig from './index'
import { overrideMobileConfig } from '@@/cypress/configs/common/overrideMobileConfig'
import { overridePreviewConfig } from '@@/cypress/configs/common/overridePreviewConfig'

export default overridePreviewConfig(overrideMobileConfig(defaultConfig))
