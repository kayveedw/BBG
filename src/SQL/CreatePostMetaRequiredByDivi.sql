-- Clear out any previous entries to avoid duplicates, potentially contradictatory values
DELETE pm FROM bbgdb_postmeta AS pm LEFT JOIN bbgdb_posts AS p ON p.ID = pm.post_id
WHERE p.post_type = 'post' AND
	(pm.meta_key = '_et_pb_use_builder' OR pm.meta_key = '_et_pb_show_title' OR pm.meta_key = '_et_pb_page_layout');


-- Tell WP that this post uses Divi
INSERT INTO bbgdb_postmeta (post_id, meta_key, meta_value)
	SELECT ID as post_id, "_et_pb_use_builder", "on"
	FROM bbgdb_posts
    WHERE post_type = 'post';

-- Turn of built-in titles off and use our own
INSERT INTO bbgdb_postmeta (post_id, meta_key, meta_value)
	SELECT ID as post_id, "_et_pb_show_title", "off"
	FROM bbgdb_posts
    WHERE post_type = 'post';

-- Turn off sidebar and use the full page width
INSERT INTO bbgdb_postmeta (post_id, meta_key, meta_value)
	SELECT ID as post_id, "_et_pb_page_layout", "et_full_width_page"
	FROM bbgdb_posts
    WHERE post_type = 'post';

