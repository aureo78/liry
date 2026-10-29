/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    let settings = app.settings()

    settings.meta.appName = "a7947be1-d341-4159-84c3-3f7da4a0b471.app-preview.com"
    settings.meta.appURL = "https://a7947be1-d341-4159-84c3-3f7da4a0b471.app-preview.com/hcgi/platform"
    settings.meta.hideControls = true

    settings.logs.maxDays = 7
    settings.logs.minLevel = 8
    settings.logs.logIP = true
    
    settings.trustedProxy.headers = [
        "X-Real-IP",
        "X-Forwarded-For",
        "CF-Connecting-IP",
    ]

    app.save(settings)
})
