const ttt_grid = document.querySelector('.ttt-grid');
const ttt_boxes = document.querySelectorAll('.ttt-box');

class TicTacToe {
    constructor(){
        this.moves = 0;
        this.players = ['cross', 'circle'];
        this.currentPlayer = this.currentPlayer;
    }

    newGame(){
        const players = this.players;
        var beginner = players[Math.floor(Math.random()*players.length)];
        //console.log(beginner);
        document.querySelector('.ttt-turn h2').innerText = beginner.toUpperCase();
        document.querySelector('.ttt-turn h2').classList.add(beginner);
        document.querySelector('.ttt-turn h2').dataset.tttPlayer = beginner;
        document.querySelector('[data-ttt-current-player]').dataset.tttCurrentPlayer = beginner;
        this.currentPlayer = beginner;
    }

    play(e){
        if(e.dataset.tttPlayed) return false;

        e.setAttribute('data-ttt-played', this.currentPlayer);

        e.classList.add('ttt-played');

        var colRow = e.dataset.tttBox;
        var column = colRow.split('-')[0];
        var row = colRow.split('-')[1];

        this.moves++;
        
        if (this.moves >= 5) this.checkVictory(column, row);

        if(this.moves >= 9) this.end(true);

        switch (this.currentPlayer) {
            case 'cross':
                this.currentPlayer = 'circle';
                document.querySelector('[data-ttt-box="'+colRow+'"] svg.circle').style.display = 'none';
                break;
            case 'circle':
                this.currentPlayer = 'cross';
                document.querySelector('[data-ttt-box="'+colRow+'"] svg.cross').style.display = 'none';
                break;
        }
        document.querySelector('.ttt-turn h2').innerText = this.currentPlayer.toUpperCase();
        document.querySelector('.ttt-turn h2').dataset.tttPlayer = this.currentPlayer;
        document.querySelector('[data-ttt-current-player]').dataset.tttCurrentPlayer = this.currentPlayer;
    }

    checkVictory(columnPlayed, rowPlayed){
        var points = 0;

        // Check for the row
        for(let i = 1; i <= 3; i++){
            var box = i+'-'+rowPlayed;
            var el = document.querySelector('[data-ttt-box="'+box+'"]').dataset.tttPlayed;
            if(el == this.currentPlayer) points++;
        }
        if(points == 3){
            this.end();
            return true;
        }
        points=0;

        // Check for the column
        for(let i = 1; i <= 3; i++){
            var box = columnPlayed+'-'+i;
            var el = document.querySelector('[data-ttt-box="'+box+'"]').dataset.tttPlayed;
            if(el == this.currentPlayer) points++;
        }
        if(points == 3){
            this.end();
            return true;
        }
        points=0;

        const diagonalUp = ['1-3', '2-2', '3-1'];
        const diagonalDown = ['1-1', '2-2', '3-3'];

        // Check diagonal from top left to bottom right
        if(diagonalDown.includes(columnPlayed+'-'+rowPlayed)){
            for(let i = 1; i <=3; i++){
                var box = i+'-'+i;
                var el = document.querySelector('[data-ttt-box="'+box+'"]').dataset.tttPlayed;
                if(el == this.currentPlayer) points++;
            }
            if(points == 3){
                this.end();
                return true;
            }
            points=0;
        }

        // Check diagonal from bottom left to top right
        if(diagonalUp.includes(columnPlayed+'-'+rowPlayed)){
            for(let i=1, j=3; i <=3; i++, j--){
                var box = i+'-'+j;
                var el = document.querySelector('[data-ttt-box="'+box+'"]').dataset.tttPlayed;
                if(el == this.currentPlayer) points++;
            } 
            if(points == 3){
                this.end();
                return true;
            }
            points=0;
        }
    }

    end(draw=false){
        var popup = '';
        if(draw){
            popup = `<div style="position: absolute; top: 0; width: 100%; height: 100%; background: rgb(90 90 90 / .75); backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center; flex-direction: column; gap: .7rem; font-size: 150%; color: rgb(190 190 190);"><h3>It's a</h3><h2 style="font-size: 2.5rem; color: rgb(0 0 0); text-shadow: 0 0 2px #fff;">Draw</h2><h3>You both were too good !</h3><button class="btn-ttt-retry" type="button" onclick="location.reload();" style="border: none; padding: .5rem 1rem; border-radius: .5rem; background: rgb(50 50 50); color: rgb(240 240 240); cursor: pointer; margin-top: 15px; scale: 1.2;">Retry</button></div>`;
        }else{
            var winner = this.currentPlayer;
            var numWinner = this.players.indexOf(winner);
            numWinner++;
            var colorWinner = getComputedStyle(document.documentElement).getPropertyValue('--svg-color-'+numWinner);
    
            popup = `<div style="position: absolute; top: 0; width: 100%; height: 100%; background: rgb(90 90 90 / .75); backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center; flex-direction: column; gap: .7rem; font-size: 150%; color: rgb(190 190 190);"><h3>Congratulation !</h3><h2 style="font-size: 2.5rem; color: ${colorWinner}; text-shadow: 0 0 2px #fff;">${winner.toUpperCase()}</h2><h3>You won !</h3><button class="btn-ttt-retry" type="button" onclick="location.reload();" style="border: none; padding: .5rem 1rem; border-radius: .5rem; background: rgb(50 50 50); color: rgb(240 240 240); cursor: pointer; margin-top: 15px; scale: 1.2;">Retry</button></div>`;
        }
        document.querySelector('body').style.position = 'relative';
        document.querySelector('body').innerHTML += popup;
    }
}

const tictactoe = new TicTacToe;

tictactoe.newGame();

ttt_boxes.forEach(btn => {
    btn.addEventListener('click', () => {
        tictactoe.play(btn);
    });
});
