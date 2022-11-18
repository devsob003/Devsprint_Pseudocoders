import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";

interface CreateMembershipFormProps {
	onSubmit: (values: { name: string; description: string; amount: number }) => void;
}

const CreateMembershipForm: FC<CreateMembershipFormProps> = ({ onSubmit }) => {
	const form = useForm({
		initialValues: {
			name: "",
			description: "",
			amount: 5,
		},

		validate: {
			name: (value) => (value.length >= 3 ? null : "Invalid name"),
			description: (value) => (value.length >= 10 ? null : "Description must be atleast 10 characters long"),
			amount: (value) => (value > 0 ? null : "Invalid amount"),
		},
	});

	return (
		<Box>
			<form onSubmit={form.onSubmit(onSubmit)}>
				<TextInput withAsterisk label="Name" placeholder="Pint name" {...form.getInputProps("name")} />
				<TextInput
					withAsterisk
					label="Description"
					placeholder="Describe this pint"
					{...form.getInputProps("description")}
				/>
				<NumberInput
					withAsterisk
					label="Pint amount"
					placeholder="How much do you want?"
					{...form.getInputProps("amount")}
				/>
				<Group position="right" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Box>
	);
};

export default CreateMembershipForm;
