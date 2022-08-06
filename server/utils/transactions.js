export function getCard(cards, cardId) {
    return cards.find(card => card.id === cardId);
}

export function getTransType(tranType) {
    const transTypes = {
        1: 'AUTH',
        2: 'COMMIT',
        3: 'REFOUND'
    }
    return transTypes[tranType];
}