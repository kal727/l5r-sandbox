const DrawCard = require('../../../drawcard.js');

class SlaversBayPort extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Gain gold',
            phase: 'marshal',
            cost: ability.costs.kneelSelf(),
            handler: context => {
                let opponent = this.game.getOtherPlayer(this.controller);
                let gold = opponent && opponent.deadPile.size() >= 4 ? 2 : 1;

                this.game.addGold(context.player, gold);
                this.game.addMessage('{0} kneels {1} to gain {2} gold', context.player, this, gold);
            }
        });
    }
}

SlaversBayPort.code = '06014';

module.exports = SlaversBayPort;
