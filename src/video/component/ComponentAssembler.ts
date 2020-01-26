import * as video from 'video/index';

const PRESET_OFFSET = 10;

export class ComponentAssembler {
    private _component: video.Component;
    private _info: video.Info;
    private _timeline: video.Timeline;

    constructor(component: video.Component, timeline: video.Timeline) {
        this._component = component;
        this._info = this._component.info;
        this._timeline = timeline;
    }

    public assemble() {
        this._timeline.clear();
        
        this.assembleEvents();
        this.assembleActions();
        this.assembleZones();
    }

    private assembleEvents() {
        if (!this._info.events) return;

        this._info.events.forEach(eventInfo => {
            const event = eventInfo.create(this._component);

            this._timeline.preset({
                frame: eventInfo.on,
                handler: event.activate.bind(event),
                prehandler: () => {
                    event.charge();
                    this._timeline.set(video.Moment.destroy, event.uncharge.bind(event));
                },
                offset: PRESET_OFFSET,
            });

            this._timeline.set(eventInfo.off, event.deactivate.bind(event));
        });
    }

    private assembleActions() {
        if (this._info.begin) {
            this.assembleSpecifiedActions(this._info.begin, video.Moment.begin);
        }
        if (this._info.end) {
            this.assembleSpecifiedActions(this._info.end, video.Moment.end);
        }
    }

    private assembleSpecifiedActions(actionInfoArray: video.ActionInfo[], on: number) {
        actionInfoArray.forEach(actionInfo => {
            const action = actionInfo.create(this._component);

            this._timeline.preset({
                frame: on,
                handler: action.run.bind(action),
                prehandler: () =>{
                    action.charge();
                    this._timeline.set(video.Moment.destroy, action.uncharge.bind(action));
                },
                offset: PRESET_OFFSET,
            });
        });
    }

    private assembleZones() {
        if (!this._info.zones) return;

        // TODO: implement
    }
}