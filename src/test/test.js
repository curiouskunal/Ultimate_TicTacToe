'use strict';

/*
 * Unit tests for lib/calculator.js
 */

describe('UTTT', function() {

    // API for interacting with the page.
    var fix;
    var controls =  {
        get s1() {
            return document.getElementById('s1').innerHTML;
        },
        clicks1: function() {
            document.getElementById('s1').click();
        },
        // clicks2: function() {
        //     document.getElementById('s2').click();
        // }
    };

    // inject the HTML fixture for the tests
    beforeEach(function() {
        // Why this line? See: https://github.com/billtrik/karma-fixture/issues/3
        fixture.base = 'test';
        fix = fixture.load('fixture.html');
        fixture.load('fixture.html');

        // init js lib
        window.startGame();
    });

    // // remove the html fixture from the DOM
    afterEach(function() {
        fixture.cleanup();
    });

    it('S1 should be X', function() {
        controls.clicks1();
        // controls.clicks2();

        // console.log(typeof controls.s1);
        expect(controls.s1).toBe('X');
    });

});