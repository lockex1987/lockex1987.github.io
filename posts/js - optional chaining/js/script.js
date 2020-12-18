const player = {
    details: {
        name: {
            firstName: 'Huyen',
            lastName: 'Nguyen'
        },
        age: 20
    },
    jobs: [
        'Dev JS',
        'Dev PHP'
    ]
};


const playerFirstName1 = player.details.name.firstName;
console.log(playerFirstName1);


if (player &&
        player.details &&
        player.details.name) {
    const playerFirstName2 = player.details.name.firstName || 'Ronaldo CR7';
	console.log(playerFirstName2);
}

const playerFirstName3 = player?.details2?.name?.firstName;
console.log(playerFirstName3);
