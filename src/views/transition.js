const GAME_VIEWS = {
    green: 'game1',
    yellow: 'game2',
    blue: 'game3',
    red: 'game4'
};

document.addEventListener('DOMContentLoaded', () => {
    const gameColor = window.router.getCurrentGame();
    
    if (!gameColor) {
        window.router.navigate('menu');
        return;
    }

    setTimeout(() => {
        // liimpiar el juego actual
        window.router.clearCurrentGame();
        
        const gameView = GAME_VIEWS[gameColor];
        if (gameView) {
            window.router.navigate(gameView);
        } else {
            window.router.navigate('menu');
        }
    }, 7000);
});