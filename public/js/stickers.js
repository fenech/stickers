function toTextArea(arr, predicate) {
    return arr.reduce(function(prev, curr, index) {
        return predicate(curr) ? prev.concat(index) : prev
    }, [])
}

function splitStickers(text) {
    return text.replace(/\([^\)]*\)/, "").split(/[,\s]+/).filter(Number).map(Number);
}

function ViewModel() {
    this.totalStickers = 639;
    var stickersArray = new Array(this.totalStickers);
    for (var i = 0; i < this.totalStickers; ++i) {
        stickersArray[i] = ko.observable(0);
    }
    this.stickers = ko.observableArray(stickersArray);
    this.number = ko.observable();

    this.add = function() {
        var index = Number(this.number());
        if (isNaN(index)) {
            return;
        }
        var sticker = this.stickers()[index];
        if (typeof sticker !== 'undefined') {
            sticker(sticker() + 1);
        }
        this.number('');
    }

    this.got = ko.computed(function() {
        return toTextArea(this.stickers(), function(s) { return s() > 0 })
    }, this);

    this.need = ko.computed(function() {
        return toTextArea(this.stickers(), function(s) { return s() === 0 })
    }, this);

    this.swap = ko.computed(function() {
        return toTextArea(this.stickers(), function(s) { return s() > 1 })
    }, this);

    this.inRange = function() {
        return this.number() >= 0 && this.number() <= this.totalStickers;
    }

    this.theirGot = ko.observable('');
    this.theirNeed = ko.observable('');

    this.swapsForYou = ko.computed(function() {
        var theirGot = splitStickers(this.theirGot());
        return _.intersection(theirGot, this.need());
    }, this);

    this.swapsForThem = ko.computed(function() {
        var theirNeed = splitStickers(this.theirNeed());
        return _.intersection(theirNeed, this.swap());
    }, this);

    this.toggleAddStickers = function() { this.showAddStickers(!this.showAddStickers()); }
    this.showAddStickers = ko.observable(false);

    this.toggleMyStickers = function() { this.showMyStickers(!this.showMyStickers()); }
    this.showMyStickers = ko.observable(false);

    this.toggleTheirStickers = function() { this.showTheirStickers(!this.showTheirStickers()); }
    this.showTheirStickers = ko.observable(false);

    this.togglePotentialSwaps = function() { this.showPotentialSwaps(!this.showPotentialSwaps()); }
    this.showPotentialSwaps = ko.observable(false);

    this.showTable = ko.observable(false);
}

var viewModel = new ViewModel();
ko.applyBindings(viewModel);