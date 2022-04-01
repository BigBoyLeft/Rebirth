var exps = global.exports;

function application(app: string, data: Object, visible: boolean) {
    SetNuiFocus(visible, visible)
    SendNUIMessage(JSON.stringify({
        type: 'application',
        app,
        data,
        visible,
    }))
}

exps('application', application)
function appEvent(app: string, event: string, data: Object) {
    SendNUIMessage(JSON.stringify({
        type: 'appEvent',
        app,
        event,
        data,
    }))
}
exps('appEvent', appEvent)