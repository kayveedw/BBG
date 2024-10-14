import { writeToPath } from '@fast-csv/format';

import { createHash } from 'crypto';
import { existsSync, readFileSync } from 'fs';

import { BBGGame } from './classes/bbggame';
import { WPImport } from './classes/wpimport';
import { loadBGGID2AmazonMapping } from './amazonMapping';

function getReviewText(id: number, slug: string): string {
	let reviewText: string = '';

	const REVIEW_FOLDER: string = './reviews/';

	let reviewPath: string = REVIEW_FOLDER + String(id) + '_' + slug + '_Review.txt';
	if (existsSync(reviewPath)) {
		reviewText = readFileSync(reviewPath, 'utf8');
	}
	return reviewText;
}

async function main() {
	process.argv.push('./data/BBG/RankedGames.json'); // TEMP for testing/debugging
	if (process.argv.length <= 2) {
		console.log('Must send an argumnent for input/output file.');
	} else {
		const INPUT_FILE: string = process.argv[2];
		let fileData: BBGGame[] = JSON.parse(readFileSync(INPUT_FILE, 'utf8'));

		let bGGID2AmazonMapping: Map<number, string> = loadBGGID2AmazonMapping();

		let outputData: WPImport[] = [];

		fileData.forEach((game) => {
			let id: number;
			if (game.slug && game.name) {
				let hash = createHash('md5')
					.update(game.slug + String(game.bGGid), 'binary')
					.digest('hex');
				id = parseInt(BigInt.asUintN(64, BigInt('0x' + hash)).toString());

				let reviewText: string = getReviewText(game.bGGid, game.slug);

				let amazonURL: string | undefined = bGGID2AmazonMapping.get(game.bGGid);
				if (amazonURL) {
					reviewText += '<a href="' + amazonURL + '">Call to Action</a>';
				}

				let row: WPImport = new WPImport(
					id, // TODO: work out better strategy or allow WP to create it
					game.name, // TODO: include "review"
					reviewText, // TODO: HTML and/or DIVI tags
					game.classifications, // TODO: include "Review", listicle type, etc
					game.credits, // decide where these go
					game.slug, // TODO: avoid duplicate slugs
					1
					// TODO: Images?
					// Maybe TODO: post date? currently just random in last 30 days
					// Maybe TODO: post time: once imports are automatic, spread out the times on post so they are not all the same
				);
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

main();
