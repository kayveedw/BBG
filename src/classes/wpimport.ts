// The columns needed to import posts into Word Press
export class WPImport {
	id: number;
	title: string;
	content: string;
	categories: string;
	tags: string;
	slug: string;
	authorid: number;

	constructor(
		id: number,
		title: string,
		content: string,
		categories: string[],
		tags: string[],
		slug: string,
		authorid: number
	) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.categories = categories.join('|');
		this.tags = tags.join('|');
		this.slug = slug;
		this.authorid = authorid;
	}
}
