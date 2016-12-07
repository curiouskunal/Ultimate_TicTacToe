'use strict';

/*
 * Unit tests for lib/calculator.js
 */

describe('functionalTests', function() {

    // API for interacting with the page.
    var fix;
    var controls =  {
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
        get win(){
            return win
        },
        get winningSet(){
            return winningSet
        },
        clickCell: function(id) {
            document.getElementById(id).click();
        },
        get message(){
            return document.getElementById("message").innerText;
        },
        get endNav(){
        	return document.getElementById('endNav');
        },
        getElement: function(id){
            return document.getElementById(id);
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

        controls.clickCell('play');
    });

    // // remove the html fixture from the DOM
    afterEach(function() {
        fixture.cleanup();
        fullBoard[0][0] = null;
        fullBoard[0][1] = null;
        fullBoard[0][2] = null;
        fullBoard[1][0] = null;
        fullBoard[1][1] = null;
        fullBoard[1][2] = null;
        fullBoard[2][0] = null;
        fullBoard[2][1] = null;
        fullBoard[2][2] = null;
        win = null;
        winningSet = null;
    });

    it('Click should set tile', function() {
        controls.clickCell('01s1');
        expect(controls.getElement('01s1').innerHTML).toBe(controls.turn);
    });

    it('Win inner board', function(){
        controls.clickCell('11s8');
        controls.clickCell('21s5');
        controls.clickCell('11s5');
        controls.clickCell('11s6');
        controls.clickCell('12s6');
        controls.clickCell('12s5');
        controls.clickCell('11s2');

        expect((controls.getElement('B11')).innerHTML).toBe(controls.turn);
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

        expect((controls.getElement('B11')).innerHTML).toBe('-');
        expect(controls.fullBoard[1][1]).toBe('-');
    });

    it('Win the full game',function(){
        controls.clickCell('11s6');
        controls.clickCell('12s8');
        controls.clickCell('21s5');
        controls.clickCell('11s9');
        controls.clickCell('22s5');
        controls.clickCell('11s5');
        controls.clickCell('11s8');
        controls.clickCell('21s9');
        controls.clickCell('22s9');
        controls.clickCell('22s8');
        controls.clickCell('21s4');
        controls.clickCell('10s8');
        controls.clickCell('21s6');
        controls.clickCell('12s9');
        controls.clickCell('22s1');
        controls.clickCell('00s8');
        controls.clickCell('20s5');
        controls.clickCell('11s1');
        controls.clickCell('00s9');
        controls.clickCell('20s9');
        controls.clickCell('20s7');
        controls.clickCell('20s8');
        controls.clickCell('20s3');

        expect((controls.getElement('B20')).innerHTML).toBe(controls.turn);
        expect((controls.getElement('B21')).innerHTML).toBe(controls.turn);
        expect((controls.getElement('B22')).innerHTML).toBe(controls.turn);
        expect(controls.message).toBe(controls.turn + ' has won the game!');
        expect(controls.win).toBe(controls.turn);

    });


    it('Draw the full game',function(){

        controls.clickCell('11s6');
        controls.clickCell('12s5');
        controls.clickCell('11s4');
        controls.clickCell('10s5');
        controls.clickCell('11s5');
        controls.clickCell('10s4');
        controls.clickCell('10s7');
        controls.clickCell('20s6');
        controls.clickCell('12s7');
        controls.clickCell('20s5');
        controls.clickCell('12s4');
        controls.clickCell('10s6');
        controls.clickCell('12s1');
        controls.clickCell('00s8');
        controls.clickCell('21s9');
        controls.clickCell('22s8');
        controls.clickCell('21s8');
        controls.clickCell('21s7');
        controls.clickCell('20s4');
        controls.clickCell('21s5');
        controls.clickCell('20s3');
        controls.clickCell('02s8');
        controls.clickCell('21s4');
        controls.clickCell('21s3');
        controls.clickCell('02s7');
        controls.clickCell('20s7');
        controls.clickCell('20s9');
        controls.clickCell('22s4');
        controls.clickCell('00s5');
        controls.clickCell('20s8');
        controls.clickCell('20s2');
        controls.clickCell('01s6');
        controls.clickCell('20s1');
        controls.clickCell('00s6');
        controls.clickCell('02s5');
        controls.clickCell('02s3');
        controls.clickCell('02s4');
        controls.clickCell('02s1');
        controls.clickCell('00s9');
        controls.clickCell('22s5');
        controls.clickCell('02s2');
        controls.clickCell('01s3');
        controls.clickCell('02s9');
        controls.clickCell('22s6');
        controls.clickCell('01s9');
        controls.clickCell('02s6');
        controls.clickCell('01s7');
        controls.clickCell('00s4');
        controls.clickCell('01s2');
        controls.clickCell('01s8');
        controls.clickCell('00s7');
        controls.clickCell('00s1');
        controls.clickCell('00s2');
        controls.clickCell('01s1');
        controls.clickCell('00s3');
        controls.clickCell('01s4');
        controls.clickCell('01s5');
        
        expect((controls.getElement('B00')).style.backgroundColor).toBe("transparent");
        expect((controls.getElement('B01')).style.backgroundColor).toBe("transparent");
        expect((controls.getElement('B02')).style.backgroundColor).toBe("transparent");
        expect((controls.getElement('B10')).style.backgroundColor).toBe("transparent");
        expect((controls.getElement('B11')).style.backgroundColor).toBe("transparent");
        expect((controls.getElement('B12')).style.backgroundColor).toBe("transparent");
        expect((controls.getElement('B00')).style.backgroundColor).toBe("transparent");
        expect((controls.getElement('B20')).style.backgroundColor).toBe("transparent");
        expect((controls.getElement('B21')).style.backgroundColor).toBe("transparent");
        expect((controls.getElement('B22')).style.backgroundColor).toBe("transparent");

        expect(controls.message).toBe('Game has ended in draw');

        expect(controls.win).toBe('-');

    });

    it('Play Again', function(){
    	// game is won
    	controls.clickCell('11s6');
        controls.clickCell('12s8');
        controls.clickCell('21s5');
        controls.clickCell('11s9');
        controls.clickCell('22s5');
        controls.clickCell('11s5');
        controls.clickCell('11s8');
        controls.clickCell('21s9');
        controls.clickCell('22s9');
        controls.clickCell('22s8');
        controls.clickCell('21s4');
        controls.clickCell('10s8');
        controls.clickCell('21s6');
        controls.clickCell('12s9');
        controls.clickCell('22s1');
        controls.clickCell('00s8');
        controls.clickCell('20s5');
        controls.clickCell('11s1');
        controls.clickCell('00s9');
        controls.clickCell('20s9');
        controls.clickCell('20s7');
        controls.clickCell('20s8');
        controls.clickCell('20s3');

        controls.clickCell('playAgain');

        expect(controls.win).toBe(null);
        expect(controls.winningSet).toBe(null);
        expect((controls.endNav).style.height).toBe('0%');
        for (var i = 0; i < 3; i++){
        	for (var j = 0; j < 3; j++){
        		expect(controls.fullBoard[i][j]).toBe(null);
        		for(var k = 1; k <= 9; k++){
        			expect((controls.getElement(i+''+j+'s'+k)).innerHTML).toBe('');
        		}
        	}
        }
    });

    it('Return to Board',function(){
        // game is won
        controls.clickCell('11s6');
        controls.clickCell('12s8');
        controls.clickCell('21s5');
        controls.clickCell('11s9');
        controls.clickCell('22s5');
        controls.clickCell('11s5');
        controls.clickCell('11s8');
        controls.clickCell('21s9');
        controls.clickCell('22s9');
        controls.clickCell('22s8');
        controls.clickCell('21s4');
        controls.clickCell('10s8');
        controls.clickCell('21s6');
        controls.clickCell('12s9');
        controls.clickCell('22s1');
        controls.clickCell('00s8');
        controls.clickCell('20s5');
        controls.clickCell('11s1');
        controls.clickCell('00s9');
        controls.clickCell('20s9');
        controls.clickCell('20s7');
        controls.clickCell('20s8');
        controls.clickCell('20s3');

        controls.clickCell('return2board');
	    expect((controls.endNav).style.height).toBe('0%');
    });

});    