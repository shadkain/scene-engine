import * as video from 'video/index';

const enum Actions {
    success,
    fail,
}

export class ClickEvent
extends video.Event {
    constructor(component: video.Component, info: video.ClickEventInfo) {
        super(component, info);

        if (info.success) {
            this.storeActions(Actions.success, info.success);
        }
        if (info.fail) {
            this.storeActions(Actions.fail, info.fail);
        }
    }

    public activate() {
        super.activate();
    }

    public deactivate() {
        super.deactivate();
    }

    public success() {
        this.runActions(Actions.success);
    }

    public fail() {
        console.log('fail action');
        this.runActions(Actions.fail);
    }
}