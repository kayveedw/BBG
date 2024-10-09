import { existsSync, readFileSync } from 'fs';

export function loadBGGID2AmazonMapping(): Map<number, string> {
	const DATA_FILE: string = './data/AmazonLinks.json';

	let bGGID2AmazonMapping: Map<number, string> = new Map<number, string>();

	if (existsSync(DATA_FILE)) {
		let fileData = JSON.parse(readFileSync(DATA_FILE, 'utf8'));

		if (fileData) {
			Object.entries(fileData).forEach((item) => {
				bGGID2AmazonMapping.set(Number(item[0]), String(item[1]));
			});
		}
	}

	return bGGID2AmazonMapping;
}
