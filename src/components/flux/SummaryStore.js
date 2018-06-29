import CounterStore from './CounterStore';
import AppDispatcher from './AppDispatcher';
import ActionTypes from './ActionTypes'

function computeSummary(counterValues) {
    let summary = 0;
    for (const key in counterValues) {
        if(counterValues.hasOwnProperty(key)) {
            summary += counterValues[key]
        }
    }

    return summary;
}

const SummaryStore = Object.assign({}, EventEmitter.prototype, {
    
    emitChange: function() {
        this.emit(CHANGE_EVENT)
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },
    getSummary: function() {
        return computeSummary(CounterStore.getCounterValues());
    }
})

SummaryStore.dispatchToken = AppDispacher.register((action) => {
    if ((action.type === ActionTypes.INCREMENT) || (action.type === ActionTypes.DECREMENT)) {
        AppDispatcher.waitFor([CounterStore.dispatchToken]);
        SummaryStore.emitChange();
    }
})