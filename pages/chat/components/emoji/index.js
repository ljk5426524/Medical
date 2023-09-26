// pages/chat/components/emoji/index.js
import emoji from '../../../../utils/emoji'
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        emojiList: emoji.emoji,
    },

    lifetimes: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleEnterEmoji(event) {
            this.triggerEvent('enterEmoji', {
                message: event.currentTarget.dataset.value,
            });
        },
    },
});
