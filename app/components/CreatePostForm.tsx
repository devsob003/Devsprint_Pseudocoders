import { Box, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";

interface CreatePostFormProps {
	onSubmit: (values: { body: string }) => void;
}

const CreatePostForm: FC<CreatePostFormProps> = ({ onSubmit }) => {
	const form = useForm({
		initialValues: {
			body: "",
		},

		validate: {
			body: (value) => (value.length >= 3 && value.length <= 300 ? null : "Invalid body"),
		},
	});

	return (
		<Box>
			<form onSubmit={form.onSubmit(onSubmit)}>
				<Textarea multiple withAsterisk label="Body" placeholder="Post" {...form.getInputProps("body")} />

				<Group position="right" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Box>
	);
};

export default CreatePostForm;
