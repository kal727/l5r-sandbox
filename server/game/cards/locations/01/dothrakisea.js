const DrawCard = require('../../../drawcard.js');

class DothrakiSea extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: ({challenge}) => challenge.winner === this.controller && challenge.challengeType === 'power'
            },
            cost: ability.costs.sacrificeSelf(),
            target: {
                activePromptTitle: 'Select a character',
                cardCondition: (card, context) => card.location === 'hand' && card.getType() === 'character' &&
                                                  card.controller === context.player && card.hasTrait('Dothraki')
            },
            handler: context => {
                context.target.controller.putIntoPlay(context.target);
                this.untilEndOfPhase(ability => ({
                    match: context.target,
                    effect: ability.effects.returnToHandIfStillInPlay()
                }));
                this.game.addMessage('{0} sacrifices {1} to put {2} into play from their hand', this.controller, this, context.target);
            }
        });
    }
}

DothrakiSea.code = '01174';

module.exports = DothrakiSea;
