'use strict';
/* globals Wumvi */
/* jshint -W079 */
var Wumvi = Wumvi || {};
/* jshint +W079 */



/**
 *
 * @param {!jQuery} $root
 * @constructor
 */
Wumvi.SlideDiver = function($root) {
    /**
     *
     * @type {jQuery}
     * @private
     */
    this.$root_ = $root;
    if (this.$root_.length === 0) {
        throw new Error('Root not found');
    }


    /**
     * @type {jQuery}
     * @private
     */
    this.$diver_ = this.$root_.find('.cd-handle__js:first');
    if (this.$diver_.length === 0) {
        throw new Error('Element [class="cd-handle__js"] not found');
    }

    /**
     * @type {jQuery}
     * @private
     */
    this.$imgWraper_ = this.$root_.find('.cd-resize-img__js:first');
    if (this.$imgWraper_.length === 0) {
        throw new Error('Element [class="cd-resize-img__js"] not found');
    }

    /**
     * @type {jQuery}
     * @private
     */
    this.$image_ = this.$root_.find('.cd-image__js:first');
    if (this.$image_.length === 0) {
        throw new Error('Element [class="cd-image__js"] not found');
    }

    /**
     *
     * @type {boolean}
     * @private
     */
    this.isTouch_ = false;

    /**
     * @type {number}
     * @private
     */
    this.imageWrapperWidth_ = this.$image_.width() / 2;

    /**
     *
     * @type {number}
     * @private
     */
    this.lastImageWidth_ = this.imageWrapperWidth_;

    /**
     *
     * @type {number}
     * @private
     */
    this.startPosX_ = 0;

    this.init_();
};


/**
 *
 * @private
 */
Wumvi.SlideDiver.prototype.init_ = function() {
    this.changePos_(this.imageWrapperWidth_);
    this.initEvent_();
};


/**
 *
 * @private
 */
Wumvi.SlideDiver.prototype.initEvent_ = function() {
    // begin
    this.$diver_.on('mousedown touchstart', this.onDiverTouch_.bind(this));
    // move
    this.$root_.on('mousemove touchmove', this.onDiverMove_.bind(this));
    // end
    this.$root_.on('mouseup touchstop', this.onDiverUntouch_.bind(this));

    // this.$image_.on('mouseout', this.onRootMouseOver_.bind(this));
};


/**
 *
 * @param {jQuery.Event} event
 * @private
 */
Wumvi.SlideDiver.prototype.onDiverMove_ = function(event) {
    this.drag_(this.getPageX_(event));
};


/**
 *
 * @param {jQuery.Event} event
 * @private
 */
Wumvi.SlideDiver.prototype.onRootMouseOver_ = function(event) {
    console.log(event);
    if (event.originalEvent.fromElement === this.$root_.get(0)) {
        this.stopDrag_();
        console.log('dd');

    }
};


/**
 * @param {jQuery.Event} event
 * @private
 */
Wumvi.SlideDiver.prototype.onDiverTouch_ = function(event) {
    this.isTouch_ = true;
    this.startPosX_ = this.getPageX_(event);
    console.log('start');
};


/**
 * @param {jQuery.Event} event
 * @return {number}
 * @private
 */
Wumvi.SlideDiver.prototype.getPageX_ = function(event) {
    return event.pageX || event.originalEvent.touches[0].pageX;
};


/**
 * @private
 */
Wumvi.SlideDiver.prototype.onDiverUntouch_ = function() {
    console.log('end');
    this.stopDrag_();
};


/**
 * @private
 */
Wumvi.SlideDiver.prototype.stopDrag_ = function() {
    this.isTouch_ = false;
    this.imageWrapperWidth_ = this.lastImageWidth_;
};


/**
 *
 * @param {number} currentPosX
 * @private
 */
Wumvi.SlideDiver.prototype.drag_ = function(currentPosX) {
    if (!this.isTouch_) {
        return;
    }

    this.lastImageWidth_ = this.imageWrapperWidth_ - (this.startPosX_ - currentPosX);
    this.changePos_(this.lastImageWidth_);

    // var dragElement = this.$diver_.get(0);
    // console.log(dragElement);

    // console.log(currentPosX);



    /*var dragWidth = dragElement.outerWidth(),
     xPosition = dragElement.offset().left + dragWidth - e.pageX,
     containerOffset = container.offset().left,
     containerWidth = container.outerWidth(),
     minLeft = containerOffset + 10,
     maxLeft = containerOffset + containerWidth - dragWidth - 10;*/
};


/**
 *
 * @param {number} posX
 * @private
 */
Wumvi.SlideDiver.prototype.changePos_ = function(posX) {
    if (posX > this.$image_.width() || posX < 0) {
        return;
    }

    this.$diver_.css({'left': posX});
    this.$imgWraper_.css({'width': posX});
};
