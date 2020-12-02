from jinja2 import Environment, FileSystemLoader

input_file = 'test.html'
output_file = 'my_new_file.html'
template_path = '.'
env = Environment(loader = FileSystemLoader(template_path))
template = env.get_template(input_file)
output_from_parsed_template = template.render(foo = 'Hello World!')
with open(output_file, 'wb') as fh:
	fh.write(output_from_parsed_template)
