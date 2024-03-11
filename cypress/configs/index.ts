import { defineConfig } from 'cypress'
import { configureVisualRegression } from 'cypress-visual-regression/dist/plugin'
import { lighthouse, prepareAudit } from '@cypress-audit/lighthouse'
// https://github.com/TypeStrong/ts-node/issues/1096
import * as dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '../../.env' })

export default defineConfig({
    projectId: 'fm6ypm',
    chromeWebSecurity: false,
    env: {
        language: 'xx',
        mobileViewportWidthBreakpoint: 640,
        testUser: {
            username: process.env.TEST_USER_USERNAME,
            password: process.env.TEST_USER_PASSWORD,
        },
        visualRegressionType: 'regression',
        // TODO Change to false after fixing diff between local and ci snapshots
        visualRegressionFailSilently: true,
        visualRegressionGenerateDiff: 'fail',
        visualRegressionBaseDirectory: '../snapshots/base',
        visualRegressionDiffDirectory: '../snapshots/diff',
    },
    component: {
        devServer: {
            framework: 'vue',
            bundler: 'vite',
        },
    },
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportHeight: 660,
        viewportWidth: 1100,
        defaultCommandTimeout: 25000,
        taskTimeout: 120000,
        experimentalRunAllSpecs: true,
        screenshotsFolder: './cypress/snapshots/actual',
        setupNodeEvents(on) {
            configureVisualRegression(on)

            on('before:browser:launch', (browser, launchOptions) => {
                prepareAudit(launchOptions)

                if (browser.family === 'chromium' && browser.name !== 'electron') {
                    launchOptions.args.push('--window-size=1920,1080')
                    launchOptions.args.push('--force-device-scale-factor=1')
                }

                return launchOptions
            })

            on('task', {
                lighthouse: lighthouse((lighthouseReport) => {
                    console.log('---- Writing lighthouse report to disk ----')

                    fs.writeFile('lighthouse.html', lighthouseReport.report, (error: never) => {
                        error ? console.log(error) : console.log('Report created successfully')
                    })
                }),
            })
        },
    },
    lighthouse: {
        options: {
            formFactor: 'desktop',
            screenEmulation: {
                width: 1350,
                height: 940,
                deviceScaleRatio: 1,
                mobile: false,
                disable: false,
            },
            throttling: {
                rttMs: 40,
                throughputKbps: 11024,
                cpuSlowdownMultiplier: 1,
                requestLatencyMs: 0,
                downloadThroughputKbps: 0,
                uploadThroughputKbps: 0,
            },
            output: 'html',
        },
    },
})
