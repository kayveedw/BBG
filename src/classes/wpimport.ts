// The columns needed to import posts into Word Press
export class WPImport {
	id: number;
	title: string;
	content: string;
	categories: string;
	tags: string;
	slug: string;
	authorid: number;
	_et_pb_use_builder: string = 'on';
	_et_pb_show_title: string = 'off';
	_et_pb_page_layout: string = 'et_full_width_page';
	minimum_age: number | undefined;
	minimum_players: number | undefined;
	maximum_players: number | undefined;
	rating: number | undefined;
	game_type: string | undefined;

	constructor(
		id: number,
		title: string,
		content: string,
		categories: string[],
		tags: string[],
		slug: string,
		authorid: number
		// minimum_age: number
	) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.categories = categories.join('|');
		this.tags = tags.join('|');
		this.slug = slug;
		this.authorid = authorid;
		// this.minimum_age = minimum_age;
	}
}
