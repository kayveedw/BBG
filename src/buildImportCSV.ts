import { writeToPath } from '@fast-csv/format';

import { createHash } from 'crypto';
import { readFileSync } from 'fs';

import { BBGGame } from './classes/bbggame';
import { WPImport } from './classes/wpimport';
import { getReviewText } from './formatReview';

async function main() {
	process.argv.push('./data/BBG/RankedGames.json'); // TEMP for testing/debugging
	if (process.argv.length <= 2) {
		console.log('Must send an argumnent for input/output file.');
	} else {
		const INPUT_FILE: string = process.argv[2];
		let fileData: BBGGame[] = JSON.parse(readFileSync(INPUT_FILE, 'utf8'));

		let outputData: WPImport[] = [];

		fileData.forEach((game) => {
			let id: number;
			if (game.slug && game.name) {
				let hash = createHash('md5')
					.update(game.slug + String(game.bGGid), 'binary')
					.digest('hex');
				id = parseInt(BigInt.asUintN(64, BigInt('0x' + hash)).toString());

				let reviewText: string = getReviewText(game);

				game.classifications = amendCategories(game.classifications);

				let row: WPImport = new WPImport(
					id, // TODO: work out better strategy or allow WP to create it
					game.name + ' - Board Game Review',
					reviewText,
					game.classifications,
					game.credits, // decide where these go
					game.slug, // TODO: avoid duplicate slugs
					4 // thebosslogin
					// TODO: Images?
					// Maybe TODO: post date? currently just random in last 30 days
					// Maybe TODO: post time: once imports are automatic, spread out the times on post so they are not all the same
				);
				if (game.minimumPlayerAge) {
					row.minimum_age = game.minimumPlayerAge;
				}
				if (game.minimumPlayers) {
					row.minimum_players = game.minimumPlayers;
				}
				if (game.maximumPlayers) {
					row.maximum_players = game.maximumPlayers;
				}
				if (game.rating) {
					row.rating = game.rating;
				}
				if (game.type) {
					row.game_type = game.type;
				}
				outputData.push(row);
			}
		});

		let today: Date = new Date(Date.now());
		let outputFileName: string = today.toISOString().split('T')[0] + '_Import.csv';
		writeToPath('./uploads/' + outputFileName, outputData, {
			headers: true,
			quoteHeaders: false,
			quoteColumns: true,
		}).on('error', (error) => console.error(error));
	}
}

function amendCategories(categoryList: string[]): string[] {
	// Remove any Admin catgegories from the list
	let index: number;
	do {
		index = categoryList.findIndex((name) => name.startsWith('Admin:'));
		if (index != -1) {
			categoryList.splice(index, 1);
		}
	} while (index != -1);

	categoryList = categoryList.map((x) => x.replace('Age: ', '')); // Remove Age: prefix
	categoryList = categoryList.map((x) => x.replace('Ancient: ', '')); // Remove Ancient: prefix

	categoryList.push('Reviews'); // TODO: include others such as listicle type, etc

	return categoryList;
}

main();
