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

	// Begin with the page header, including the article title and the overview text block
	formattedText += `[et_pb_section fb_built="1" admin_label="Page Header" _builder_version="4.24.3" _module_preset="default" background_enable_image="off" background_position="top_center" custom_margin="0px||0px||false|false" custom_padding="0px||0px||false|false" global_colors_info="{}"][et_pb_row column_structure="2_5,3_5" _builder_version="4.24.3" _module_preset="default" hover_enabled="0" global_colors_info="{}" sticky_enabled="0"][et_pb_column type="2_5" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_image src="https://bargainboardgames.com/wp-content/uploads/images/${game.slug}_0.png" title_text="81T-mTl2i6L._AC_SX425_%911%93" _builder_version="4.24.3" _module_preset="default" hover_enabled="0" global_colors_info="{}" admin_label="Main Game Image" sticky_enabled="0"][/et_pb_image][/et_pb_column][et_pb_column type="3_5" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_heading title="${game.name}" admin_label="Review Title (=Post Title) H1" _builder_version="4.24.3" _dynamic_attributes="title" _module_preset="default" custom_padding="0px||0px|||" locked="off" global_colors_info="{}"][/et_pb_heading]`;

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

		if (heading.toLowerCase() == 'overview') {
			// overview text does not have a heading
			// also it is part of the Page Header section
			formattedText += `[et_pb_text admin_label="Overview Text" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"]<p><span>${paragraph}</span></p>[/et_pb_text][/et_pb_column][/et_pb_row][/et_pb_section]`;
		} else if (heading.toLowerCase() == 'conclusion') {
			// Conclusion section that is different and contains rating items
			formattedText += `[et_pb_section fb_built="1" admin_label="Section with Text on the left" _builder_version="4.24.3" _module_preset="default" custom_margin="0px||0px||false|false" custom_padding="0px||0px||false|false" collapsed="off" global_colors_info="{}"][et_pb_row column_structure="2_3,1_3" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_column type="2_3" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_heading title="${heading}" admin_label="Section Heading H2" _builder_version="4.24.3" _module_preset="default" title_level="h2" global_colors_info="{}"][/et_pb_heading][et_pb_text admin_label="Paragraph 1" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"]<p><span>${paragraph}</span></p>[/et_pb_text][/et_pb_column][et_pb_column type="1_3" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_text admin_label="Rating Label" _builder_version="4.24.3" _module_preset="default" custom_margin="||0px||false|false" custom_padding="||0px||false|false" global_colors_info="{}"]<h2 style="text-align: center">Our Score</h2>[/et_pb_text][et_pb_number_counter title="Superb!" number="${game.rating}" percent_sign="off" admin_label="Rating Animation" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][/et_pb_number_counter][et_pb_counters admin_label="Rating Bars" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_counter percent="90" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Fun Factor[/et_pb_counter][et_pb_counter percent="80" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Replayability[/et_pb_counter][et_pb_counter percent="85" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Setup Time[/et_pb_counter][et_pb_counter percent="99" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]New & Casual Friendly[/et_pb_counter][et_pb_counter percent="95" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Suitable for young gamers?[/et_pb_counter][/et_pb_counters][/et_pb_column][/et_pb_row][/et_pb_section]`;
		} else {
			// Alternate between Section with Text on the Left and Text on the Right
			if (index % 2 == 0) {
				formattedText += `[et_pb_section fb_built="1" admin_label="Section with Text on the right" _builder_version="4.24.3" _module_preset="default" custom_margin="0px||0px||false|false" custom_padding="0px||0px||false|false" collapsed="off" global_colors_info="{}"][et_pb_row column_structure="2_5,3_5" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_column type="2_5" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_image src="https://bargainboardgames.com/wp-content/uploads/images/${
					game.slug + '_' + index.toString()
				}.png" title_text="qoqcomp" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][/et_pb_image][/et_pb_column][et_pb_column type="3_5" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_heading title="${heading}" admin_label="Section Heading H2" _builder_version="4.24.3" _module_preset="default" title_level="h2" global_colors_info="{}"][/et_pb_heading][et_pb_text admin_label="Paragraph 1" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"]<p><span>${paragraph}</span></p>[/et_pb_text][/et_pb_column][/et_pb_row][/et_pb_section]`;
			} else {
				formattedText += `[et_pb_section fb_built="1" admin_label="Section with Text on the left" _builder_version="4.24.3" _module_preset="default" custom_margin="0px||0px||false|false" custom_padding="0px||0px||false|false" collapsed="off" global_colors_info="{}"][et_pb_row column_structure="2_3,1_3" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_column type="2_3" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_heading title="${heading}" admin_label="Section Heading H2" _builder_version="4.24.3" _module_preset="default" title_level="h2" global_colors_info="{}"][/et_pb_heading][et_pb_text admin_label="Paragraph 1" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"]<p><span>${paragraph}</span></p>[/et_pb_text][/et_pb_column][et_pb_column type="1_3" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][et_pb_image src="https://bargainboardgames.com/wp-content/uploads/images/${
					game.slug + '_' + index.toString()
				}.png" title_text="robert-coelho-laNNTAth9vs-unsplash" _builder_version="4.24.3" _module_preset="default" global_colors_info="{}"][/et_pb_image][/et_pb_column][/et_pb_row][/et_pb_section]`;
			}
		}
	});

	if (amazonURL) {
		formattedText += `[et_pb_section fb_built="1" admin_label="Call to Action Section" module_id="CallToActionSection" _builder_version="4.24.3" _module_preset="default" background_color="RGBA(255,255,255,0)" width="100%" custom_padding="0px||0px||true|false" custom_css_free_form="#CallToActionSection{|| position: sticky;|| bottom: 10px;|| z-index: 2;||||}" global_colors_info="{}"][et_pb_row column_structure="1_2,1_2" admin_label="Call to Action Row" _builder_version="4.24.3" _module_preset="default" width="100%" custom_margin="||||false|false" custom_padding="0px|0px|0px|0px|true|true" global_colors_info="{}"][et_pb_column type="1_2" admin_label="Transparent Column" _builder_version="4.24.3" _module_preset="default" background_color="RGBA(255,255,255,0)" global_colors_info="{}"][/et_pb_column][et_pb_column type="1_2" admin_label="White Column" _builder_version="4.24.3" _module_preset="default" background_color="#FFFFFF" global_colors_info="{}"][et_pb_button button_url="${amazonURL}" button_text="Buying options" button_alignment="right" admin_label="Call to Action Button" _builder_version="4.24.3" _module_preset="default" z_index="2" global_colors_info="{}"][/et_pb_button][/et_pb_column][/et_pb_row][/et_pb_section]`;
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
