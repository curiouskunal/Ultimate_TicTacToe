'use strict';

/*
 * Unit tests for lib/calculator.js
 */

describe('UTTT', function() {

    // API for interacting with the page.
    var fix;
    var controls =  {
        get result() {
            return document.getElementById('s1').innerHTML;
        },
        clicks1: function() {
            console.log(document.getElementById("s1"));
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
        window.game.startGame();
    });

    // // remove the html fixture from the DOM
    // afterEach(function() {
    //     fixture.cleanup();
    // });

    it('S1 should be X', function() {
        controls.clicks1();
        // controls.clicks2();

        console.log(controls.result);
        controls.result.should.equal("X");
    });

});