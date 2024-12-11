
-- bbgdb_pmxi_posts ?

-- = Categories and Tags
-- bbgdb_termmeta? It is currently empty
-- X) Delete term relationships linked to posts
DELETE tr FROM bbgdb_term_relationships AS tr LEFT JOIN bbgdb_posts AS p ON p.ID = tr.object_id WHERE p.post_type = 'post';
-- Is it necessary to also delete relationships where the term is a category or tag?

-- X) Delete terms of taxonimy post_tag or category from bbgdb_terms
DELETE t FROM bbgdb_terms AS t LEFT JOIN bbgdb_term_taxonomy AS tt ON tt.term_id = t.term_id WHERE tt.taxonomy = 'category' OR tt.taxonomy = 'post_tag';
-- X) Delete categories and tags from bbgdb_term_taxaonomy
DELETE FROM bbgdb_term_taxonomy  WHERE taxonomy = 'category' OR taxonomy = 'post_tag';

-- = Posts =
-- 1) Delete revision to posts from bbgdb_posts
DELETE p FROM bbgdb_posts AS p LEFT JOIN bbgdb_posts AS pp ON pp.ID = p.post_parent WHERE p.post_type = 'revision' AND pp.post_type = 'post';
-- 2) Delete post meta data from bbgdb_postmeta
DELETE pm FROM bbgdb_postmeta AS pm LEFT JOIN bbgdb_posts AS p ON p.ID = pm.post_id WHERE p.post_type = 'post';
-- 3) Delete posts from bbgdb_posts
DELETE FROM bbgdb_posts WHERE post_type = 'post';

