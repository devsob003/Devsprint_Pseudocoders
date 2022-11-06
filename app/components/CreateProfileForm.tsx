import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";

interface CreateProfileFormProps {
	onSubmit: (values: { name: string; bio: string }) => void;
}

const CreateProfileForm: FC<CreateProfileFormProps> = ({ onSubmit }) => {
	const form = useForm({
		initialValues: {
			name: "",
			bio: "",
		},

		validate: {
			name: (value) => (value.length >= 3 ? null : "Invalid name"),
			bio: (value) => (value.length >= 10 ? null : "Bio must be atleast 10 characters long"),
		},
	});

	return (
		<Box>
			<form onSubmit={form.onSubmit(onSubmit)}>
				<TextInput withAsterisk label="Name" placeholder="Your name" {...form.getInputProps("name")} />
				<TextInput
					withAsterisk
					label="Bio"
					placeholder="Write something about yourself"
					{...form.getInputProps("bio")}
				/>

				<Group position="right" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Box>
	);
};

export default CreateProfileForm;
