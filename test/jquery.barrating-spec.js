var chai = require("chai"),
    jsdom = require("jsdom"),
    jQuery = require("jQuery");

var expect = chai.expect;

var window = jsdom.jsdom("<html><body></body></html>").createWindow(),
    document = window.document;

var $ = global.jQuery = jQuery.create(window);

$('<select />', { 'id':'rating', 'name':'rating' }).appendTo('body');

for (var i = 1; i <= 10; i++) {
    var attributes = (i == 5) ?
        attributes = { 'value':i, 'selected':'selected' } :
        attributes = { 'value':i };

    $('<option />', attributes).appendTo('#rating').html('rating-text-'+i);
}

require("../jquery.barrating");


describe('bar rating plugin on show', function () {

    beforeEach(function (done) {
        $('#rating').barrating('show');
        done();
    });

    it('should be initialized', function () {
        expect($('#rating').data('barrating')).to.be.a('object');
    });

    it('should hide the select field', function () {
        expect($('#rating').is(":visible")).to.equal(false);
    });

    it('should transform a select field into a rating widget', function () {
        expect($('.bar-rating a')).to.have.length(10);
    });

    it('should store rating values in data attributes', function () {
        expect($('.bar-rating a:first').attr('data-rating-value')).to.equal('1');
        expect($('.bar-rating a:nth-child(8)').attr('data-rating-value')).to.equal('8');
        expect($('.bar-rating a:first').attr('data-rating-text')).to.equal('rating-text-1');
        expect($('.bar-rating a:nth-child(8)').attr('data-rating-text')).to.equal('rating-text-8');
    });

    it('should read the selected rating from the select field', function () {
        expect($('#rating').data('barrating').currentRatingValue).to.equal('5');
        expect($('#rating').data('barrating').currentRatingText).to.equal('rating-text-5');
    });

    it('should set a correct class', function () {
        expect($('.bar-rating a:nth-child(5)').attr('class')).to.equal('selected current');
    });

});

describe('bar rating plugin on show with custom options', function () {

    beforeEach(function (done) {
        $('#rating').barrating({
            showValues:true
        });
        done();
    });

    it('should update defaults', function () {
        var BarRating;
        BarRating = new root.BarRating();
        BarRating.init({
            showValues: true,
            showSelectedRating: true
        });
        expect(BarRating.options).to.be.a('object');
        expect(BarRating.options.showValues).to.equal(true);
        expect(BarRating.options.showSelectedRating).to.equal(true);
    });

    it('should append a rating value', function () {
        expect($('div.current-rating')).to.have.length(1);
        expect($('div.current-rating').html()).to.equal(
            $('#rating').data('barrating').currentRatingText
        );
    });

});

describe('bar rating plugin on destroy', function () {

    beforeEach(function (done) {
        $('#rating').barrating('destroy');
        done();
    });

    it('should show the select field back again', function () {
        expect($('#rating').is(":visible")).to.equal(true);
    });

});
