export default function getTextMap(rowCount, colCount, isMobile) {
    const textDesktop = [
        'Don’t let yesterday take up too much of today.', 'You learn more from failure than from success. Don’t let it stop you. Failure builds character.', 'It’s not whether you get knocked down, it’s whether you get up.', 'We generate fears while we sit. We overcome them by action.', 'The only limit to our realization of tomorrow will be our doubts of today.',
        'Creativity is intelligence having fun.', 'under', 'If you believe it will work out, you’ll see opportunities. If you believe it won’t, you will see obstacles.', 'Hold the vision, trust the process.', 'The hard days are what make you stronger.',
        'Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Too many of us are not living our dreams because we are living our fears', 'Never stop doing your best just because someone doesn’t give you credit.', 'Your passion is waiting for your courage to catch up.', 'Lead from the heart, not the head.',
        'Hardships often prepare ordinary people for an extraordinary destiny.', 'Work hard in silence, let your success be the noise.', 'The only difference between ordinary and extraordinary is that little extra.', 'Nothing will work unless you do', 'If you don’t like the road you’re walking, start paving another one.',
        'Your true success in life begins only when you make the commitment to become excellent at what you do.', 'Change your life today. Don’t gamble on the future, act now, without delay.', 'Everything you can imagine is real.', 'At any given moment you have the power to say: this is not how the story is going to end', 'Do what you feel in your heart to be right – for you’ll be criticized anyway.'
    ];
    const textMobile = [
        'Reliable', 'Constructive', 'Influential', 'Opinionated', 'Honest',
        'Instrumental', 'Inspiring', 'Motivating', 'Leader', 'Accountable',
        'Pragmatic', 'Decisive', 'Superior', 'Passionate', 'Adept',
        'Productive', 'Learner', 'Meticulous', 'Bold', 'Competent',
        'Tenacious', 'Focused', 'Committed', 'Persistent', 'Diligent'

    ]
    const textMap = new Map();
    let alreadyGeneratedIndex = [];
    for (let i = 0; i < rowCount * colCount; i++) {
        let random;
        while (true) {
            random = Math.floor(Math.random() * 25);
            if (!alreadyGeneratedIndex.includes(random)) {
                alreadyGeneratedIndex.push(random);
                break;
            }
        }
        textMap.set(i, isMobile ? textMobile[random] : textDesktop[random]);
    }
    return textMap;
}