import Config from '../Configuration.js';
import Scene from '../Scene/scene.js';

/**
 * Animation controls allows for visualizing the 3js scene in time.
 * AnimationControls provides functions for updating the scene
 * in time.
 */
class AnimationControls {
    /**
     * Constructs animation controls
     *
     * @param {string} play_btn_id HTML ID for the play button
     * @param {string} pause_btn_id HTML ID for the pause button
     */
    constructor(play_btn_id, pause_btn_id) {
        this._play_btn = document.getElementById(play_btn_id);
        this._pause_btn = document.getElementById(pause_btn_id);

        /**
         * Start time for the animation range
         * @private
         */
        this._start_time = new Date();
        this._start_time.setDate(this._start_time.getDate() - 1);

        /**
         * End time for the animation range
         * @private
         */
        this._end_time = new Date();

        /**
         * Current animation time
         * @private
         */
        this._current_time = new Date(this._start_time);

        /**
         * Time between each animation frame in seconds
         * @private
         */
        this._cadence = 3600;

        /**
         * Delay between each frame in milliseconds
         * @private
         */
        this._frame_delay = 1000;
    }

    /**
     * Begins the animation
     */
    Play() {
        // Only start the animation if it's not already running
        if (this._interval == 0) {
            let animator = this;
            this._interval = setInterval(() => {animator._TickFrame();}, this._frame_delay);
        }
    }

    /**
     * Stops the animation
     */
    Pause() {
        clearInterval(this._interval);
        this._interval = 0;
    }

    /**
     * Sets the start time of the animation
     *
     * @param {Date} date Animation start time
     */
    SetStartTime(date) {
        this._start_time = date;
    }

    /**
     * Sets the animation's end time
     *
     * @param {Date} date End time of the animation
     */
    SetEndTime(date) {
        this._end_time = date;
    }

    /**
     * Sets the current animation time to a specific point
     *
     * @param {Date} date point in time to set the animation to.
     */
    SetTime(date) {
        this._current_time = date;
        this._UpdateScene();
    }

    /**
     * Sets the time to wait between each frame update
     *
     * @param {number} ms Number of milliseconds between each frame
     */
    SetFrameDelay(ms) {
        this._frame_delay = ms;
    }

    /**
     * Returns the current animation time
     */
    GetCurrentTime() {
        return this._current_time;
    }

    /**
     * Updates the scene with the current time;
     * @private
     */
    _UpdateScene() {
        Scene.SetTime(this._current_time);
    }

    /**
     * Animation frame tick, called to update to the next frame
     */
    _TickFrame() {
        this._current_time = this._GetNextFrameTime();
        this._UpdateScene();
    }

    /**
     * Gets the time for the next frame
     * @private
     */
    _GetNextFrameTime() {
        // Start with current time
        let nextTime = new Date(this._current_time);
        // Add cadence to seconds
        nextTime.setSeconds(nextTime.getSeconds() + this._cadence);
        // If nextTime is over end time, then go back to start time
        if (nextTime > this._end_time) {
            return new Date(this._start_time);
        } else {
            // Otherwise, return this as the next date
            return nextTime;
        }
    }
}

let animation_controller = new AnimationControls(Config.play_btn_id, Config.pause_btn_id);
export default animation_controller;
