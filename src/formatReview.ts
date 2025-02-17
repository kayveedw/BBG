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

const ratingDescriptions: string[][] = [
	['Appalling', 'Dire', 'Dreadful', 'Frightful', 'Terrible', 'Bad'], // 0-10
	['Tiresome', 'Insipid', 'Meh', 'Weak', 'Lifeless'], // 10-20
	['Tripe', 'Stale', 'Comatose', 'Disconcerting', 'Overcooked', 'Bromidic'], // 20-30
	['Ponderous', 'Uninspired', 'Banal', 'Second Rate', 'Prosaic', 'Unimaginative', 'Dull As Dishwater', 'Humdrum'], // 30-40
	['Floored', 'Mediocre', 'Dull', 'Undercooked', 'Zestless', 'Muddled', 'Unimaginative'], // 40-50
	['Middling', "It's okay", 'Middle of the road', "It's Alright", 'Not bad'], // 50-60
	['Middling', "It's okay", 'Middle of the road', "It's Alright", 'Not bad'], // 60-70
	['Really Good', 'Great Fun', 'Ace', 'Recommended'], // 70-80
	[
		'Excellent',
		'Marvellous',
		'Unbelievably Good',
		'Tremendous',
		'Awesome',
		'Fantastic',
		'Exceptional',
		'Highly Recommended',
	], // 80-90
	['Superb', 'Top notch', 'Must Have', 'An Instant Classic', 'Amazing', 'Sensational', 'A Sheer Delight'], // 90-100
	['Flawless', 'Ultimate', 'Perfection', 'GOAT'], // 100
];

function formatReview(plainText: string, game: BBGGame): string {
	let formattedText: string = '';

	let desktopSection: string = '';
	let mobileAndTabletSection: string = '';

	let amazonURL: string | undefined = bGGID2AmazonMapping.get(game.bGGid);

	// Begin with the start of the desktop only section container
	desktopSection += `[et_pb_section fb_built="1" specialty="on" padding_left_1="25px" padding_top_bottom_link_1="false" padding_left_right_link_1="false" disabled_on="on|on|off" admin_label="Desktop Only Section" _builder_version="4.27.4" _module_preset="default" width="100%" max_width="100%" inner_width="100%" inner_max_width="100%" custom_margin="0px||||false|false" custom_padding="0px||||false|false" collapsed="off" global_colors_info="{}"]`;
	// Sidebar (on LHS)
	desktopSection += `[et_pb_column type="1_4" _builder_version="4.27.4" custom_padding="|||" global_colors_info="{}" custom_padding__hover="|||"][et_pb_sidebar area="et_pb_widget_area_1" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][/et_pb_sidebar][/et_pb_column]`;
	// Body (on RHS)
	desktopSection += `[et_pb_column type="3_4" specialty_columns="3" _builder_version="4.27.4" custom_padding="|||" global_colors_info="{}" custom_padding__hover="|||"]`;
	// Title Row
	desktopSection += `[et_pb_row_inner admin_label="Title Row" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][et_pb_column_inner saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][et_pb_post_title admin_label="Post Title" meta="off" featured_image="off" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][/et_pb_post_title][/et_pb_column_inner][/et_pb_row_inner]`;
	// Top Call to Action Row
	// if (amazonURL) {
	desktopSection += `[et_pb_row_inner admin_label="Call to Action Row" _builder_version="4.27.4" _module_preset="default" custom_margin="0px||0px||false|false" custom_padding="0px||0px||false|false" hover_enabled="0" global_colors_info="{}" sticky_enabled="0"][et_pb_column_inner saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][et_pb_cta title="Price Checker" button_url="${amazonURL}" button_text="Check Prices" admin_label="Call To Action" _builder_version="4.27.4" _module_preset="default" header_font_size="30px" background_color="#E02B20" width="84%" module_alignment="center" hover_enabled="0" global_colors_info="{}" sticky_enabled="0"]<h4>Check the price of ${game.name} across the web.</h4>[/et_pb_cta][/et_pb_column_inner][/et_pb_row_inner]`;
	// }

	// Begin with the start of the Mobile & Tablet Section container
	mobileAndTabletSection += `[et_pb_section fb_built="1" disabled_on="off|off|on" admin_label="Mobile & Tablet Section" _builder_version="4.27.4" _module_preset="default" width="100%" max_width="100%" collapsed="off" global_colors_info="{}"]`;
	// Content row
	mobileAndTabletSection += `[et_pb_row admin_label="Content Row" _builder_version="4.27.4" _module_preset="default" width="100%" max_width="100%" custom_margin="0px||0px||false|false" custom_margin_phone="0px||0px||false|false" custom_margin_last_edited="off|phone" custom_padding="0px||0px||false|false" collapsed="off" global_colors_info="{}"][et_pb_column type="4_4" _builder_version="4.27.4" _module_preset="default" custom_padding="0px||0px||false|false" global_colors_info="{}"]`;
	// Title row
	mobileAndTabletSection += `[et_pb_post_title meta="off" featured_image="off" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][/et_pb_post_title]`;
	// Call to action Row
	// if (amazonURL) {
	mobileAndTabletSection += `[et_pb_cta title="Price Checker" button_url="${amazonURL}" button_text="Check Prices" _builder_version="4.27.4" _module_preset="default" header_font_size="30px" background_color="#E02B20" width="84%" module_alignment="center" custom_margin="||50px||false|false" custom_padding="||||false|false" global_colors_info="{}"]<h4>Check the price of ${game.name} across the web.</h4>[/et_pb_cta]`;
	// }

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
			// overview text heading is the name of the game (page title)
			desktopSection += `[et_pb_row_inner column_structure="1_2,1_2" admin_label="Row with Text on the Right" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][et_pb_column_inner type="1_2" saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][et_pb_image src="https://bargainboardgames.com/wp-content/uploads/images/${
				game.slug + '_' + index.toString()
			}.png" title_text="Main Image of ${
				game.name
			} - Bargain Board Games" align="center" admin_label="Main Game Image" _builder_version="4.27.4" _module_preset="default" module_alignment="center" hover_enabled="0" global_colors_info="{}" sticky_enabled="0"][/et_pb_image][/et_pb_column_inner][et_pb_column_inner type="1_2" saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" custom_padding="|25px|||false|false" global_colors_info="{}"][et_pb_heading title="${
				game.name
			}" admin_label="Review Title (=Post Title) H1" _builder_version="4.27.4" _dynamic_attributes="title" _module_preset="default" title_level="h2" custom_padding="0px||0px|||" hover_enabled="0" hover_enabled="0" locked="off" global_colors_info="{}"][/et_pb_heading][et_pb_text admin_label="Overview Text" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"]<p><span>${paragraph}</span></p>[/et_pb_text][/et_pb_column_inner][/et_pb_row_inner]`;

			mobileAndTabletSection += `[et_pb_toggle title="${
				game.name
			}" open="on" open_toggle_background_color="#FFFFFF" closed_toggle_text_color="#FFFFFF" closed_toggle_background_color="#E02B20" icon_color="#FFFFFF" toggle_icon="&#x3b;||divi||400" use_icon_font_size="on" icon_font_size="30px" open_icon_color="#000000" open_toggle_icon="&#x3a;||divi||400" open_use_icon_font_size="on" open_icon_font_size="30px" _builder_version="4.27.4" _module_preset="default" title_level="h2" width="100%" max_width="100%" custom_margin="0px||0px||false|false" custom_padding="||||false|false" global_colors_info="{}" admin_label="Overview Toggle"]<p><img src="https://bargainboardgames.com/wp-content/uploads/images/${
				game.slug + '_' + index.toString()
			}.png" width="273" height="300" alt="" class="wp-image-194 alignnone size-medium" style="display: block; margin-left: auto; margin-right: auto;" /></p><p><span>${paragraph}</span></p>[/et_pb_toggle]`;
		} else if (heading.toLowerCase() == 'conclusion') {
			// Conclusion section is different and contains rating items

			let ratingDescription: String = '';
			let funFactorRating: number = 0;
			let replayabilityRating: number = 0;
			let setupTimeRating: number = 0;
			let newAndCasualRating: number = 0;
			let youngGamersRating: number = 0;

			if (game.rating) {
				let ratingWords = ratingDescriptions[Math.floor(game.rating / 10)];
				let wordIndex: number = Math.floor(Math.random() * ratingWords.length);
				ratingDescription = ratingWords[wordIndex];

				funFactorRating = Math.floor(game.rating + (-5 + Math.random() * 10));
				replayabilityRating = Math.floor(game.rating + (-5 + Math.random() * 10));
				setupTimeRating = Math.floor(game.rating + (-5 + Math.random() * 10));
				newAndCasualRating = Math.floor(game.rating + (-5 + Math.random() * 10));
				youngGamersRating = Math.floor(game.rating + (-5 + Math.random() * 10));
			}

			// Ensure the score in the text is the same as game.rating
			let regex: RegExp = /User Score.*( [0-9]?[0-9]+)\/100/gi; // Match in either case user score [something] XX/100, for example User Score: 68/100 or user score of 10/100, etc.
			let results = paragraph.matchAll(regex);
			let result = results.next();
			while (result.done == false) {
				paragraph = paragraph.replaceAll(result.value[1] + '/100', ' ' + game.rating + '/100');
				result = results.next();
			}

			desktopSection += `[et_pb_row_inner column_structure="1_2,1_2" admin_label="Conclusion Row" _builder_version="4.27.4" _module_preset="default" background_color="#f7f7f7" global_colors_info="{}"][et_pb_column_inner type="1_2" saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" custom_padding="|||25px|false|false" global_colors_info="{}"][et_pb_heading title="${heading}" admin_label="Section Heading H2" _builder_version="4.27.4" _module_preset="default" title_level="h2" global_colors_info="{}"][/et_pb_heading][et_pb_text admin_label="Paragraph 1" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"]<p><span>${paragraph}</span></p>[/et_pb_text][/et_pb_column_inner][et_pb_column_inner type="1_2" saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" custom_padding="|25px|||false|false" global_colors_info="{}"][et_pb_text admin_label="Rating Label" _builder_version="4.27.4" _module_preset="default" custom_margin="||0px||false|false" custom_padding="||0px||false|false" global_colors_info="{}"]<h2 style="text-align: center;">Our Score</h2>[/et_pb_text][et_pb_number_counter title="${ratingDescription}" number="${game.rating}" percent_sign="off" admin_label="Rating Animation" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][/et_pb_number_counter]`;
			desktopSection += `[et_pb_counters admin_label="Rating Bars" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][et_pb_counter percent="${funFactorRating}" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Fun Factor[/et_pb_counter][et_pb_counter percent="${replayabilityRating}" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Replayability[/et_pb_counter][et_pb_counter percent="${setupTimeRating}" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Setup Time[/et_pb_counter][et_pb_counter percent="${newAndCasualRating}" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]New & Casual Friendly[/et_pb_counter][et_pb_counter percent="${youngGamersRating}" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Suitable for young gamers?[/et_pb_counter][/et_pb_counters][/et_pb_column_inner][/et_pb_row_inner]`;

			mobileAndTabletSection += `[et_pb_toggle title="${heading}" closed_toggle_text_color="#FFFFFF" closed_toggle_background_color="#e21bc1" icon_color="#FFFFFF" toggle_icon="&#x3b;||divi||400" use_icon_font_size="on" icon_font_size="30px" open_icon_color="#000000" open_toggle_icon="&#x3a;||divi||400" open_use_icon_font_size="on" open_icon_font_size="30px" admin_label="${heading} Toggle" _builder_version="4.27.4" _module_preset="default" title_level="h2" global_colors_info="{}"]<div class="et_pb_module et_pb_text et_pb_text_6 et_pb_text_align_left et_pb_bg_layout_light"><div class="et_pb_text_inner"><p><span>${paragraph}</span></p></div></div>[/et_pb_toggle][et_pb_text admin_label="Rating Label" _builder_version="4.27.4" _module_preset="default" custom_margin="||0px||false|false" custom_padding="||0px||false|false" global_colors_info="{}"]<h2 style="text-align: center;">Our Score</h2>[/et_pb_text][et_pb_number_counter title="${ratingDescription}" number="${game.rating}" percent_sign="off" admin_label="Rating Animation" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][/et_pb_number_counter]`;
			mobileAndTabletSection += `[et_pb_counters admin_label="Rating Bars" _builder_version="4.27.4" _module_preset="default" width="100%" max_width="100%" custom_margin="|10px||0px|false|false" custom_padding="|10px||10px|false|false" global_colors_info="{}"][et_pb_counter percent="${funFactorRating}" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Fun Factor[/et_pb_counter][et_pb_counter percent="${replayabilityRating}" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Replayability[/et_pb_counter][et_pb_counter percent="${setupTimeRating}" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Setup Time[/et_pb_counter][et_pb_counter percent="${newAndCasualRating}" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]New & Casual Friendly[/et_pb_counter][et_pb_counter percent="${youngGamersRating}" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}" bar_background_color_default="#7EBEC5" use_percentages="on"]Suitable for young gamers?[/et_pb_counter][/et_pb_counters]`;
		} else {
			// Desktop
			// Alternate between Section with Text on the Right and Text on the Left
			if (index % 2 == 0) {
				desktopSection += `[et_pb_row_inner column_structure="1_2,1_2" admin_label="Row with Text on the Right" _builder_version="4.27.4" _module_preset="default" collapsed="on" global_colors_info="{}"][et_pb_column_inner type="1_2" saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][et_pb_image src="https://bargainboardgames.com/wp-content/uploads/images/${
					game.slug + '_' + index.toString()
				}.png" title_text="Image of ${
					game.name
				} - Bargain Board Games" align="center" _builder_version="4.27.4" _module_preset="default" module_alignment="center" global_colors_info="{}"][/et_pb_image][/et_pb_column_inner][et_pb_column_inner type="1_2" saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" custom_padding="|25px|||false|false" global_colors_info="{}"][et_pb_heading title="${heading}" admin_label="Section Heading H2" _builder_version="4.27.4" _module_preset="default" title_level="h2" global_colors_info="{}"][/et_pb_heading][et_pb_text admin_label="Paragraph 1" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"]<p><span>${paragraph}</span></p>[/et_pb_text][/et_pb_column_inner][/et_pb_row_inner]`;
			} else {
				desktopSection += `[et_pb_row_inner column_structure="1_2,1_2" admin_label="Row with Text on the Left" _builder_version="4.27.4" _module_preset="default" background_color="#f7f7f7" collapsed="on" global_colors_info="{}"][et_pb_column_inner type="1_2" saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" custom_padding="|||25px|false|false" global_colors_info="{}"][et_pb_heading title="${heading}" admin_label="Section Heading H2" _builder_version="4.27.4" _module_preset="default" title_level="h2" global_colors_info="{}"][/et_pb_heading][et_pb_text admin_label="Paragraph 1" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"]<p><span>${paragraph}</span></p>[/et_pb_text][/et_pb_column_inner][et_pb_column_inner type="1_2" saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][et_pb_image src="https://bargainboardgames.com/wp-content/uploads/images/${
					game.slug + '_' + index.toString()
				}.png" title_text="Image of ${
					game.name
				} - Bargain Board Games" _builder_version="4.27.4" _module_preset="default" width="70%" module_alignment="center" global_colors_info="{}"][/et_pb_image][/et_pb_column_inner][/et_pb_row_inner]`;
			}

			// Mobile & Tablet
			let closedToggleBackgroundColors = [
				'#E02B20', // Red
				'#E15826', // Dark Orange
				'#F49F2E', // Light Orange
				'#1FC633', // Light Green
				'#99CC24', // Dark Green
				'#257BEB', // Blue
				'#6100C9', // Navy
				'#D121FA', // Purple
				'#E21BC1', // Magenta
			];

			// Alternate between white and light grey background
			let openToggleBackgroundColor = index % 2 == 0 ? '#FFFFFF' : '#F4F4F4';

			mobileAndTabletSection += `[et_pb_toggle title="${heading}" open_toggle_background_color="${openToggleBackgroundColor}" closed_toggle_text_color="#FFFFFF" closed_toggle_background_color="${
				closedToggleBackgroundColors[index % 9]
			}" icon_color="#FFFFFF" toggle_icon="&#x3b;||divi||400" use_icon_font_size="on" icon_font_size="30px" open_icon_color="#000000" open_toggle_icon="&#x3a;||divi||400" open_use_icon_font_size="on" open_icon_font_size="30px" admin_label="${heading} Toggle" _builder_version="4.27.4" _module_preset="default" title_level="h2" custom_margin="0px||0px||true|false" hover_enabled="0" global_colors_info="{}" sticky_enabled="0"]<p><span><img src="https://bargainboardgames.com/wp-content/uploads/images/${
				game.slug + '_' + index.toString()
			}.png" title_text="Image of ${
				game.name
			} - Bargain Board Games" /></span></p><p><span>${paragraph}</span></p>[/et_pb_toggle]`;
		}
	});

	// Footer Row
	desktopSection += `[et_pb_row_inner admin_label="Footer Row" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"]`;
	// Bottom Call to Action Row
	// if (amazonURL) {
	desktopSection += `[et_pb_column_inner admin_label="Call To Action" saved_specialty_column_type="3_4" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][et_pb_cta title="Price Checker" button_url="${amazonURL}" button_text="Check Prices" _builder_version="4.27.4" _module_preset="default" header_font_size="30px" background_color="#E02B20" width="84%" module_alignment="center" custom_margin="||50px||false|false" custom_padding="||||false|false" global_colors_info="{}"]<h4>Check the price of ${game.name} across the web.</h4>[/et_pb_cta]`;
	// }
	// Other games in category
	desktopSection += `[et_pb_text _builder_version="4.27.4" _module_preset="default" text_text_color="#FFFFFF" header_text_color="#FFFFFF" header_2_text_color="#FFFFFF" background_color="#E02B20" custom_padding="10px|10px|2px|10px|false|false" global_colors_info="{}"]<h2>Search For Other Games Listed In The Same Categories</h2>[/et_pb_text]`;
	desktopSection += `[et_pb_post_title title="off" author="off" date="off" comments="off" featured_image="off" _builder_version="4.27.4" _module_preset="default" meta_font_size="16px" global_colors_info="{}"][/et_pb_post_title][/et_pb_column_inner][/et_pb_row_inner]`;

	// Finish the RHS column and desktop only section.
	desktopSection += `[/et_pb_column][/et_pb_section]`;

	// Bottom Call to Action
	// if (amazonURL) {
	mobileAndTabletSection += `[et_pb_cta title="Price Checker" button_url="${amazonURL}" button_text="Check Prices" _builder_version="4.27.4" _module_preset="default" header_font_size="30px" background_color="#E02B20" width="84%" module_alignment="center" custom_margin="||50px||false|false" custom_padding="||||false|false" global_colors_info="{}"]<h4>Check the price of ${game.name} across the web.</h4>[/et_pb_cta]`;
	// }
	// Other games in category
	mobileAndTabletSection += `[et_pb_text _builder_version="4.27.4" _module_preset="default" text_text_color="#FFFFFF" text_line_height="2em" header_text_color="#FFFFFF" header_2_text_color="#FFFFFF" background_color="#E02B20" custom_padding="10px|10px|10px|10px|false|false" global_colors_info="{}"]<h2>Search For Other Games Listed In The Same Categories</h2>[/et_pb_text]`;
	mobileAndTabletSection += `[et_pb_post_title title="off" author="off" date="off" comments="off" featured_image="off" _builder_version="4.27.4" _module_preset="default" meta_font_size="16px" global_colors_info="{}"][/et_pb_post_title]`;

	// Divider
	mobileAndTabletSection += `[et_pb_divider color="rgba(10,5,5,0.42)" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][/et_pb_divider][/et_pb_column][/et_pb_row]`;

	// Mobile & Tablet Sidebar
	mobileAndTabletSection += `[et_pb_row admin_label="Sidebar Row" _builder_version="4.27.4" _module_preset="default" collapsed="on" global_colors_info="{}"][et_pb_column type="4_4" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][et_pb_sidebar area="et_pb_widget_area_1" _builder_version="4.27.4" _module_preset="default" global_colors_info="{}"][/et_pb_sidebar]`;
	// Finish the column, row and Mobile & Tablet section container
	mobileAndTabletSection += `[/et_pb_column][/et_pb_row][/et_pb_section]`;

	formattedText = desktopSection + mobileAndTabletSection;

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
