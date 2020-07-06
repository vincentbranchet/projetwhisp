/**
 * @classdesc
 * Simple Timer, times duration up to hours (not days or longer)
 * 
 * - Instanciate yourTimer
 *
 * - Start it with yourTimer.start()
 *
 * - Access its values :
 *    Hours : yourTimer.hr
 *    Minutes : yourTimer.min
 *    Seconds : yourTimer.sec
 *
 * - Stop it with yourTimer.stop()
 *
 * - Get total duration (in sec) with yourTimer.duration
 *
 * - Reset it with yourTimer.reset()
**/

class Timer {

    constructor() {

        this.__hr = 0;
        this.__min = 0;
        this.__sec = 0;

        this.__duration = 0;

        this.__state = 'inactive';
        this.__itv = '';
    }

    start() {
        this.__state = 'active';
        this.run();
    }

    stop() {
        let self = this;
        clearInterval(self.itv);
    }

    reset() {
        this.__hr = 0;
        this.__min = 0;
        this.__sec = 0;

        this.__duration = 0;

        this.stop();
    }

    run() {
        let self = this;

        if(this.__state == 'active') {

            this.__itv = setTimeout(() => {

                self.__duration ++;

                self.__sec ++;
                self.run();
            }, 1000);
        }

        this.update();
    }

    update() {
        let modulo;

		if (this.sec >= 60) {
			this.min ++;
			modulo = this.sec - 60;
			this.sec = 0 + modulo;
		}
		if (this.min >= 60) {
			this.hr ++;
			modulo = this.min - 60;
			this.min = 0 + modulo;
		}
    }

    // GETTERS

    get hr() {
        return this.__hr;
    }

    get min() {
        return this.__min;
    }

    get sec() {
        return this.__sec;
    }

    get duration() {
        return this.__duration;
    }

    get itv() {
        return this.__itv;
    }

    // SETTERS 

    set hr(newHr) {
        this.__hr = newHr;
    }

    set min(newMin) {
        this.__min = newMin;
    }

    set sec(newSec) {
        this.__sec = newSec;
    }

    set itv(newItv) {
        this.__itv = newItv;
    }

    set duration(newDuration) {
        this.__duration = newDuration;
    }
}