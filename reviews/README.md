## Reviews

This folder contains structured review artifacts used to modernize the API Rules **without**
immediately editing the rule MDX files.

### Workflow

- **Review phase**: capture proposed changes per rule under `reviews/rules/` (one file per rule ID).
- **Implementation phase**: apply `accepted` reviews back into `content/docs/rules/` in a single sweep.

### Why `.yaml` files that look like JSON?

We store review entries as **JSON-formatted YAML** (YAML is a superset of JSON). This keeps:

- **Human editability**: still a `.yaml` file by convention
- **Zero dependencies**: the site and scripts can safely read them with `JSON.parse()`


