import { existsSync, readFileSync } from 'fs';

import { BBGGame } from './classes/bbggame';
import { loadBGGID2AmazonMapping } from './amazonMapping';
let bGGID2AmazonMapping: Map<number, string> = loadBGGID2AmazonMapping();

const standardSections: string[] = [
	'overview',
	'the game at a glance',
	'game mechanics',
	'Game Mechanics (with explanations)',
	'components and artwork',
	'components & artwork',
	'replayability and depth',
	'replayability & depth',
	'accessibility and fun factor',
	'accessibility & fun factor',
	"who's it for?",
	'critisisms',
	'conclusion',
];

function formatReview(plainText: string, game: BBGGame): string {
	let formattedText: string = '';

	let amazonURL: string | undefined = bGGID2AmazonMapping.get(game.bGGid);

	// Begin with H1 of Article Title
	if (game.name) {
		formattedText += '<h1>' + game.name + '</h1>';
	}

	let regex: RegExp = /\n?.+:\n/gi; // Match headings, for example 'Overview:'
	let headings: string[] = [];
	let match;
	while ((match = regex.exec(plainText)) != null) {
		let heading: string = match[0].trim();
		heading = heading.substring(0, heading.length - 1);

		// only treat as a heading if a standard one
		if (standardSections.includes(heading.toLowerCase())) {
			headings.push(heading);
		}
	}
	headings.forEach((heading: string, index: number) => {
		formattedText += '<h2>' + heading + '</h2>';
		// remainder of paragraph
		formattedText += '<p>';

		// Get the text from the character after the heading until the character before the next heading,
		// or till the end if no more headings
		let startPosition: number = plainText.indexOf(heading + ':') + heading.length + 1;
		let endPosition: number;
		if (index + 1 < headings.length) {
			endPosition = plainText.indexOf(headings[index + 1]);
		} else {
			endPosition = plainText.length;
		}

		let paragraph: string = plainText.substring(startPosition, endPosition);
		paragraph = paragraph.replaceAll('\n', '<br>');
		formattedText += paragraph;

		formattedText += '</p>';
	});

	if (amazonURL) {
		formattedText += '<a href="' + amazonURL + '">Call to Action</a>';
	}

	return formattedText;
}

export function getReviewText(game: BBGGame): string {
	let reviewText: string = '';

	const REVIEW_FOLDER: string = './reviews/';

	let reviewPath: string = REVIEW_FOLDER + String(game.bGGid) + '_' + game.slug + '_Review.txt';
	if (existsSync(reviewPath)) {
		reviewText = readFileSync(reviewPath, 'utf8');
		reviewText = formatReview(reviewText, game);
	}
	return reviewText;
}
