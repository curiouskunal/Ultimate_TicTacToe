'use strict';

/*
 * Unit tests for lib/calculator.js
 */

describe('InitialTests', function() {

    // API for interacting with the page.
    var fix;
    var controls =  {
        get s1_00() {
            return document.getElementById('00s1').innerHTML;
        },
        get s2_00() {
            return document.getElementById('00s2').innerHTML;
        },
        get s3_00() {
            return document.getElementById('00s3').innerHTML;
        },
        get s4_00() {
            return document.getElementById('00s4').innerHTML;
        },
        get s5_00() {
            return document.getElementById('00s5').innerHTML;
        },
        get s6_00() {
            return document.getElementById('00s6').innerHTML;
        },
        get s7_00() {
            return document.getElementById('00s7').innerHTML;
        },
        get s8_00() {
            return document.getElementById('00s8').innerHTML;
        },
        get s9_00() {
            return document.getElementById('00s9').innerHTML;
        },
        //---------------------------------------------------
        get s1_01() {
            return document.getElementById('01s1').innerHTML;
        },
        get s2_01() {
            return document.getElementById('01s2').innerHTML;
        },
        get s3_01() {
            return document.getElementById('01s3').innerHTML;
        },
        get s4_01() {
            return document.getElementById('01s4').innerHTML;
        },
        get s5_01() {
            return document.getElementById('01s5').innerHTML;
        },
        get s6_01() {
            return document.getElementById('01s6').innerHTML;
        },
        get s7_01() {
            return document.getElementById('01s7').innerHTML;
        },
        get s8_01() {
            return document.getElementById('01s8').innerHTML;
        },
        get s9_01() {
            return document.getElementById('01s9').innerHTML;
        },
        //---------------------------------------------------
        get s1_02() {
            return document.getElementById('02s1').innerHTML;
        },
        get s2_02() {
            return document.getElementById('02s2').innerHTML;
        },
        get s3_02() {
            return document.getElementById('02s3').innerHTML;
        },
        get s4_02() {
            return document.getElementById('02s4').innerHTML;
        },
        get s5_02() {
            return document.getElementById('02s5').innerHTML;
        },
        get s6_02() {
            return document.getElementById('02s6').innerHTML;
        },
        get s7_02() {
            return document.getElementById('02s7').innerHTML;
        },
        get s8_02() {
            return document.getElementById('02s8').innerHTML;
        },
        get s9_02() {
            return document.getElementById('02s9').innerHTML;
        },
        //---------------------------------------------------
        get s1_10() {
            return document.getElementById('10s1').innerHTML;
        },
        get s2_10() {
            return document.getElementById('10s2').innerHTML;
        },
        get s3_10() {
            return document.getElementById('10s3').innerHTML;
        },
        get s4_10() {
            return document.getElementById('10s4').innerHTML;
        },
        get s5_10() {
            return document.getElementById('10s5').innerHTML;
        },
        get s6_10() {
            return document.getElementById('10s6').innerHTML;
        },
        get s7_10() {
            return document.getElementById('10s7').innerHTML;
        },
        get s8_10() {
            return document.getElementById('10s8').innerHTML;
        },
        get s9_10() {
            return document.getElementById('10s9').innerHTML;
        },
        //---------------------------------------------------
        get s1_11() {
            return document.getElementById('11s1').innerHTML;
        },
        get s2_11() {
            return document.getElementById('11s2').innerHTML;
        },
        get s3_11() {
            return document.getElementById('11s3').innerHTML;
        },
        get s4_11() {
            return document.getElementById('11s4').innerHTML;
        },
        get s5_11() {
            return document.getElementById('11s5').innerHTML;
        },
        get s6_11() {
            return document.getElementById('11s6').innerHTML;
        },
        get s7_11() {
            return document.getElementById('11s7').innerHTML;
        },
        get s8_11() {
            return document.getElementById('11s8').innerHTML;
        },
        get s9_11() {
            return document.getElementById('11s9').innerHTML;
        },
        //---------------------------------------------------
        get s1_12() {
            return document.getElementById('12s1').innerHTML;
        },
        get s2_12() {
            return document.getElementById('12s2').innerHTML;
        },
        get s3_12() {
            return document.getElementById('12s3').innerHTML;
        },
        get s4_12() {
            return document.getElementById('12s4').innerHTML;
        },
        get s5_12() {
            return document.getElementById('12s5').innerHTML;
        },
        get s6_12() {
            return document.getElementById('12s6').innerHTML;
        },
        get s7_12() {
            return document.getElementById('12s7').innerHTML;
        },
        get s8_12() {
            return document.getElementById('12s8').innerHTML;
        },
        get s9_12() {
            return document.getElementById('12s9').innerHTML;
        },
        //---------------------------------------------------
        get s1_20() {
            return document.getElementById('20s1').innerHTML;
        },
        get s2_20() {
            return document.getElementById('20s2').innerHTML;
        },
        get s3_20() {
            return document.getElementById('20s3').innerHTML;
        },
        get s4_20() {
            return document.getElementById('20s4').innerHTML;
        },
        get s5_20() {
            return document.getElementById('20s5').innerHTML;
        },
        get s6_20() {
            return document.getElementById('20s6').innerHTML;
        },
        get s7_20() {
            return document.getElementById('20s7').innerHTML;
        },
        get s8_20() {
            return document.getElementById('20s8').innerHTML;
        },
        get s9_20() {
            return document.getElementById('20s9').innerHTML;
        },
        //---------------------------------------------------
        get s1_21() {
            return document.getElementById('21s1').innerHTML;
        },
        get s2_21() {
            return document.getElementById('21s2').innerHTML;
        },
        get s3_21() {
            return document.getElementById('21s3').innerHTML;
        },
        get s4_21() {
            return document.getElementById('21s4').innerHTML;
        },
        get s5_21() {
            return document.getElementById('21s5').innerHTML;
        },
        get s6_21() {
            return document.getElementById('21s6').innerHTML;
        },
        get s7_21() {
            return document.getElementById('21s7').innerHTML;
        },
        get s8_21() {
            return document.getElementById('21s8').innerHTML;
        },
        get s9_21() {
            return document.getElementById('21s9').innerHTML;
        },
        //---------------------------------------------------
        get s1_22() {
            return document.getElementById('22s1').innerHTML;
        },
        get s2_22() {
            return document.getElementById('22s2').innerHTML;
        },
        get s3_22() {
            return document.getElementById('22s3').innerHTML;
        },
        get s4_22() {
            return document.getElementById('22s4').innerHTML;
        },
        get s5_22() {
            return document.getElementById('22s5').innerHTML;
        },
        get s6_22() {
            return document.getElementById('22s6').innerHTML;
        },
        get s7_22() {
            return document.getElementById('22s7').innerHTML;
        },
        get s8_22() {
            return document.getElementById('22s8').innerHTML;
        },
        get s9_22() {
            return document.getElementById('22s9').innerHTML;
        },
        //---------------------------------------------------
        get B00() {
            return document.getElementById('B00').innerHTML;
        },
        get B01() {
            return document.getElementById('B01').innerHTML;
        },
        get B02() {
            return document.getElementById('B02').innerHTML;
        },
        get B10() {
            return document.getElementById('B10').innerHTML;
        },
        get B11() {
            return document.getElementById('B11').innerHTML;
        },
        get B12() {
            return document.getElementById('B12').innerHTML;
        },
        get B20() {
            return document.getElementById('B20').innerHTML;
        },
        get B21() {
            return document.getElementById('B21').innerHTML;
        },
        get B22() {
            return document.getElementById('B22').innerHTML;
        },
        //---------------------------------------------------
        get turn() {
            var turn = document.turn;
            if (turn == 'X')
                return 'O';
            else
                return 'X'
        },
        get fullBoard() {
            return fullBoard
        },
        clickCell: function(id) {
            document.getElementById(id).click();
        }
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

    it('Click should set tile', function() {
        controls.clickCell('01s1');
        expect(controls.s1_01).toBe(controls.turn);
    });

    it('Win inner board', function(){
        controls.clickCell('11s8');
        controls.clickCell('21s5');
        controls.clickCell('11s5');
        controls.clickCell('11s6');
        controls.clickCell('12s6');
        controls.clickCell('12s5');
        controls.clickCell('11s2');

        expect(controls.B11).toBe(controls.turn);
        expect(controls.fullBoard[1][1]).toBe(controls.turn);
    });

    it('Draw inner board (tie)', function(){
        controls.clickCell('11s2');
        controls.clickCell('01s5');
        controls.clickCell('11s5');
        controls.clickCell('11s8');
        controls.clickCell('21s5');
        controls.clickCell('11s9');
        controls.clickCell('22s5');
        controls.clickCell('11s1');
        controls.clickCell('00s5');
        controls.clickCell('11s3');
        controls.clickCell('02s5');
        controls.clickCell('11s4');
        controls.clickCell('10s4');
        controls.clickCell('10s5');
        controls.clickCell('11s6');
        controls.clickCell('12s5');
        controls.clickCell('11s7');

        expect(controls.B11).toBe('-');
        expect(controls.fullBoard[1][1]).toBe('-');
    });
});    